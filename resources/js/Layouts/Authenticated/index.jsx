import { UserProvider } from '@/Contexts/UserContext';
import PropTypes from 'prop-types';
import Header from './Header';

function AuthenticatedLayout({ children }) {
    return (
        <UserProvider>
            <div className="flex flex-col h-full max-w-5xl gap-4 mx-auto">
                <Header />
                <main>{children}</main>
            </div>
        </UserProvider>
    );
}

AuthenticatedLayout.propTypes = {
    children: PropTypes.element,
};

export default AuthenticatedLayout;
