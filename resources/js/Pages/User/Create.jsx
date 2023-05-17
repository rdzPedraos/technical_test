import { Head, useForm } from '@inertiajs/react';

import { Button, ListItemIcon, MenuItem, Select, TextField } from '@mui/material';
import UserConfigInputs from '@/Config/UserConfig';

function Create(props) {
    const values = {};

    UserConfigInputs.forEach(input => {
        values[input.id] = input.value ?? '';

        if (input.id_options) {
            input.options = props[input.id_options];
        }
    });

    const { data, setData, errors, post, processing } = useForm(values);

    const onSubmit = e => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <>
            <Head title="Crear Usuario" />

            <div className="max-w-md mt-5 mx-auto">
                <h1 className="text-3xl font-bold text-center uppercase">Crear Usuario</h1>
                <p className="mt-4 text-gray-600">
                    Este apartado es para que agreges usuarios no listados!!
                </p>

                <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6">
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
                                value={data[id]}
                                onChange={e => setData(id, e.target.value)}
                                label={label}
                                error={!!errors[id]}
                                helperText={errors[id]}
                                {...props}
                            />
                        )
                    )}

                    <Button type="submit" variant="contained" processing={processing}>
                        Enviar
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Create;
