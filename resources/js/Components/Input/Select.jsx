import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

function SelectInput({ input, value, error, onChange }) {
    const { id, label, options, idAsValue, renderValue, multiple } = input;

    return (
        <FormControl>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                label={label}
                value={value}
                onChange={onChange}
                {...{ renderValue, multiple }}
            >
                {options.map(option => (
                    <MenuItem key={option.id} value={idAsValue ? option.id : option.value}>
                        {option.icon && option.icon}
                        {option.value && option.value}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
}

SelectInput.propTypes = {
    input: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        options: PropTypes.array,
        idAsValue: PropTypes.bool,
        renderValue: PropTypes.func,
        multiple: PropTypes.bool,
    }),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    error: PropTypes.string,
    onChange: PropTypes.func,
};

export default SelectInput;
