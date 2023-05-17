import { Head } from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function Dashboard({ users }) {
    return (
        <>
            <Head title="Dashboard" />
        </>
    );
}

Dashboard.propTypes = {
    auth: PropTypes.object,
};
