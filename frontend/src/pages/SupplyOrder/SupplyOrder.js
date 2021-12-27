import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



import './SupplyOrder.scss';
import SupplySelect from './supplySelect/SupplySelect';
import ProductSelect from './productSelect/ProductSelect';

export default function SupplyOrder() {

    const [date, setDate] = React.useState(null);

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
    const steps = [
        'Đặt hàng',
        'Nhập Kho',
        'Thanh toán',
    ];
    return (

        <div>
            <Box py={2} px={5} sx={{ flexGrow: 1 }} className="body">
                <Box className="test"  >
                    <Box className="back">
                        <ArrowBackIosIcon />
                        <Box>Đơn nhập hàng</Box>
                    </Box>
                    <SupplySelect />
                    <ProductSelect />
                </Box>
                <Box sx={{ paddingLeft: "10px" }} className="more-info">

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
                </Box>

                {/* </Grid> */}
            </Box>
        </div>

    );
}