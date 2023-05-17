<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            }),
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

        $data = $sql->paginate($pagination['per_page'], ['*'], 'page', $pagination['page']);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
