import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FilterContext = createContext();

function FilterProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        per_page: 5,
        page: 1,
    });

    //? Get info each filters is updated
    const onSubmit = (page = pagination) => {
        setLoading(true);

        axios
            .post(route('users.index'), { ...filters, ...page })
            .then(({ data: { data, current_page, total, per_page } }) => {
                console.log('RESPONSE');

                setUsers(data);
                setPagination({
                    page: current_page,
                    total,
                    per_page,
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onSubmit, [filters]);

    //? If user is updated so... waiting 2 seconds and set loading in false.
    useEffect(() => {
        if (loading === true) {
            setTimeout(() => setLoading(false), 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    return (
        <FilterContext.Provider
            value={{
                filters,
                setFilters,
                users,
                pagination,
                setPagination,
                onSubmit,
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
