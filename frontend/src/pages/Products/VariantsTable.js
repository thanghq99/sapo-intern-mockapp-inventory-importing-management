import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SquareRounded,
  CheckBoxRounded,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              //fix cho nay
              //   `${'Đã chọn' + ${numSelected} 'phiên bản'}: 'Đã chọn tất cả phiên bản',
              "aria-label": "Đã chọn tất cả phiên bản",
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="30px"
          >
            {numSelected === 0 && (
              <Typography
                // sx={{ flex: "1 1 100%" }}
                variant="subtitle2"
                id="tableTitle"
                sx={{ fontSize: "1rem", fontWeight: "normal" }}
                // component="div"
              >
                Phiên bản ({rows.length})
              </Typography>
            )}

            {numSelected !== rows.length && numSelected > 0 && (
              <Typography
                // sx={{ flex: "1 1 100%" }}
                variant="subtitle2"
                id="tableTitle"
                sx={{ fontSize: "1rem", fontWeight: "normal" }}
                component="div"
              >
                Đã chọn {numSelected} phiên bản
              </Typography>
            )}
            {numSelected === rows.length && numSelected > 0 && (
              <Typography
                // sx={{ flex: "1 1 100%" }}
                variant="subtitle2"
                id="tableTitle"
                sx={{ fontSize: "1rem", fontWeight: "normal" }}
                component="div"
              >
                Đã chọn tất cả phiên bản
              </Typography>
            )}

            {numSelected > 0 && (
              <Button variant="outlined" color="error">
                Xóa
              </Button>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const { openVariantSelectActions, setOpenVariantSelectActions } =
    useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected === 0 && (
        <Typography
          //sx={{ flex: "1 1 100%" }}
          variant="subtitle2"
          id="tableTitle"
          //component="div"
        >
          Phiên bản ({rows.length})
        </Typography>
      )}

      {numSelected !== rows.length && numSelected > 0 && (
        <Typography
          //sx={{ flex: "1 1 100%" }}
          variant="subtitle2"
          id="tableTitle"
          //component="div"
        >
          Đã chọn {numSelected} phiên bản
        </Typography>
      )}
      {numSelected === rows.length && numSelected > 0 && (
        <Typography
          //sx={{ flex: "1 1 100%" }}
          variant="subtitle2"
          id="tableTitle"
          //component="div"
        >
          Đã chọn tất cả phiên bản
        </Typography>
      )}

      {numSelected > 0 && (
        <Button variant="outlined" color="error">
          Xóa
        </Button>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ setVariantInfo }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [chosenVariant, setChosenVariant] = React.useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChoseVariant = (even, name) => {
    setVariantInfo(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} square sx={{ width: "100%", mb: 2, padding: 1 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{
                        backgroundColor:
                          row.name === chosenVariant
                            ? "rgb(0, 136, 255)"
                            : "none",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row.name)}
                          icon={
                            <SquareRounded
                              stroke={"gray"}
                              stroke-width={1}
                              sx={{ color: "white" }}
                            />
                          }
                          checkedIcon={<CheckBoxRounded />}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={(event) => {
                          handleChoseVariant(event, row.name);
                          setChosenVariant(row.name);
                        }}
                      >
                        <Box py={1} display="flex" alignItems="center">
                          <Box
                            width="40px"
                            height="40px"
                            backgroundColor="green"
                            mr={2}
                          ></Box>
                          <Box
                            py={1}
                            display="flex"
                            flexDirection="column"
                            sx={{
                              color:
                                (row.name === chosenVariant && isSelected(row.name) === false)
                                  ? "white"
                                  : "black",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: "1rem", fontWeight: "normal"}}
                            >
                              {row.name}
                            </Typography>
                            <Box display="flex">
                              <Typography sx={{ pr: 4 }}>Tồn kho: 3</Typography>
                              <Typography>Có thể bán: 3</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
