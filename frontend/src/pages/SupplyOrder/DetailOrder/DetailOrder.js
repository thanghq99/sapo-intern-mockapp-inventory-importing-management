import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";


import './DetailOrder.scss';
import OrderAPI from '../../../api/OrderAPI'
import { Collapse } from "@mui/material";
import ProductAPI from "../../../api/ProductAPI";
import PaymentAPI from "../../../api/PaymentAPI";


export default function DetailOrder() {

    const [order, setOrder] = React.useState();
    const [codeOrder, setCodeOrder] = React.useState();
    const [expectedTime, setExpectedTime] = React.useState();
    const [totalAmount, setTotalAmount] = React.useState();
    const [description, setDescription] = React.useState();
    const [debt, setDebt] = React.useState();
    const [nameSupplier, setNameSupplier] = React.useState();
    const [address, setAddRess] = React.useState();
    const [email, setEmail] = React.useState();
    const searchParam = window.location.search.replace("?code=", "");

    const [date, setDate] = React.useState(null);
    const [numProduct, setNumProduct] = React.useState(0);
    const history = useHistory();

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openPayment, setOpenPayment] = React.useState(false);
    const [openPaymented, setOpenPaymented] = React.useState(true);
    const [payment, setPayment] = React.useState("");

    const [productList, setProductList] = React.useState([]);

    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }
    const handleOpenPayment = () => {
        setOpenPayment(!openPayment);
        setOpenPaymented(!openPaymented);
    }
    const handlePayment = (event) => {
        setPayment(event.target.value);
      };
    const SubmitPayment = async () => {
        // handleOpenPayment();
        const res = await PaymentAPI.Paid(searchParam, payment);
        res.then(respons => {
            handleOpenPayment();
            // setOpenPaymented(true);
        })
       
        
    }

    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 17,
            height: 42,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#888888",
                height: 42,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                color: "black"

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                color: "black"
            },
            "& #combo-box-demo": {
                padding: 0,
                color: "#888888"
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
    const paymentType = [
        { label: 'Tiền mặt' },
        { label: 'Chuyển khoản' }
    ]

    async function getData() {
        try {
            console.log(searchParam);
            const orderRes = await OrderAPI.OrderItem(searchParam);
            const ProductRes = await OrderAPI.VariantOrder(searchParam);
            setProductList(ProductRes.data);
            setOrder(orderRes.data);
            setNameSupplier(orderRes.data.supplier.name);
            setDebt(orderRes.data.supplier.debt);
            setEmail(orderRes.data.supplier.email);
            setAddRess(orderRes.data.supplier.address);
            setCodeOrder(orderRes.data.code);
            setExpectedTime(orderRes.data.expectedTime);
            setTotalAmount(orderRes.data.totalAmount);

            let tmp = 0;
            ProductRes.data.map((item) => {
                tmp += item.suppliedQuantity;

            })
            setNumProduct(tmp);

        }
        catch (err) {
            console.log(err);
        }

    }
    React.useEffect(() => {
        getData();
    }, [])
    console.log(order);
    console.log(payment);

    return (

        <div>
            <Box py={2} px={5} sx={{ flexGrow: 1 }} className="body">
                <Box >
                    <Box className="back" onClick={history.goBack}>
                        <ArrowBackIosIcon />
                        <Box>Đơn nhập hàng</Box>
                    </Box>
                    <Box sx={{ display: "flex" }} ml={2}>
                        <Typography sx={{ fontSize: 36, fontWeight: 450 }}>{codeOrder}</Typography>
                        <Box onClick={handleMenu} sx={{ display: "flex", alignItems: "center" }} ml={2} >
                            <Typography>Thêm thao tác</Typography>
                            {openMenu ? <ExpandLess /> : <ExpandMore />}

                        </Box>
                    </Box>
                    <Collapse in={openMenu} timeout="auto" unmountOnExit
                        sx={{
                            display: "block", zIndex: 101, width: "100px", position: "absolute",
                            backgroundColor: "#FFFFFF", border: "1px solid #cfcfcf", marginLeft: "100px", marginTop: "-10px"
                        }}>
                        <List component="div" disablePadding>
                            <ListItem>
                                <Link to={`/nhap-hang/sua-don-hang?code=${searchParam}`} className="link-update">Sửa</Link>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Huỷ
                            </ListItem>
                        </List>
                    </Collapse>
                </Box>
                <Box className="test"  >
                    <Box className="supplier">
                        <Box >
                            <Typography className="title">
                                Thông tin đơn nhập hàng
                            </Typography>
                            <Box className="headerSupply">
                                <Box className="nameSupply">
                                    <PersonRoundedIcon sx={{ marginRight: "10px" }} />
                                    <Typography sx={{ marginRight: "5px", fontWeight: 600 }}>{nameSupplier}</Typography>

                                </Box>
                                <Typography className="debt" sx={{ fontWeight: 600 }}>Công nợ: {debt} vnd</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="detail-supplier">
                            <Box className="export-address">
                                <Typography className="title-add">Địa chỉ xuất hàng</Typography>
                                <Typography>Giao hàng</Typography>
                                <Typography>----</Typography>
                                <Typography>{address}</Typography>
                                {/* <Typography>Quận Ba Đình - Hà Nội</Typography> */}
                                <Typography>Email: {email}</Typography>
                            </Box>
                            <Box className="billing-ex-add">
                                <Typography className="title-add" >Địa chỉ xuất hoá đơn</Typography>
                                <Typography>Giao hàng</Typography>
                                <Typography>----</Typography>
                                <Typography>{address}</Typography>
                                {/* <Typography>Quận Ba Đình - Hà Nội</Typography> */}
                                <Typography>Email: {email}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="product">
                        <Typography className="title">
                            Thông tin đơn nhập hàng
                        </Typography>
                        <Box className="header-Product">
                            <div style={{ width: "10%", textAlign: "center" }}>Mã SKU</div>
                            <div style={{ width: "50%", float: "left", paddingLeft: "15px" }}>Tên sản phẩm</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Đơn vị</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Số lượng</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Giá nhập</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Thành tiền</div>
                        </Box>
                        <Box className="bodyProducts">

                            <List sx={{ width: "100%" }}>
                                {

                                    productList?.map(item => {
                                        return (
                                            <ListItem className="product-item"
                                            >
                                                <Typography sx={{ width: '10%', alignItems: "center" }}>{item.variant.code}</Typography>
                                                <Typography sx={{ width: '48%', paddingLeft: "5px" }} >{item.variant.product.name}</Typography>
                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{item.variant.unit}</Typography>
                                                <Box sx={{ width: '10%', textAlign: "center" }}>{item.suppliedQuantity}</Box>
                                                <Box sx={{ width: '10%', textAlign: "center" }}>{item.price}</Box>

                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{item.suppliedQuantity * item.price}</Typography>

                                            </ListItem>)
                                    })
                                }

                            </List>
                            <Box className="pay-info">
                                <Box className="pay-info-item">
                                    <Typography>Tổng sản phẩm</Typography>
                                    <Typography>{numProduct}</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography>Tổng loại sản phẩm</Typography>
                                    <Typography>{productList?.length}</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography>Tổng tiền</Typography>
                                    <Typography>{totalAmount} vnd</Typography>
                                </Box>
                                <Box className="pay-info-item" sx={{ color: "#007BFF" }}>
                                    <Typography >Tổng chiết khấu</Typography>
                                    <Typography>6%</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography sx={{ fontWeight: 700 }}>Phải trả</Typography>
                                    <Typography>{(totalAmount * 0.94).toFixed(2)} vnd</Typography>
                                </Box>

                            </Box>
                        </Box>

                    </Box>
                    <Box className="payment" pl={2} sx={{ backgroundColor: "white", border: "1px solid #e4e4e4" }}>
                        <Box className="header-payment" pt={2} mb={2}>
                            <Box className="header-payment-info">
                                <Box sx={{ display: "flex" }}>
                                    <AccountBalanceWalletIcon />
                                    <Typography sx={{ fontWeight: 600 }} ml={2} >Thanh Toán</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                    <Typography>Đã thanh toán: {order?.paidAmount} vnd </Typography>
                                    <Typography>Còn phải trả: {order?.totalAmount - order?.paidAmount} vnd </Typography>
                                </Box>
                            </Box>
                            <Box className="btn-payment">
                                <Button variant="outlined"
                                    onClick={handleOpenPayment}
                                >Xác nhận thanh toán</Button>
                            </Box>
                        </Box>
                        {
                            openPayment ?
                                <Box className="body-payment" mt={2}>
                                    <Divider />
                                    <Box className="body-payment-info" mt={2}>
                                        <Box className="payment-type">
                                            <Typography sx={{ fontWeight: 600 }} >Lựa chọn hình thức thanh toán</Typography>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={paymentType}
                                                sx={{ width: 200, color: "black" }}
                                                classes={classes}
                                                renderInput={(params) => <TextField {...params} sx={{ color: "black" }} placeholder="Chọn phương thức thanh toán" />}
                                            />
                                        </Box>
                                        <Box className="payment-amount">
                                            <Typography sx={{ fontWeight: 600 }} mb={2}>Số tiền thanh toán</Typography>
                                            <TextField id="outlined-basic" variant="outlined" 
                                            sx={{ width: 200, height: 40 }}
                                            value={payment}
                                            onChange={handlePayment} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex" }} mt={2} mb={2}>
                                        <Button variant="outlined" ml={2}
                                            onClick={handleOpenPayment}
                                        >Đóng</Button>
                                        <Button variant="contained" sx={{ marginLeft: "16px" }}
                                        onClick={SubmitPayment}
                                        >Thanh toán</Button>
                                    </Box>
                                </Box>
                                 : null
                        }
                        {
                            openPaymented ? 
                            <Box sx={{display: "flex" }} mt={2} mb={2}>

                                <Divider />
                                
                                <ChangeCircleIcon />
                                <Typography ml={2}>Xác nhận thanh toán {order?.paidAmount} vnd thành công</Typography>
                                
                            </Box> : null
                        }
                    </Box>
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
                            <Box className="info">{codeOrder}</Box>
                        </Box>
                        <Box className="time-supply-order">
                            <Box className='title'>Ngày nhận hàng</Box>
                            <Box className="time">
                                {expectedTime}
                            </Box>
                        </Box>
                        <Box className="note">
                            <Box className="title">Ghi chú</Box>
                            <Box>{description}</Box>
                        </Box>

                    </Box>
                </Box>

                {/* </Grid> */}
            </Box>
        </div>

    );
}