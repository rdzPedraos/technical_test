/* eslint-disable indent */
import PropTypes from 'prop-types';
import Text from './Text';
import SelectInput from './Select';

function Input({ input, value, error, onChange }) {
    const { type } = input;

    switch (type) {
        case 'select':
            return <SelectInput {...{ input, value, error, onChange }} />;
        default:
            return <Text {...{ input, value, error, onChange }} />;
    }
}

Input.propTypes = {
    input: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        type: PropTypes.string,
        options: PropTypes.array,
        idAsValue: PropTypes.bool,
    }),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    error: PropTypes.string,
    onChange: PropTypes.func,
};

export default Input;
