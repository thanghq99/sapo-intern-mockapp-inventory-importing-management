import React from 'react'
import { Grid, Box, Paper, Avatar, Button, Modal, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { AddCircle } from '@mui/icons-material';



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


export default function User() {

    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (string) => {
        setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

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
                                sx={{ width: "14.3em", height: "14.3em", margin: "auto" }}
                            />
                            <Button sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }} variant="contained">Thay ảnh</Button>
                            <h3><strong style={{ fontSize: "1.5em" }}>Nhân viên kho</strong></h3>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item sx={{ padding: "2em 0" }}>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Họ và tên</strong>
                                </Grid>
                                <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                    Nhân viên số 1
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Id nhân viên</strong>
                                </Grid>
                                <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                    NVS1
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Email</strong>
                                </Grid>
                                <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                    nv1@gmail.com
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Vai trò</strong>
                                </Grid>
                                <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
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
                                <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Họ và tên</strong>
                            </Grid>
                            <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Id nhân viên</strong>
                            </Grid>
                            <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Email</strong>
                            </Grid>
                            <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
                                <Input sx={{ width: "90%" }} defaultValue="Hello world" />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                            <Grid item xs={5} >
                                <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong style={{ fontSize: "1.2em" }}>Vai trò</strong>
                            </Grid>
                            <Grid sx={{ fontSize: "1.2em" }} item xs={7} >
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
