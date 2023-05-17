import React from 'react';
import PropTypes from 'prop-types';

function user({ name, tags, onDelete, onEdit }) {
    return <div>{name}</div>;
}

user.propTypes = {
    name: PropTypes.string,
    tags: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

export default user;
