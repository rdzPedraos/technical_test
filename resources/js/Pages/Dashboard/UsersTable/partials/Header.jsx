import { TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';

function Header() {
    return (
        <TableHead>
            <Pagination />
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Categorias</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                    Opciones
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

Header.propTypes = {};

export default Header;
