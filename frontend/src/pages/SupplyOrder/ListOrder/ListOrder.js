import './ListOrder.scss';

import * as React from 'react';
import { CSVLink } from "react-csv";
import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import { Download, Upload, AddCircle, Search, FilterAltOutlined, FilterAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import TableOrder from '../../../components/table/TableListOrder';
import OrderAPI from '../../../api/OrderAPI';

export default function ListOrder() {
    const topFilter = [
        { title: 'lua chon so 1 ' },
        { title: 'lua chon so 2 ' },
        { title: 'lua chon so 3 ' },
        { title: 'lua chon so 4 ' },
        { title: 'lua chon so 5 ' },
        { title: 'lua chon so 6 ' },
        { title: 'lua chon so 7 ' },
        { title: 'lua chon so 8 ' },
        { title: 'lua chon so 9 ' }
    ];

    const headers = [
        { label: "Mã đơn hàng", key: 'code' },
        { label: "Tên nhà cung cấp", key: 'supplier.name' },
        { label: "SĐT nhà cung cấp", key: 'supplier.phone' },
        { label: "Trạng thái đơn hàng", key: 'status' },
        { label: "Trạng thái thanh toán", key: 'transactionStatus' },
        { label: "Trạng thái nhập kho", key: 'importedStatus' },
        { label: "Tổng tiền", key: 'totalAmount' },
        { label: "Đã trả", key: 'paidAmount' },
        { label: "Người tạo", key: 'createdBy.username' },
        { label: "Ngày mong muốn nhận", key: 'expectedTime' },
        { label: "Thời gian tạo đơn", key: 'createdAt' },
        { label: "Mô tả", key: 'description' }
    ];

    const [searchInput, setSearchInput] = React.useState('');
    const [searchedProducts, setSearchedProducts] = React.useState([]);
    const [listOrder, setListOrder] = React.useState([]);

    //inputs
    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = listOrder.filter(product => product.code.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedProducts([...result]);
    }

    React.useEffect(() => {
        const fetchOrders = async () => {
            const res = await OrderAPI.OrderList();
            setListOrder(res.data);
            setSearchedProducts(res.data);
        }
        fetchOrders();
    }, [])
    console.log(searchedProducts);
    return (
        <Box px={4} pt={2} backgroundColor="#F4F6F8" minHeight='90vh' >

            <Box display='flex' flexDirection='column'>

                <Box display='flex' justifyContent='space-between'  py={2} px={2} backgroundColor='white'>
                    <CSVLink data={searchedProducts} headers={headers} fileName="Orders.csv" target="_blank" 
                    style={{ display: "flex", alignItems: "center", textDecoration: "none" , color: "black"}} 
                    >
                        <Download />
                        Xuất File
                    </CSVLink>
                    <Box>
                            <Link style={{ textDecoration: "none" }} to="/nhap-hang/tao-don-nhap-hang">
                                <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Tạo đơn nhập hàng</Button>
                            </Link>
                        </Box>
                </Box>
                <Divider />
                <Box py={2} px={2} display='flex' justifyContent='space-between' backgroundColor='white'>
                    <Box display='flex' alignItems='center' sx={{ width: "60%" }}>
                        <TextField
                            placeholder="Tìm kiếm"
                            sx={{
                                width: '100%'
                            }}
                            value={searchInput}
                            onChange={(e) => handleChange(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            size='small'
                        />
                    </Box>

                    <Box display='flex' alignItems='center' ml={10} sx={{width: 200}}>
                        {/* <FilterAlt fontSize="large"/> */}
                        {/* <Autocomplete
                        multiple
                        options={topFilter}
                        sx={{ width: 200 }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                size='small'
                                variant="outlined"
                                placeholder="Lọc nhiều giá trị"
                            />
                        )}
                    /> */}
                        <TextField
                            placeholder="Lọc sản phẩm"
                            variant="outlined"
                            size='small'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FilterAltOutlined />
                                    </InputAdornment>
                                ),
                            }}></TextField>
                    </Box>
                    
                </Box>
                <TableOrder searchedProducts={searchedProducts} />
            </Box>
        </Box>
    );
}