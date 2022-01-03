import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";


import './UpdateOrder.scss';
import OrderAPI from '../../../api/OrderAPI'
import { Collapse } from "@mui/material";
import ProductAPI from "../../../api/ProductAPI";


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
    const history = useHistory();

    const [openMenu, setOpenMenu] = React.useState(false);

    const [productList, setProductList] = React.useState([]);

    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }

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

    async function getData() {
        try {
            console.log(searchParam);
            const orderRes = await OrderAPI.OrderItem(searchParam);
            const ProductRes = await ProductAPI.ProductList();
            setProductList(ProductRes.data);
            setOrder(orderRes.data);
            setNameSupplier(orderRes.data.supplier.name);
            setDebt(orderRes.data.supplier.debt);
            setEmail(orderRes.data.supplier.email);
            setAddRess(orderRes.data.supplier.address);
            setCodeOrder(orderRes.data.code);
            setExpectedTime(orderRes.data.expectedTime);
            setTotalAmount(orderRes.data.totalAmount);

        }
        catch (err) {
            console.log(err);
        }

    }
    React.useEffect(() => {
        getData();
    }, [])
    console.log(order);

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
                    sx={{display: "block", zIndex: 101, width: "100px", position: "absolute",
                     backgroundColor: "#FFFFFF", border: "1px solid #cfcfcf", marginLeft: "80px", marginTop: "-10px"}}>
                        <List component="div" disablePadding>
                            <ListItem>
                                Sửa
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
                                    <Typography sx={{ marginRight: "5px" }}>{nameSupplier}</Typography>

                                </Box>
                                <Typography className="debt">Công nợ: {debt} vnd</Typography>
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
                                <Typography className="title-add" >Địa chỉ xuất hàng</Typography>
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

                            <List>
                                {

                                    productList.map(item => {
                                        return (
                                            <ListItem className="product-item"
                                            >
                                                <Typography sx={{ width: '10%', alignItems: "center" }}>{item.code}</Typography>
                                                <Typography sx={{ width: '48%', paddingLeft: "5px" }} >{item.product.name}</Typography>
                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{item.unit}</Typography>
                                                <Box sx={{ width: '10%', textAlign: "center" }}></Box>
                                                <Box sx={{ width: '10%', textAlign: "center" }}></Box>

                                                <Typography sx={{ width: '10%', textAlign: "center" }}></Typography>

                                            </ListItem>)
                                    })
                                }

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
                                    <Typography>{totalAmount*1.06}</Typography>
                                </Box>
                                <Box className="pay-info-item" sx={{ color: "#007BFF" }}>
                                    <Typography >Tổng chiết khấu</Typography>
                                    <Typography>6%</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography sx={{ fontWeight: 700 }}>Phải trả</Typography>
                                    <Typography>{totalAmount} vnd</Typography>
                                </Box>

                            </Box>
                        </Box>
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