<?php

namespace App\Http\Controllers;

use App\Events\NewUserRegisteredEvent;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/index', compact('categories'));
    }

    public function get(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['exists:categories,value']
        ]);

        $pagination = $request->validate([
            'page' => ['required', 'integer'],
            'per_page' => ['required', 'integer']
        ]);


        $sql = User::with('categories')->where('id', '!=', Auth::user()->id);
        $wheres = [
            'categories' => fn (&$q, $v) => $q->whereHas('categories', function ($query) use ($v) {
                $query->whereIn('value', $v);
            }, '=', count($v)),

            'search' => fn (&$q, $v) => $q->where(function ($query) use ($v) {
                $query->where('document_number', 'LIKE',  "%$v%")
                    ->orWhere(DB::raw("CONCAT_WS(' ',LOWER(name),LOWER(last_name))"), 'LIKE', '%' . strtolower($v) . '%');
            })
        ];

        foreach ($filters as $id => $filter) {
            if (
                (
                    (!is_array($filter) && $filter !== null) ||
                    (is_array($filter) && !empty($filter))
                ) && isset($wheres[$id])
            ) {
                $wheres[$id]($sql, $filter);
            }
        }

        $data = $sql->orderBy('created_at', 'desc')->paginate($pagination['per_page'], ['*'], 'page', $pagination['page']);
        return response()->json($data);
    }

    private function getCountries()
    {
        $response = Http::get('https://restcountries.com/v3.1/subregion/South%20America');
        $countries = $response->ok() ? $response->json() : [];
        $countryList = [];

        foreach ($countries as $country) {
            $countryList[] = [
                'id' => $country['cca3'],
                'value' => $country['name']['common'],
                'icon' => $country['flag']
            ];
        }
        return $countryList;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $countrylist = $this->getCountries();
        $categories = Category::all();
        return Inertia::render('Dashboard/User', compact('countrylist', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['document_number']);
        $user = User::create($data);

        $categories = Category::whereIn('value', $data['categories'])->get();
        $user->categories()->sync($categories->pluck('id')->all());

        event(new NewUserRegisteredEvent($user));
        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user = User::with('categories')->where('id', $user->id)->first();
        $countrylist = $this->getCountries();
        $categories = Category::all();
        return Inertia::render('Dashboard/User', compact('user', 'countrylist', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->fill($data)->save();

        $categories = Category::whereIn('value', $data['categories'])->get();
        $user->categories()->sync($categories->pluck('id')->all());
        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(200);
    }
}
