import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, Button, Popover, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'setting_id', numeric: true, disablePadding: false, label: 'Setting ID' },
    { id: 'module_name', numeric: false, disablePadding: false, label: 'Module Name' },
    { id: 'setting_type', numeric: false, disablePadding: false, label: 'Setting Type' },
    { id: 'uuid', numeric: false, disablePadding: false, label: 'UUID' },
    { id: 'setting_schema', numeric: false, disablePadding: false, label: 'Schema' },
    { id: 'json_view', numeric: false, disablePadding: false, label: 'JSON View' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ bgcolor: 'black' }}>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{padding: '0', paddingLeft: '20px'}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                '& .MuiTableSortLabel-icon': {
                                    color: 'white !important',
                                },
                            }}
                        >
                            <h4 style={{ color: 'white' }}>
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </h4>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function SettingsTable({ data }) {
    let setting_data = data?.settingResps;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('setting_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRowData, setSelectedRowData] = React.useState(null);

    const handleClick = (event, rowData) => {
        setSelectedRowData(rowData);
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const visibleRows = React.useMemo(() => stableSort(setting_data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [setting_data, order, orderBy, page, rowsPerPage]);
    const handleCopyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard:', text);
          // You can optionally show a notification or perform any other action after copying
        })
        .catch((error) => {
          console.error('Failed to copy text to clipboard:', error);
        });
    };
  
    const truncateString = (str, maxLength) => {
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
      }
      return str;
    };
    return (
        <Box sx={{ width: '80%', padding: '50px 50px 50px 150px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={setting_data.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" scope="row" padding="none" align="left" sx={{ paddingLeft: '20px' }}>{row.setting_id}</TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: '20px' }}>{row.module_name}</TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: '20px' }}>{row.setting_type}</TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: '20px' }}>{row.uuid}</TableCell>
                                        <TableCell
                                        onClick={() => handleCopyToClipboard(JSON.stringify(row?.setting_schema))}
                                        align="left" sx={{ paddingLeft: '20px' }}>{truncateString(JSON.stringify(row?.setting_schema), 30)}</TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: '20px' }}>
                                        <div>
      <Button aria-describedby={id} size='small' variant='outlined' onClick={(event)=>handleClick(event, row)}>
        View
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {selectedRowData && (
                        <Typography sx={{ p: 2 }}>
                            <pre>{JSON.stringify(selectedRowData,null,2)}</pre>
                            </Typography>
                    )}
      </Popover>
    </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={setting_data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </Paper>
        </Box>
    );
}
