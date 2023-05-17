import PropTypes from 'prop-types';
import { Box, IconButton, TableCell, TablePagination, TableRow, TextField } from '@mui/material';
import {
    FirstPageOutlined,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPageOutlined,
} from '@mui/icons-material';

// eslint-disable-next-line react/prop-types
function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageOutlined />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageOutlined />
            </IconButton>
        </Box>
    );
}

function Pagination() {
    return (
        <TableRow>
            <TableCell colSpan={2}>
                <TextField label="Buscar por id o nombre" variant="outlined" fullWidth />
            </TableCell>

            <TablePagination
                colSpan={2}
                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                count={30}
                rowsPerPage={5}
                page={1}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'Registros por página',
                    },
                    native: true,
                }}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
                ActionsComponent={TablePaginationActions}
            />
        </TableRow>
    );
}

Pagination.propTypes = {};

export default Pagination;
