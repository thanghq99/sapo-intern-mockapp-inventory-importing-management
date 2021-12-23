import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(Id, Code, TransactionStatus, ImportedStatus, Status, CreatedBy, CreatedAt, UpdatedAt, TotalAmount, TotalPrice, ExpectedTime) {
    return {
        Id, Code, TransactionStatus, ImportedStatus, Status, CreatedBy, CreatedAt, UpdatedAt, TotalAmount, TotalPrice, ExpectedTime,
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Id}
                </TableCell>
                <TableCell>{row.Code}</TableCell>
                <TableCell>{row.TransactionStatus}</TableCell>
                <TableCell>{row.ImportedStatus}</TableCell>
                <TableCell>{row.Status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nhân viên</TableCell>
                                        <TableCell>Tạo đơn</TableCell>
                                        <TableCell>Cập nhật</TableCell>
                                        <TableCell>Tổng số lượng</TableCell>
                                        <TableCell>Tổng giá</TableCell>
                                        <TableCell>Nhập dự kiến</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{row.CreatedBy}</TableCell>
                                        <TableCell>{row.CreatedAt}</TableCell>
                                        <TableCell>{row.UpdatedAt}</TableCell>
                                        <TableCell>{row.TotalAmount}</TableCell>
                                        <TableCell>{row.TotalPrice}</TableCell>
                                        <TableCell>{row.ExpectedTime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const rows = [
    createData('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021","200", "100.000", "14/12/2021"),
    createData('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021","200", "100.000", "14/12/2021"),
    createData('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021","200", "100.000", "14/12/2021"),
    createData('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021","200", "100.000", "14/12/2021")
];

export default function TableHistoryOrder() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Id Đơn nhập</TableCell>
                        <TableCell>Mã</TableCell>
                        <TableCell>Trạng thái thanh toan</TableCell>
                        <TableCell>Trạng thái nhập</TableCell>
                        <TableCell>Trạng thái giao dich</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}