import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from '@/Contexts/FilterContext';
import { TextField } from '@mui/material';

function Searching(props) {
    const { filters, setFilters } = useContext(FilterContext);

    const onChange = e => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    return (
        <>
            <TextField
                value={filters.search ?? ''}
                onChange={onChange}
                label="Buscar por id o nombre"
                variant="outlined"
                fullWidth
            />
        </>
    );
}

Searching.propTypes = {};

export default Searching;
