import PropTypes from 'prop-types';

import Pagination from './Pagination';
import { TableCell, TableHead, TableRow } from '@mui/material';

function Header({ showCategories }) {
    return (
        <TableHead>
            <Pagination />
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '200px' }}>Nombre</TableCell>
                {showCategories && <TableCell sx={{ fontWeight: 'bold' }}>Categorias</TableCell>}
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                    Opciones
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

Header.propTypes = {
    showCategories: PropTypes.bool,
};

export default Header;
