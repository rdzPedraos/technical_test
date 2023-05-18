import PropTypes from 'prop-types';
import Header from './Header';

function AuthenticatedLayout({ children }) {
    return (
        <div className="flex flex-col h-full max-w-6xl gap-4 mx-auto">
            <Header />
            <main className="mb-16">{children}</main>
        </div>
    );
}

AuthenticatedLayout.propTypes = {
    children: PropTypes.element,
};

export default AuthenticatedLayout;
