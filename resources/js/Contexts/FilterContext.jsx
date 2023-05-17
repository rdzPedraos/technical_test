import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const FilterContext = createContext();

function FilterProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        per_page: 5,
        page: 1,
    });

    //? Get info each filters is updated
    useEffect(() => {
        setLoading(true);

        axios
            .post(route('users.index'), { filters })
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(error => {
                console.catch(error);
            });
    }, [filters]);

    //? If user is updated so... waiting 2 seconds and set loading in false.
    useEffect(() => {
        if (loading === true) {
            setTimeout(() => setLoading(false), 2000);
        }
    }, [users, loading]);

    return (
        <FilterContext.Provider
            value={{
                filters,
                setFilters,
                users,
                pagination,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

FilterProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export { FilterProvider, FilterContext };
