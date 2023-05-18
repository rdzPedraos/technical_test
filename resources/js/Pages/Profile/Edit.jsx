import React from 'react';
import PropTypes from 'prop-types';

import { Head, useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import LinkComponent from '@/Components/Link';

const inputs = [
    { id: 'email', label: 'Email' },
    { id: 'name', label: 'Nombres' },
    { id: 'last_name', label: 'Apellidos' },
];

function Edit({ auth: { user } }) {
    const { data, setData, errors, processing, patch } = useForm(user);

    const onSubmit = e => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <>
            <Head title="Editar Perfil" />
            <div className="max-w-md mx-auto">
                <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-bold">Editar Perfil</h1>
                    <LinkComponent method="post" href={route('logout')} as="button">
                        <LogoutOutlined />
                        Cerrar sesión
                    </LinkComponent>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    {inputs.map(({ id, ...props }) => (
                        <TextField
                            fullWidth
                            key={id}
                            name={id}
                            value={data[id]}
                            onChange={e => setData(id, e.target.value)}
                            error={!!errors[id]}
                            helperText={errors[id]}
                            {...props}
                        />
                    ))}
                    <Button type="submit" variant="contained" disabled={processing}>
                        Cambiar
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.object,
    }),
};

export default Edit;
