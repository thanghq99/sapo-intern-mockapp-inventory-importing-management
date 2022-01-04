import './ProductSelect.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductAPI from '../../../../api/ProductAPI';

export default function ProductSelect({setProduct}) {

    const [lastProduct, setLastProduct] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [numProduct, setNumProduct] = React.useState(0);
    const [numCategory, setNumCategory] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [productSelect, setProductSelect] = React.useState([]);
    const [check, setCheck] = React.useState(false);

    const [originalPrice, setOriginalPrice] = React.useState([])
    const [num, setNum] = React.useState([])
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
    function add (newValue){
        const productAdd = [
            // copy the current users state
            ...productSelect,  (newValue)
            // now you can add a new object to add to the array
           
        ];
          if(!check) {
            setProductSelect(
               productAdd
            )
        }
     
    }

    async function handleSelectProd(event, newValue){
        console.log(newValue);
        if(newValue == null) {}
        else {
            setCheck(false);
            let checked = false;
            productSelect.map((product) => {
                if (product.id == newValue.id) {
                    checked = true;
                    setCheck(true);
                }
            })
            console.log(check);
            if(!checked){
                add(newValue);
            }
            
            // const productAdd = [
            //     // copy the current users state
            //     ...productSelect,
            //     // now you can add a new object to add to the array
            //     (newValue)
            //   ];
            // console.log(check);
            // if(!check) {
            //     setProductSelect(
            //        productAdd
            //     )
            // }
        }
    }
    function handDeleteProduct(id){
        
        setProductSelect(productSelect.filter(item => item.id !== id));
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
            setOriginalPrice (
                list.reduce(
                    (obj, product) => ({ ...obj,[product.id]: product.originalPrice }),
                    {}
                  )
            )
            setNum(
                list.reduce(
                    (obj, product) => ({ ...obj,[product.id]: 1 }),
                    {}
                  )
            )
    }
    React.useEffect(() => {
        let tmp = 0;
        let numCate = 0;
        let totalTmp = 0;
        const test = [];
        console.log(lastProduct);
        console.log(num);
        productSelect.map((item) => {
            tmp += Number(num[item.id]);
            numCate +=1;
            totalTmp += Number(num[item.id])*Number(originalPrice[item.id]);
            let productTmp = {}
            productTmp["variantId"] = item.id;
            productTmp["price"] = originalPrice[item.id];
            productTmp["quantity"] = Number(num[item.id]);
            test.push(productTmp);
            
            // setLastProduct( [
            //     // copy the current users state
            //     ...lastProduct,  (productTmp)
            //     // now you can add a new object to add to the array
               
            // ]);
            
        });
        setProduct(test);
        setNumProduct(tmp);
        setNumCategory(numCate);
        setTotal(totalTmp);
 
    }, [num, productSelect, originalPrice]);

    async function getData() {
        const result = await ProductAPI.ProductList();
        
        setProductList(result.data);
        handleOriPrice(result.data);
       
  
        return true;
    }

    React.useEffect(() => {
        getData();
 
    }, []);

    
    console.log(productSelect);
    console.log(lastProduct);
    
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
                            
                            productSelect.map(item => {
                                return (
                                <ListItem className="product-item" key={item.id}
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
                                    <CancelIcon sx={{ width: '2%', textAlign: "center" }} onClick={() => handDeleteProduct(item.id)} />
                                
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
                            <Typography>{numCategory}</Typography>
                        </Box>
                        <Box className="pay-info-item">
                            <Typography>Tổng tiền</Typography>
                            <Typography>{total} vnd</Typography>
                        </Box>
                        <Box className="pay-info-item" sx={{ color: "#007BFF" }}>
                            <Typography >Tổng chiết khấu</Typography>
                            <Typography>6%</Typography>
                        </Box>
                        <Box className="pay-info-item">
                            <Typography sx={{ fontWeight: 700 }}>Phải trả</Typography>
                            <Typography>{(total*0.94).toFixed(2)} vnd</Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </div>
    )
}