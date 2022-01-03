import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CancelIcon from '@mui/icons-material/Cancel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";


import { sizing } from '@mui/system';

import './SupplyOrder.scss';
import SupplySelect from './supplySelect/SupplySelect';
import ProductSelect from './productSelect/ProductSelect';

export default function SupplyOrder() {
    const [supplier, setSupplier] = React.useState();
    const code = React.useRef("");
    const [description, setDescription] = React.useState('');
    const [product, setProduct] = React.useState();
    const [date, setDate] = React.useState('');
    const history = useHistory();

    // const handleChangeSupply = (event) => {
    //     setSupply(event.target.value);
    // };
    // const handleChangeProduct = (event) => {
    //     setProduct(event.target.value);
    // };

    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 0,
            height: 40,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "white",
                height: 40,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
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

    const SubmitOrder = () => {
        let data = {
            orderCode: code.current.value,
            supplierId: supplier,
            description: description,
            deliveryTime: date,
            createdBy: 2,
            lineItems: product
        };
        console.log(data);
    
       
    }

    React.useEffect(() => {
        
    }, [])
    console.log(product);
    return (

        <div>
            <Box py={2} px={5} sx={{ flexGrow: 1 }} className="body">
                <Box className="test"  >
                    <Box className="back" onClick={history.goBack}>
                        <ArrowBackIosIcon />
                        <Box>Đơn nhập hàng</Box>
                    </Box>
                    <SupplySelect setSupplier={setSupplier} />
                    <ProductSelect setProduct={setProduct} />
                </Box>
                <Box sx={{ paddingLeft: "10px" }} className="more-info">

                    <Box sx={{ width: '100%' }} className="time-line">
                        <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Box className="more-info-detail-created">
                        <Box className="title">Thông tin bổ sung</Box>
                        <Box className="code-supply-order">
                            <Box className='title'>Mã đơn nhập hàng</Box>
                            <TextField inputRef={code} id="outlined-basic" className="info" variant="outlined" />
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
                            <textarea className="content-note" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </Box>

                        <Button variant="outlined" className="btn-order" onClick={SubmitOrder}>Đặt hàng</Button>

                    </Box>
                </Box>

                {/* </Grid> */}
            </Box>
        </div>

    );
}