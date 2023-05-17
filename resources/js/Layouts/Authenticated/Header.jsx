import { useContext } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '@/Contexts/UserContext';
import ApplicationLogo from '@/Components/ApplicationLogo';
import LinkComponent from '@/Components/Link';

import { ClearOutlined } from '@mui/icons-material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

function Header({ className, ...props }) {
    const { user } = useContext(UserContext);

    return (
        <header className={`flex justify-between items-center p-5 ${className}`} {...props}>
            <ApplicationLogo />

            {route().current('dashboard') && (
                <LinkComponent
                    className="flex gap-2 hover:text-primary-900"
                    href={route('profile.edit')}
                >
                    <p>{'Hi ' + user.name + '!'}</p>
                    {'|'}
                    <ManageAccountsOutlinedIcon />
                </LinkComponent>
            )}

            {route().current('profile.edit') && (
                <LinkComponent href={route('dashboard')}>
                    <ClearOutlined />
                </LinkComponent>
            )}
        </header>
    );
}

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
