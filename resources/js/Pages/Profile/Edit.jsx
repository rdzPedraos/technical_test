import { Link } from '@inertiajs/react';
import { Button } from '@mui/material';

export default function Edit() {
    return (
        <div>
            <Link method="post" href={route('logout')}>
                <Button>Salir</Button>
            </Link>
        </div>
    );
}
