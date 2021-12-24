import { Button, Grid, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import "./detailSupplier.scss"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ContactTable, DebtTable, HistoryOrderTable } from '../../components/table/TableDetailSupplier';
import axios from 'axios';


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
}


export default function DetailSupplier() {

    console.log(window.location.search);
    const [supplier, setSupplier] = React.useState({});
    React.useEffect(() => {
        const searchParam = window.location.search.replace("?id=", "")
        const fetchSupplier = async () => {
            const res = await axios.get("http://localhost:9191/suppliers/" + searchParam);
            setSupplier(res.data)
        }
        fetchSupplier();
    }, [])

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
                                    <a href="#"><i className="fas fa-edit"></i></a>
                                    <a href="#"><i style={{ color: "red" }} className="fas fa-trash-alt"></i></a>
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
                                    style={{width: "60vw", paddingTop:"1em",paddingLeft:"1em" }}
                                />
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}
