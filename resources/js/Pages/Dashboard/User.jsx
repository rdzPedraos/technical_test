import { Head, useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';

import UserConfigInputs from '@/Config/UserConfig';
import Input from '@/Components/Input/';

import { Button } from '@mui/material';

function User({ user, ...props }) {
    const values = {};

    UserConfigInputs.forEach(input => {
        if (user) {
            values[input.id] = user[input.id];
        } else {
            values[input.id] = input.value ?? '';
        }

        if (input.id_options) {
            input.options = props[input.id_options];
        }
    });

    const { data, setData, errors, put, post, processing } = useForm({
        ...values,
        categories: user ? user.categories.map(category => category.value) : [],
    });

    const onSubmit = e => {
        e.preventDefault();
        if (user) {
            put(route('users.update', { user: user.id }));
        } else {
            post(route('users.store'));
        }
    };

    return (
        <>
            <Head title="Crear Usuario" />

            <div className="max-w-md mt-5 mx-auto">
                <h1 className="text-3xl font-bold text-center uppercase">
                    {user ? 'Actualizar Usuario' : 'Crear Usuario'}
                </h1>
                <p className="mt-4 text-gray-600">
                    Este apartado es para que {user ? 'actualices' : 'crees'} tus usuarios!!
                </p>

                <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6">
                    {UserConfigInputs.map(input => {
                        const { id } = input;
                        return (
                            <Input
                                key={id}
                                input={input}
                                value={data[id]}
                                error={errors[id]}
                                onChange={e => setData(id, e.target.value)}
                            />
                        );
                    })}

                    <Button type="submit" variant="contained" disabled={processing}>
                        Enviar
                    </Button>
                </form>
            </div>
        </>
    );
}

User.propTypes = {
    user: PropTypes.object,
};

export default User;
