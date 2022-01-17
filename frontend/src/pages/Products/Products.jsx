import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ProductAPI from '../../api/ProductAPI'
import { Box, TextField, InputAdornment, Button, Divider, Card, CardContent, Typography } from '@mui/material'
import { Search, FilterAltOutlined, AddCircle } from '@mui/icons-material';
import ProductsTable from './ProductsTable'

export default function Products({setStateAlert}) {
    const history = useHistory();
    const [trigger, setTrigger] = useState(false);
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [totalStorage, setTotalStorage] = useState(0);
    const [activeVariants, setActiveVariants] = useState();
    const [outStockProducts, setOutStockProducts] = useState();

    const [searchInput, setSearchInput] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);
    function getData() {
        ProductAPI.productList()
            .then((pResult) => {
                let reversedResult = pResult.data.reverse();
                setProducts(reversedResult);
                setSearchedProducts(reversedResult);
            });
        ProductAPI.getAllVariants()
            .then((vResult) => {
                setVariants(vResult.data);
                setTotalStorage(vResult.data.reduce((sum, v) => sum + v.inventoryQuantity, 0));
                setActiveVariants(vResult.data.filter((variant) => variant.sellableStatus === "Có thể bán").length);
                setOutStockProducts(vResult.data.filter((variant) => variant.inventoryQuantity === 0).length);
            })
            .catch(err => {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Có lỗi xảy ra" });
                history.push('/san-pham');
            });
        return true;
    }
    useEffect(() => {
        getData();
    }, [trigger])

    const triggerReload = () => {
        setTrigger(!trigger);
    };

    //inputs
    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = products.filter(product => product.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedProducts([...result]);
    }

    const handleDeleteProduct = (id) => {
        ProductAPI.deleteProduct(id)
        .then(res => {
            setStateAlert({ severity: "success", variant: "filled", open: true, content: res.data.name + " đã được xóa" });
          })
          .catch(err => {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: err.response.data });
          });
    }
    
    return (
        <Box backgroundColor="#F4F6F8" minHeight="93vh" pt={2} pb={4} px={4}>
            <Box py={2} px={2} display="flex" justifyContent="space-between" backgroundColor='white'>
                <Box >
                    <TextField
                        placeholder="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size='small'
                        sx={{ mr: 2, width: 600 }}
                        value={searchInput}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}></TextField>
                </Box>
                <Box>
                    <Button
                        variant='contained'
                        sx={{ mr: 2 }}
                        startIcon={<AddCircle />}
                        onClick={() => { history.push('/tao-san-pham') }}
                    >Thêm sản phẩm
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Box py={2} px={1} display="flex" justifyContent="space-evenly" backgroundColor='white'>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Lượng hàng tồn kho</Typography>
                        <Typography>{totalStorage}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Tổng số sản phẩm</Typography>
                        <Typography>{products.length}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Sản phẩm đang bán</Typography>
                        <Typography>{activeVariants}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Sản phẩm hết hàng</Typography>
                        <Typography>{outStockProducts}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box py={2}>
                <ProductsTable products={searchedProducts} handleDeleteProduct={handleDeleteProduct} triggerReload={triggerReload}/>
            </Box>
        </Box>
    )
}
