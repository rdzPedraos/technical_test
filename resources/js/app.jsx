import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import GuestLayout from './Layouts/Guest';
import AuthenticatedLayout from './Layouts/Authenticated';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );

        page.then(module => {
            if (module.default.layout === undefined) {
                let Component = <></>;

                if (name.startsWith('Auth/')) Component = GuestLayout;
                else Component = AuthenticatedLayout;

                module.default.layout = page => <Component>{page}</Component>;
            }
        });

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
