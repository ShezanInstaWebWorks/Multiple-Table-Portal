import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button, Popover, Typography } from "@mui/material";




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
  return order === "asc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "url",
    numeric: true,
    disablePadding: false,
    label: "API URL",
  },
  {
    id: "request",
    numeric: false,
    disablePadding: false,
    label: "Request",
  },
  {
    id: "response",
    numeric: false,
    disablePadding: false,
    label: "Response",
  },
  {
    id: "json_view",
    numeric: false,
    disablePadding: false,
    label: "JSON View",
  },
];

function EnhancedTableHead(props) {
  const {  onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: "black" }}>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ padding:"0 0 0 0",paddingLeft: "20px" }}
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                },
              }}
            >
              <h4 style={{ color: "white" }}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ActivityTable({data}) {
  const activity_data=data?.responseLogs;
  console.log("act",activity_data);
  

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("url");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  React.useEffect(()=>{
    document.addEventListener("click", handleClosePopover);
    return () => {
      document.removeEventListener("click", handleClosePopover);
    };
  },[anchorEl])
  const handleClosePopover = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      setAnchorEl(null);
    }
  };
  const handleClick = (event, rowData) => {
    setSelectedRowData(rowData);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const compareID = (a, b, order) => {
    const id_A = a.id;
    const id_B = b.id;
    if (order === "asc") {
      return id_A - id_B;
    } else {
      return id_B - id_A;
    }
  };
 const compareRequest = (a, b, order) => {
  const A = a.created_at.toString();
  const B = b.created_at.toString();

  if (order === "asc") {
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  } else {
    if (B < A) return -1;
    if (B > A) return 1;
    return 0;
  }
};



  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = activity_data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, id) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activity_data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(activity_data, (a, b) =>
      orderBy === "request"
        ? compareRequest(a, b, order)
        : orderBy === "url"
        ? compareID(a, b, order)
        : getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [activity_data,order, orderBy, page, rowsPerPage]
  );
 
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
    <Box sx={{ width: "80%", padding: "50px 50px 50px 150px" }}>
      <h3 style={{ textAlign: "left" }}>Activity</h3>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{ borderTopLeftRadius: "px", borderTopRightRadius: "5px" }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={activity_data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      sx={{ paddingLeft: "20px" }}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row?.api_url}
                    </TableCell>
                    <TableCell sx={{ paddingLeft: "20px" }} align="left">
                      {row?.req}
                    </TableCell>
                    <TableCell 
                    onClick={() => handleCopyToClipboard(row?.res)}
                    sx={{ paddingLeft: "20px" }} align="left">
                      {truncateString(row?.res, 30)}
                    </TableCell>
                    <TableCell>
                    <div>
                      <Button
                        aria-describedby={id}
                        size="small"
                        variant="outlined"
                        onClick={(event) => handleClick(event, row)}
                      >
                        view
                      </Button>
                      <Popover
                      // sx={{maxWidth:"700px"}}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        {selectedRowData && (
                          <Typography sx={{ p: 2 }}>
                            <pre>
                              {JSON.stringify(selectedRowData, null, 2)}
                            </pre>
                          </Typography>
                        )}
                      </Popover>
                    </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activity_data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
