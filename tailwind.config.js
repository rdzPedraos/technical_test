import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                base: 'rgb( var(--base-color) / <alpha-value> )',
                'primary-900': 'rgb( var(--primary-color-900) / <alpha-value> )',
                'primary-700': 'rgb( var(--primary-color-700) / <alpha-value> )',
                secondary: 'rgb( var(--secondary-color) / <alpha-value> )',
                success: 'rgb( var(--success-color) / <alpha-value> )',
                danger: 'rgb( var(--danger-color) / <alpha-value> )',
            },
        },
    },

    plugins: [forms],
};
