import React from 'react'
import { Grid, Box, Radio, Snackbar, Alert, RadioGroup, Paper, FormControlLabel, TextField, Avatar, Button, Modal, Input, TableContainer, Table, TableCell, TablePagination, TableRow, TableHead, TableBody } from '@mui/material';
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

const checkRole = (JSON.parse(sessionStorage.getItem("token"))?.role[0].name == "ADMIN");

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



    //set mode modal ==> delete or edit
    const [modeModal, setModeModal] = React.useState("")
    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (string) => {
        setModeModal(string)
        setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    // get all users********************************//
    const [trigger, setTrigger] = React.useState(false); // trigger to re-render supplier's info
    const [listUsers, setListUsers] = React.useState([]);
    React.useEffect(() => {
        const fetchListUsers = async () => {
            const res = await UsersApi.getAllUsers();
            setListUsers(res.data);
        }
        fetchListUsers();
    }, [trigger])

    // get an user********************************//
    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
        const fetchCurrentUser = async () => {
            const res = await UsersApi.getUserById(JSON.parse(sessionStorage.getItem("token")).id);
            setCurrentUser(res.data);
        }
        fetchCurrentUser();
    }, [])

    const [stateAlert, setStateAlert] = React.useState({ severity: "", variant: "", open: false, content: "" });
    // create an user******************************************//
    const [newUserRole, setNewUserRole] = React.useState()
    const [newUsername, setNewUsername] = React.useState()
    const [newUserPassword, setNewUserPassword] = React.useState()
    const [newUserPasswordAgain, setNewUserPasswordAgain] = React.useState()
    const [newUserEmail, setNewUserEmail] = React.useState()
    const createNewUserHandle = async (e) => {
        e.preventDefault();
        const newUser = {
            username: newUsername,
            email: newUserEmail,
            password: newUserPassword,
            role: newUserRole
        }
        if (newUsername == "" || newUserEmail == "" || newUserPassword == "") {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: "Yêu cầu điền tên đăng ký, email và mật khẩu" })
        } else {
            if (newUserPassword != newUserPasswordAgain) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Mật khẩu và xác nhận mật khẩu không khớp" })
            } else {
                try {
                    await UsersApi.createUserStaff(newUser);
                    setTrigger(!trigger);
                    setStateAlert({ severity: "success", variant: "filled", open: true, content: "Tao nhan vien thanh cong" })
                    setOpenModal(false);
                } catch (error) {
                    setStateAlert({ severity: "error", variant: "filled", open: true, content: "Người dùng hoặc email này đã tồn tại" })
                }
            }

        }
    }


    return (
        <div style={{ background: "#F4F6F8", padding: "0 2em 1em 0", height: "100%" }}>
            <Grid sx={{ textAlign: "end" }}>
                {checkRole && <Button onClick={() => handleOpenModal("create")} variant="contained" sx={{ marginTop: "2em" }} startIcon={<AddCircle />}>Thêm nhân viên</Button>}
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
                            <Button sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }} variant="outlined">Thay ảnh</Button>
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
                                    {currentUser.username}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.id}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.email}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.roles?.map((role) => (role.name))}
                                </Grid>
                            </Grid>
                            {checkRole && <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                <Button onClick={() => handleOpenModal("update")} variant="outlined" startIcon={<BrowserUpdatedIcon />} sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Chỉnh sửa thông tin</Button>
                                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Xóa nhân viên</Button>
                            </Grid>}
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
                                    .reverse()
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
                        labelRowsPerPage="Số hàng một trang"
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
            {
                (modeModal === "update") ?
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
                                        <Input sx={{ width: "90%" }} defaultValue={currentUser.username} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Input sx={{ width: "90%" }} defaultValue={currentUser.id} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Input sx={{ width: "90%" }} defaultValue={currentUser.email} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                                    </Grid>
                                    <RadioGroup
                                        aria-label="gender"
                                        defaultValue={currentUser.roles[0].name}
                                        name="radio-buttons-group"
                                        sx={{ marginLeft: "4em", display: "inline-block", alignItems: "center" }}
                                    >
                                        <FormControlLabel value="STORAGE_KEEPER" control={<Radio />} label="Nhân viên nhập kho" />
                                        <FormControlLabel value="ACCOUNTANT" control={<Radio />} label="Kế toán" />
                                    </RadioGroup>
                                </Grid>
                                <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                    <Button variant="outlined" color="success" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Lưu thay đổi</Button>
                                    <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Quay lại</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                    :
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ margin: 0, padding: "6em", textAlign: "center" }}
                    >
                        <Box sx={{ margin: "auto", background: "white", width: "50%", padding: "2em 3em" }}>
                            <h3><strong style={{ fontSize: "1.5em" }} >Tạo mới nhân viên</strong></h3>
                            <TextField
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                                id="outlined-required"
                                label="Tên đăng nhập nhân viên"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                required
                                id="outlined-required"
                                label="Email nhân viên"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                required
                                id="outlined-required"
                                label="Mật khẩu"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserPasswordAgain(e.target.value)}
                                required
                                id="outlined-required"
                                label="Nhập lại mật khẩu"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <Grid sx={{ display: "flex", alignItems: "center" }}>
                                <h3><strong>Chọn vai trò của nhân viên</strong></h3>
                                <RadioGroup
                                    onChange={(e) => setNewUserRole(e.target.value)}
                                    aria-label="gender"
                                    name="radio-buttons-group"
                                    sx={{ marginLeft: "4em", display: "inline-block", alignItems: "center" }}
                                >
                                    <FormControlLabel value="STORAGE_KEEPER" control={<Radio />} label="Nhân viên nhập kho" />
                                    <FormControlLabel value="ACCOUNTANT" control={<Radio />} label="Kế toán" />
                                </RadioGroup>
                            </Grid>
                            <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                <Button onClick={createNewUserHandle} variant="outlined" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Xac nhan</Button>
                                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Quay lại</Button>
                            </Grid>
                        </Box>
                    </Modal>
            }
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={stateAlert.open}
                autoHideDuration={2000}
                onClose={() => setStateAlert({ ...stateAlert, open: false })}
            >
                <Alert
                    onClose={() => setStateAlert({ ...stateAlert, open: false })}
                    severity={stateAlert.severity}
                    variant={stateAlert.variant}
                    sx={{ width: '100%' }}
                >
                    {stateAlert.content}
                </Alert>
            </Snackbar>
        </div >
    )
}
