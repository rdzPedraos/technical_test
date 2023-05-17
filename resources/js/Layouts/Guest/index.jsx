import PropTypes from 'prop-types';

function GuestLayout({ children }) {
    return <div>{children}</div>;
}

GuestLayout.propTypes = {
    children: PropTypes.element,
};

export default GuestLayout;
