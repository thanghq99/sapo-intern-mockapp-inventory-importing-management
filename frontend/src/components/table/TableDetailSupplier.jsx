import * as React from 'react';
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

function createHistoryOrderTable(Id, Code, TransactionStatus, ImportedStatus, Status, CreatedBy, CreatedAt, UpdatedAt, TotalAmount, TotalPrice, ExpectedTime) {
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

const rowsHistoryOrder = [
    createHistoryOrderTable('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021", "200", "100.000", "14/12/2021"),
    createHistoryOrderTable('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021", "200", "100.000", "14/12/2021"),
    createHistoryOrderTable('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021", "200", "100.000", "14/12/2021"),
    createHistoryOrderTable('No1', "CODE1", "Chưa giao dịch", "Đã nhập hàng", "Đang hoạt động", "Nhân viên 1", "12/12/2021", "13/12/2021", "200", "100.000", "14/12/2021")
];
export function HistoryOrderTable() {
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
                    {rowsHistoryOrder.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}




function createContactTable(Name, PhoneNumber, Gene, Age, Address) {
    return { Name, PhoneNumber, Gene, Age, Address };
}
const rowsContactTable = [
    createContactTable('Nguyen Van A', "0987654321", "Nam", "30", "Hai Ba Trung, Ha Noi"),
    createContactTable('Nguyen Van A', "0987654321", "Nam", "30", "Hai Ba Trung, Ha Noi"),
    createContactTable('Nguyen Van A', "0987654321", "Nam", "30", "Hai Ba Trung, Ha Noi")
];
export function ContactTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên người đại diện</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Giới tính</TableCell>
                        <TableCell align="center">Tuổi</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsContactTable.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.Name}
                            </TableCell>
                            <TableCell align="center">{row.PhoneNumber}</TableCell>
                            <TableCell align="center">{row.Gene}</TableCell>
                            <TableCell align="center">{row.Age}</TableCell>
                            <TableCell align="center">{row.Address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}





function createDebtTable(IdBill, TotalAmount, PaidAmount) {
    const Debt = TotalAmount - PaidAmount;
    return { IdBill, TotalAmount, PaidAmount, Debt };
}
function subtotal(items) {
    return items.map(({ Debt }) => Debt).reduce((sum, i) => sum + i, 0);
}
const rowsDebtTable = [
    createDebtTable('BILL 01', 100000, 20000),
    createDebtTable('BILL 02', 75000, 45000),
    createDebtTable('Bill 03', 200000, 170000),
];
const TotalDebt = subtotal(rowsDebtTable);
export function DebtTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Phần thông tin đơn nợ
                        </TableCell>
                        <TableCell align="center">Số nợ</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Id đơn nợ</TableCell>
                        <TableCell align="center">Tổng tiền</TableCell>
                        <TableCell align="center">Đã trả</TableCell>
                        <TableCell align="center">Còn nợ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsDebtTable.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell>{row.IdBill}</TableCell>
                            <TableCell style={{ color: "blue" }} align="center">{row.TotalAmount}</TableCell>
                            <TableCell style={{ color: "green" }} align="center">{row.PaidAmount}</TableCell>
                            <TableCell style={{ color: "red" }} align="center">{row.Debt}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Tổng nợ</TableCell>
                        <TableCell style={{ color: "red" }} align="center">{TotalDebt}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}