import { Box, IconButton, TableCell, TablePagination, TableRow } from '@mui/material';
import {
    FirstPageOutlined,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPageOutlined,
} from '@mui/icons-material';
import Searching from './Searching';
import { FilterContext } from '@/Contexts/FilterContext';
import { useContext } from 'react';

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
    const { pagination, onSubmit } = useContext(FilterContext);

    const onPageChange = (ev, newPage) => {
        onSubmit({
            ...pagination,
            page: newPage + 1,
        });
    };

    const onRowsPerPageChange = ev => {
        onSubmit({
            ...pagination,
            per_page: ev.target.value,
        });
    };

    return (
        <TableRow>
            <TableCell colSpan={3}>
                <Searching />
            </TableCell>

            <TablePagination
                colSpan={2}
                component={TableCell}
                count={pagination.total ?? 0}
                page={pagination.page - 1}
                rowsPerPage={pagination.per_page}
                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: pagination.total ?? -1 }]}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'Registros por página',
                    },
                    native: true,
                }}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={TablePaginationActions}
            />
        </TableRow>
    );
}

Pagination.propTypes = {};

export default Pagination;
