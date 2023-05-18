import { useEffect } from 'react';
import PropTypes from 'prop-types';
import waves from 'nice-waves';

const opts = {
    fills: ['rgba(172, 194, 242, 0.6)', 'rgba(149, 176, 235, 0.5)', 'rgba(17, 72, 188, 0.5)'],
    wavelength: 15,
};

function GuestLayout({ children }) {
    useEffect(() => {
        waves(opts).mount();
    }, []);

    return (
        <div className="min-h-screen bg-base_white flex items-center justify-center relative">
            <main className="w-full mx-6">{children}</main>
            <div id="waves" className="absolute w-screen h-1/5 bottom-0"></div>
        </div>
    );
}

GuestLayout.propTypes = {
    children: PropTypes.element,
};

export default GuestLayout;
