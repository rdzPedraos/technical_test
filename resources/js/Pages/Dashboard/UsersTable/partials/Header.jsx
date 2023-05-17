import { TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import Filters from './Filters';

function Header() {
    return (
        <TableHead>
            <Pagination />
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Categorias</TableCell>
                <TableCell align="right">Opciones</TableCell>
            </TableRow>
        </TableHead>
    );
}

Header.propTypes = {};

export default Header;
