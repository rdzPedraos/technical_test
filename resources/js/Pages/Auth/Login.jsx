import { Head, useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = e => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            <form onSubmit={submit}>
                <TextField
                    id="email"
                    type="email"
                    value={data.email}
                    placeholder="admin@admin.com"
                    focused={true}
                    onChange={e => setData('email', e.target.value)}
                    helperText={errors.email}
                    error={!!errors.email}
                />

                <TextField
                    type="password"
                    value={data.password}
                    placeholder="******"
                    isFocused={true}
                    onChange={e => setData('password', e.target.value)}
                    helperText={errors.password}
                    error={!!errors.password}
                />

                <Button variant="contained" type="submit" disabled={processing}>
                    Enviar
                </Button>
            </form>
        </>
    );
}
