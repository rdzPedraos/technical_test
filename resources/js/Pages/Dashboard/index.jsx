import { Head, Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import UsersTable from './UsersTable';
import { FilterProvider } from '@/Contexts/FilterContext';
import { Button } from '@mui/material';
import { PersonAddAlt1Outlined } from '@mui/icons-material';

export default function Dashboard({ categories }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex justify-end mb-5">
                <Link href={route('users.create')}>
                    <Button variant="contained" className="flex gap-2">
                        <PersonAddAlt1Outlined />
                        Crear usuario
                    </Button>
                </Link>
            </div>

            <FilterProvider>
                <UsersTable categories={categories} />
            </FilterProvider>
        </>
    );
}

Dashboard.propTypes = {
    users: PropTypes.array,
    categories: PropTypes.array,
};
