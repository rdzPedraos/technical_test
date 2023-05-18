import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function Text({ input, value, error, onChange, ...props }) {
    return (
        <TextField
            fullWidth
            id={input.id}
            name={input.id}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            {...input}
            {...props}
        />
    );
}

Text.propTypes = {
    input: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    error: PropTypes.string,
    onChange: PropTypes.func,
};

export default Text;
