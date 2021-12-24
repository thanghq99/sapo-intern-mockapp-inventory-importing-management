import { Button, Grid, Modal, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import "./detailSupplier.scss"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { ContactTable, DebtTable, HistoryOrderTable } from '../../components/table/TableDetailSupplier';
import DeleteIcon from '@mui/icons-material/Delete';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import SupplierAPI from '../../api/SupplierAPI';


const style = {
    textAlign: "center",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


//tab panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}// end tab panel

// transition of alert 
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}



export default function DetailSupplier() {

    // handle Alert
    const [alert, setAlert] = React.useState({
        openAlert: false,
        Transition: Fade,
    });
    const handleOpenAlert = (Transition) => () => {
        setAlert({
            openAlert: true,
            Transition,
        });
    };
    const handleCloseAlert = () => {
        setAlert({
            ...alert,
            openAlert: false,
        });
    }; //end handle alert



    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    //get info supplier
    const searchParam = window.location.search.replace("?id=", "");
    const [supplier, setSupplier] = React.useState({});
    React.useEffect(() => {
        const fetchSupplier = async () => {
            const res = await SupplierAPI.supplierItem(searchParam);
            setSupplier(res.data)
        }
        fetchSupplier();
    }, [])// end get supplier


    //delete supplier
    const handleDeleteSupplier = async () => {
        try {
            await SupplierAPI.deleteSupplier(searchParam);
            handleCloseModal();
            handleOpenAlert();
        } catch (error) {
           console.log(error); 
        }
    }

    // set value tab panel 
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="detail_supplier_page">
            <div className="detail_supplier_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a href="#">Quay lại trang trước</a>
                </div>
                <div className="activity">
                    <Button className="button_activity" variant="outlined"><i className="far fa-question-circle"></i> <span>Trợ giúp</span> </Button>                </div>
                <hr />
                <div className="tagname_supplier">
                    <h2>Tên nhà cung cấp</h2>
                </div>
                <div className="info_supplier">
                    <div className="first_info">
                        <div className="first_info_upper">
                            <Grid className="upper_items" container spacing={2}>
                                <Grid className="upper_item" item xs={4}>
                                    Thông tin nhà cung cấp
                                </Grid>
                                <Grid className="upper_item" item xs={4}>
                                    <p style={{ color: "#1ec709" }}>{supplier.activityStatus}</p>
                                </Grid>
                                <Grid className="upper_item" item xs={4}>
                                    <Button onClick={handleOpenModal} variant="outlined" startIcon={<BrowserUpdatedIcon />}>
                                        Chinh sua
                                    </Button>&emsp;
                                    <Button color="error" onClick={handleOpenModal} variant="outlined" startIcon={<DeleteIcon />}>
                                        Xoa
                                    </Button>
                                </Grid>
                            </Grid>

                        </div>
                        <hr />
                        <div className="first_info_under">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ul>
                                        <li><strong>Tên nhà cung cấp: </strong>{supplier.name}
                                        </li>
                                        <li><strong>Mã nhà cung cấp: </strong>{supplier.code}
                                        </li>
                                        <li> <strong>Số điện thoại: </strong>{supplier.phone}
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul>
                                        <li><strong>Email: </strong>{supplier.email}
                                        </li>
                                        <li><strong>Số Fax: </strong>{supplier.fax}
                                        </li>
                                        <li><strong>Địa chỉ: </strong>{supplier.address}
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="first_info second_info">
                        <div style={{ paddingBottom: "1em" }}>
                            <strong>Thông tin bổ sung</strong>
                        </div>
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Lịch sử nhập hàng" {...a11yProps(0)} />
                                <Tab label="Công nợ" {...a11yProps(1)} />
                                <Tab label="Liên hệ" {...a11yProps(2)} />
                                <Tab label="Ghi chú" {...a11yProps(3)} />
                            </Tabs>
                            <TabPanel style={{ width: "100%" }} value={value} index={0}>
                                <HistoryOrderTable />
                            </TabPanel>
                            <TabPanel style={{ width: "100%" }} value={value} index={1}>
                                <DebtTable />
                            </TabPanel>
                            <TabPanel style={{ width: "100%" }} value={value} index={2}>
                                <ContactTable />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <TextareaAutosize
                                    disabled
                                    aria-label="minimum height"
                                    minRows={10}
                                    value={supplier.description}
                                    style={{ width: "60vw", paddingTop: "1em", paddingLeft: "1em" }}
                                />
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ban muon xoa nha cung cap nay khong
                    </Typography><br />
                    <Button onClick={handleCloseModal} variant="contained">Quay lai</Button>&emsp;&emsp;
                    <Button color="error" variant="contained">Xoa</Button>
                </Box>
            </Modal>

            <Snackbar
                open={alert.openAlert}
                onClose={handleCloseAlert}
                TransitionComponent={alert.Transition}
                message="I love snacks"
                key={alert.Transition.name}
            />
        </div>
    )
}
