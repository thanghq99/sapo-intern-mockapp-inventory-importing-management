import './ProductSelect.scss';

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
import ProductAPI from '../../../../api/ProductAPI';

export default function ProductSelect() {

    const [detailSupply, setDetailSupply] = React.useState(false);
    const [productList, setProductList] = React.useState([]);
    const [value, setValue] = React.useState();
    let productSelect = [];
    // const [supplier, setSupplier] = React.useState();

    const [originalPrice, setOriginalPrice] = React.useState([])
    const [num, setNum] = React.useState([]
        // productList.reduce(
        //     (obj, product) => ({ ...obj,[product.id]: 1 }),
        //     {}
        //   )
    )
    function handleChangeNum(evt) {
        const value1 = evt.target.value;
        setNum({
          ...num,
          [productList.id]: value1
        });
      }
    function handleChangeOriginalPrice(evt) {
        const value1 = evt.target.value;
        setOriginalPrice({
          ...originalPrice,
          [productList.id]: value1
        });
      }
    function handleSelectProd(event, newValue){
        productSelect.push(newValue);
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
    const handleOriPrice = async (list) => {

        list.map( (product) => {
            console.log(product.id);
            setOriginalPrice({ ...originalPrice, [product.id]: product.originalPrice});
            setNum({ ...num, [product.id]: 1 });
        })
       
    }
    React.useEffect(() => {
        handleOriPrice(productList);
 
    }, [productList]);

    async function getData() {
        const result = await ProductAPI.ProductList();
        
        setProductList(result.data);
        // handleOriPrice(result.data);
        // setOriginalPrice({ ...originalPrice, [item.id]: .value })
  
        return true;
    }

    React.useEffect(() => {
        getData();
 
    }, []);

    
    console.log(originalPrice);
    
    return (
        <div>
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
                            onChange={(event, newValue) => handleSelectProd(event, newValue)}
                            id="combo-box-demo"
                            options={productList}
                            // open="true"
                            getOptionLabel={(option) => option.product.name}
                            renderOption={(props ,option) => (
                                <Box {...props}>
                                    <Box>Img</Box>
                                    <Box className="info">
                                        <Box  sx={{display: "flex" }} className="info-prod" >
                                            <Box>{option.product.name}</Box>
                                            <Box>{option.originalPrice}</Box>
                                        </Box>
                                        <Box sx={{display: "flex"}} className="info-prod">
                                            <Box>{option.code}</Box>
                                            <Box>Số lượng: {option.inventoryQuantity}</Box>
                                        </Box>
                                    </Box> 
                                </Box>
                            )}
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
                        {
                            
                            productList.map(item => {
                                return (
                                <ListItem className="product-item"
                                >
                                    <Typography sx={{ width: '10%' }}>{item.code}</Typography>
                                    <Typography sx={{ width: '48%', paddingLeft: "5px" }} >{item.product.name}</Typography>
                                    <Typography sx={{ width: '10%', textAlign: "center" }}>{item.unit}</Typography>
                                    <Box sx={{ width: '10%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="num" value={num[item.id]} 
                                    onChange={e =>
                                        setNum({ ...num, [item.id]: e.target.value })} 
                                    /></Box>
                                    <Box sx={{ width: '10%', textAlign: "center" }}><input  type="text" style={{ width: '80%', height: 35 }} name="originalPrice" value={originalPrice[item.id]} 
                                    onChange={e =>  setOriginalPrice({ ...originalPrice, [item.id]: e.target.value })} 
                                    /></Box>
        
                                    <Typography sx={{ width: '10%', textAlign: "center" }}>{num[item.id]*originalPrice[item.id]}</Typography>
                                    <CancelIcon sx={{ width: '2%', textAlign: "center" }} />
                                
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
        </div>
    )
}