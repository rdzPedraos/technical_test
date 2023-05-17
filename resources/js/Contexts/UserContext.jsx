import { createContext, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';

const UserContext = createContext();

function UserProvider({ children }) {
    const {
        auth: { user },
    } = usePage().props;

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export { UserContext, UserProvider };
