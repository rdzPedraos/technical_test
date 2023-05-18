import { useContext } from 'react';
import PropTypes from 'prop-types';

import { FilterContext } from '@/Contexts/FilterContext';
import { PermIdentity } from '@mui/icons-material';

function Filters({ categories }) {
    const { filters, setFilters } = useContext(FilterContext);
    let selected = filters.categories ?? [];

    const onSelected = value => {
        if (selected.includes(value)) {
            selected = selected.filter(val => val != value);
        } else {
            selected.push(value);
        }

        setFilters(prev => ({
            ...prev,
            categories: selected,
        }));
    };

    return (
        <div className={`grid grid-cols-${categories.length} border-b-[1px]`}>
            {categories.map(({ id, value }) => (
                <p
                    key={id}
                    className={
                        'grid place-items-center px-2 py-5 cursor-pointer ' +
                        (selected.includes(value)
                            ? 'bg-gray-100 text-primary-900'
                            : 'bg-white hover:bg-gray-50 ')
                    }
                    onClick={() => onSelected(value)}
                >
                    <span className="flex items-center gap-2">
                        <PermIdentity />
                        {value}
                    </span>
                </p>
            ))}
        </div>
    );
}

Filters.propTypes = {
    categories: PropTypes.array,
};

export default Filters;
