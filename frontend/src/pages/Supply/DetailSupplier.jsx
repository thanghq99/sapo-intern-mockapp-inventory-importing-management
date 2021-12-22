import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import "./detailSupplier.scss"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


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
                    <Button className="button_activity" variant="contained"><i className="fas fa-plus-circle"></i> <span>Thêm nhà cung cấp</span> </Button>
                </div>
                <hr />
                <div className="tagname_supplier">
                    <h2>Ten nha cung cap</h2>
                </div>
                <div className="info_supplier">
                    <div className="first_info">
                        <div className="first_info_upper">
                            <Grid className="upper_items" container spacing={2}>
                                <Grid className="upper_item" item xs={4}>
                                    Thong tin nha cung cap
                                </Grid>
                                <Grid className="upper_item" item xs={4}>
                                    <p style={{ color: "#1ec709" }}>Dang giao dich</p>
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
                                        <li><strong>Ten nha cung cap: </strong>acs
                                        </li>
                                        <li><strong>Ma nha cung cap: </strong>acs
                                        </li>
                                        <li> <strong>So dien thoai: </strong>acs
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul>
                                        <li><strong>Email: </strong>acs
                                        </li>
                                        <li><strong>So Fax: </strong>acs
                                        </li>
                                        <li><strong>Dia chi: </strong>acs
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="first_info second_info">
                        <div style={{ paddingBottom: "2em" }}>
                            <strong>Thong tin bo sung</strong>
                        </div>
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Lich su nhap hang" {...a11yProps(0)} />
                                <Tab label="Cong no" {...a11yProps(1)} />
                                <Tab label="Lien he" {...a11yProps(2)} />
                                <Tab label="Ghi chu" {...a11yProps(3)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item 4
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}
