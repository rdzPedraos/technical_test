import { Head } from '@inertiajs/react';
import PropTypes from 'prop-types';
import UsersTable from './UsersTable';
import { FilterProvider } from '@/Contexts/FilterContext';

export default function Dashboard({ categories }) {
    return (
        <>
            <Head title="Dashboard" />
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
