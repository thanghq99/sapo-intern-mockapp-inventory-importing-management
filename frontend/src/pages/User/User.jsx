import React from 'react'
import { Grid, Box, Paper, Avatar, Button, Modal, Input, TableContainer, Table, TableCell, TablePagination, TableRow, TableHead, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { AddCircle } from '@mui/icons-material';
import UsersApi from '../../api/UsersApi';



function parseJwt(token) {
    var base64Url = token?.split('.')[1];
    var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// console.log(JSON.parse(sessionStorage.getItem("token")));
// sessionStorage.getItem("token") && console.log(parseJwt(JSON.parse(sessionStorage.getItem("token")).jwt));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const columns = [
    { id: 'Id nhân viên', label: 'Id nhân viên' },
    { id: 'Tên nhân viên', label: 'Tên nhân viên' },
    { id: 'role', label: 'Vai trò nhân viên' },
    { id: 'email', label: 'Email nhân viên' }
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

export default function User() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (string) => {
        setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    // get all users********************************//
    //const [trigger, setTrigger] = React.useState(false); // trigger to re-render supplier's info
    const [listUsers, setListUsers] = React.useState([]);
    React.useEffect(() => {
        const fetchUsers = async () => {
            const res = await UsersApi.getAllUsers();
            setListUsers(res.data);
        }
        fetchUsers();
    }, [])


    return (
        <div style={{ background: "#F4F6F8", padding: "0 2em 1em 0", height: "100%" }}>
            <Grid sx={{ textAlign: "end" }}>
                {(parseJwt(JSON.parse(sessionStorage.getItem("token")).jwt).sub === "admin") && <Button variant="contained" sx={{ marginTop: "2em" }} startIcon={<AddCircle />}>Thêm nhân viên</Button>}
            </Grid>
            <Box sx={{ flexGrow: 1, margin: 0, backGround: "white" }}>
                <Grid sx={{ margin: 0 }} container spacing={2}>
                    <Grid item xs={4}>
                        <Item>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: "14em", height: "14em", margin: "auto" }}
                            />
                            <Button sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }} variant="contained">Thay ảnh</Button>
                            <h3><strong style={{ fontSize: "1.5em" }}>Nhân viên kho</strong></h3>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item sx={{ padding: "2em 0" }}>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Họ và tên</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    Nhân viên số 1
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    NVS1
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    nv1@gmail.com
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    Nhân viên kho
                                </Grid>
                            </Grid>
                            <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                <Button onClick={() => setOpenModal(true)} variant="outlined" startIcon={<BrowserUpdatedIcon />} sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Chỉnh sửa thông tin</Button>
                                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Xóa nhân viên</Button>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Box >
            <Grid sx={{ padding: "4em 0em 1em 1em" }}>
                <h3 style={{ marginBottom: "1em" }}><strong style={{ fontSize: "1.5em" }}>Thông tin nhân viên đang hoạt động</strong></h3>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align="center"
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="center">{row.id} </TableCell>
                                                <TableCell align="center">{row.username} </TableCell>
                                                <TableCell align="center">{row.roles?.map((r) => (r.name))} </TableCell>
                                                <TableCell align="center">{row.email} </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={listUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ margin: 0, padding: "6em", textAlign: "center" }}
            >
                <Box sx={{ flexGrow: 1, margin: "auto", background: "white", width: "90vw" }}>
                    <Grid sx={{ margin: 0, display: "grid", padding: "3em", textAlign: "center " }} container spacing={2}>
                        <h3><strong style={{ fontSize: "1.5em" }} >Thay đổi thông tin nhân viên</strong></h3>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Họ và tên</strong>
                            </Grid>
                            <Grid item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                            </Grid>
                            <Grid item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                            </Grid>
                            <Grid item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                            </Grid>
                            <Grid item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                            <Button variant="outlined" color="success" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Lưu thay đổi</Button>
                            <Button variant="outlined" color="error" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Quay lại</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    )
}
