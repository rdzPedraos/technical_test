import logo from '@/../img/logo.png';
import PropTypes from 'prop-types';

const MEASURES = {
    sm: {
        img: 'w-10 h-10',
        text: 'text-md',
    },
    md: {
        img: 'w-15 h-15',
        text: 'text-lg',
    },
    lg: {
        img: 'w-20 h-20',
        text: 'text-3xl',
    },
};

export default function ApplicationLogo({ size = 'lg', ...props }) {
    const { img: imgSize, text: textSize } = MEASURES[size];

    return (
        <picture className="flex items-center" {...props}>
            <img className={imgSize} src={logo} alt="company logo" />
            <p className={`${textSize} text-primary-900 font-bold`}>Owl Company</p>
        </picture>
    );
}

ApplicationLogo.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
