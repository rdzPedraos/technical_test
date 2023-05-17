import { Head, useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';

import { Button, MenuItem, Select, TextField } from '@mui/material';
import UserConfigInputs from '@/Config/UserConfig';

function Edit({ user, categories, ...props }) {
    UserConfigInputs.forEach(input => {
        if (input.id_options) {
            input.options = props[input.id_options];
        }
    });

    const { data, setData, errors, put, processing } = useForm({
        ...user,
        categories: user.categories.map(category => category.value),
    });

    const onSubmit = e => {
        e.preventDefault();
        put(route('users.update', { user: user.id }));
    };

    return (
        <>
            <Head title="Crear Usuario" />

            <div className="max-w-md mt-5 mx-auto">
                <h1 className="text-3xl font-bold text-center uppercase">Actualizar Usuario</h1>
                <p className="mt-4 text-gray-600">
                    Este apartado es para que actualices tus usuarios!!
                </p>

                <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6">
                    <Select
                        multiple
                        value={data.categories ?? 'Cliente'}
                        renderValue={selected => selected.join(', ')}
                        onChange={ev => setData('categories', ev.target.value)}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.value}>
                                {category.value}
                            </MenuItem>
                        ))}
                    </Select>

                    {UserConfigInputs.map(({ type, options, id, label, ...props }) =>
                        type === 'select' ? (
                            <Select
                                key={id}
                                value={data[id]}
                                onChange={e => setData(id, e.target.value)}
                            >
                                {options.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.icon} {option.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <TextField
                                fullWidth
                                key={id}
                                id={id}
                                name={id}
                                value={data[id] ?? ''}
                                onChange={e => setData(id, e.target.value)}
                                label={label}
                                error={!!errors[id]}
                                helperText={errors[id]}
                                {...props}
                            />
                        )
                    )}

                    <Button type="submit" variant="contained" disabled={processing}>
                        Enviar
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.propTypes = {
    user: PropTypes.object,
    categories: PropTypes.array,
};

export default Edit;
