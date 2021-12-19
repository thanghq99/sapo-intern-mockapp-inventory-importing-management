import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import { sizing } from '@mui/system';

import './SupplyOrder.scss';

export default function SupplyOrder() {
    const [supply, setSupply] = React.useState('');
    const [product, setProduct] = React.useState('');
    const [date, setDate] = React.useState(null);

    const handleChangeSupply = (event) => {
        setSupply(event.target.value);
    };
    const handleChangeProduct = (event) => {
        setProduct(event.target.value);
    };
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
    ]
    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 0,
            height: 40,
            // width: 400,
            // display: "flex",
            // float: "left",
            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "white",
                height: 40,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"
            },
            "& #combo-box-demo": {
                padding: 0,
            }
        },
        clearIndicator: {
            color: "black"
        }
    }));
    const classes = useStyles();
    const steps = [
        'Đặt hàng',
        'Nhập Kho',
        'Thanh toán',
    ];
    return (

        <div>
            <Box sx={{ flexGrow: 1 }} className="body">
                <Grid container spacing={4}>
                    <Grid item xs={8} >
                        <Box className="back">
                            <ArrowBackIosIcon />
                            <Box>Đơn nhập hàng</Box>
                        </Box>
                        <Box className="Supply">
                            <div className="title">Thông tin nhà cung cấp</div>

                            <Box className="selectSupply-info" >
                                <SearchIcon className="icon-search" />
                                <Autocomplete className="selectSupply"
                                    classes={classes}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    // sx={{ width: 500 }}
                                    renderInput={(params) => <TextField {...params} style={{ padding: 0 }} placeholder="Chọn nhà cung cấp" />}
                                />
                            </Box>


                        </Box>
                        <Box className="Products">
                            <Typography className="title">
                                Thông tin đơn nhập hàng
                            </Typography>
                            <Box className="selectproduct">
                                <Box className="selectProduct-info">
                                    <SearchIcon className="icon-search" />
                                    <Autocomplete className="selectProductItem"
                                        classes={classes}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={top100Films}
                                        // sx={{ width: 500 }}
                                        renderInput={(params) => <TextField {...params} style={{ padding: 0 }} placeholder="Chọn sản phẩm cần nhập" />}
                                    />
                                </Box>
                                <Button variant="outlined" className="btn-more-select">Chọn nhiều</Button>
                            </Box>
                            <Box className="header-Product">
                                <div style={{ width: "10%", textAlign: "center" }}>Mã SKU</div>
                                <div style={{ width: "48.5%", float: "left", paddingLeft: "15px" }}>Tên sản phẩm</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Đơn vị</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Số lượng</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Giá nhập</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Thành tiền</div>
                                <div style={{ width: "1.5%", textAlign: "center" }}></div>
                            </Box>
                            <Box className="bodyProducts">
                                <List>

                                    {/* //generate
                                    ( */}
                                    <ListItem className="product-item"
                                    // secondaryAction={
                                    //     <IconButton edge="end" aria-label="delete">
                                    //         {/* <DeleteIcon /> */}
                                    //     </IconButton>
                                    // }
                                    >
                                        <Typography sx={{ width: '10%' }}>1234</Typography>
                                        <Typography sx={{ width: '48%', paddingLeft: "5px" }} >Day la mot san pham cuc aaaa aaaaaa aa aaaaaaaaaa ki huu ich</Typography>
                                        <Typography sx={{ width: '10%', textAlign: "center" }}>hop</Typography>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input style={{ width: '80%', height: 35 }} value="12" /></Box>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input style={{ width: '80%', height: 35 }} value="12" /></Box>

                                        <Typography sx={{ width: '10%', textAlign: "center" }}>123456</Typography>
                                        <CancelIcon sx={{ width: '2%', textAlign: "center" }} />
                                        {/* <ListItemAvatar>
                                                <Avatar>
                                    
                                                </Avatar>
                                            </ListItemAvatar> */}
                                        {/* <ListItemText
                                                primary="Single-line item"
                                                secondary={secondary ? 'Secondary text' : null}
                                            /> */}
                                    </ListItem>
                                    <ListItem className="product-item"
                                    // secondaryAction={
                                    //     <IconButton edge="end" aria-label="delete">
                                    //         {/* <DeleteIcon /> */}
                                    //     </IconButton>
                                    // }
                                    >
                                        <Typography sx={{ width: '10%' }}>1234</Typography>
                                        <Typography sx={{ width: '48%', paddingLeft: "5px" }} >Day la mot san pham cuc aaaa aaaaaa aa aaaaaaaaaa ki huu ich</Typography>
                                        <Typography sx={{ width: '10%', textAlign: "center" }}>hop</Typography>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input style={{ width: '80%', height: 35 }} value="12" /></Box>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input style={{ width: '80%', height: 35 }} value="12" /></Box>

                                        <Typography sx={{ width: '10%', textAlign: "center" }}>123456</Typography>
                                        <CancelIcon sx={{ width: '2%', textAlign: "center" }} />
                                        {/* <ListItemAvatar>
                                                <Avatar>
                                    
                                                </Avatar>
                                            </ListItemAvatar> */}
                                        {/* <ListItemText
                                                primary="Single-line item"
                                                secondary={secondary ? 'Secondary text' : null}
                                            /> */}
                                    </ListItem>
                                    {/* ) */}
                                </List>
                                <Box className="pay-info">
                                    <Box className="pay-info-item">
                                        <Typography>Tổng sản phẩm</Typography>
                                        <Typography>5</Typography>
                                    </Box>
                                    <Box className="pay-info-item">
                                        <Typography>Tổng loại sản phẩm</Typography>
                                        <Typography>2</Typography>
                                    </Box>
                                    <Box className="pay-info-item">
                                        <Typography>Tổng tiền</Typography>
                                        <Typography>123456</Typography>
                                    </Box>
                                    <Box className="pay-info-item" sx={{ color: "#007BFF" }}>
                                        <Typography >Tổng chiết khấu</Typography>
                                        <Typography>6%</Typography>
                                    </Box>
                                    <Box className="pay-info-item">
                                        <Typography sx={{ fontWeight: 700 }}>Phải trả</Typography>
                                        <Typography>500000vnd</Typography>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ paddingLeft: "30px" }} className="more-info">
                       
                        <Box sx={{ width: '100%' }} className="time-line">
                            <Stepper activeStep={2} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box className="more-info-detail">
                            <Box className="title">Thông tin bổ sung</Box>
                            <Box className="code-supply-order">
                                <Box className='title'>Mã đơn nhập hàng</Box>
                                <TextField id="outlined-basic" className="info" variant="outlined" />
                            </Box>
                            <Box className="time-supply-order">
                                <Box className='title'>Ngày nhận hàng</Box>
                                <Box className="time">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                        <DatePicker

                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="Ngày nhận" />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box className="note">
                                <Box className="title">Ghi chú</Box>
                                <textarea className="content-note"></textarea>
                            </Box>

                            <Button variant="outlined" className="btn-order">Đặt hàng</Button>

                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </div>

    );
}