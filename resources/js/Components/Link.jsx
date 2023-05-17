import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

function LinkComponent({ className, children, ...props }) {
    return (
        <Link className={`${className} hover:text-primary-900`} {...props}>
            {children}
        </Link>
    );
}

LinkComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default LinkComponent;
