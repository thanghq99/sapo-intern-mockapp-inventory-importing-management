import './ListOrder.scss';

import * as React from 'react';
import { CSVLink } from "react-csv";
import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import { Download, Upload, AddCircle, Search, FilterAltOutlined, FilterAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import TableOrder from '../../../components/table/TableListOrder';
import UnlockAccess from '../../../components/roleBasedRender/UnlockAccess'
import OrderAPI from '../../../api/OrderAPI';

export default function ListOrder() {
    const Fillter = [
        { title: 'Đang giao dịch', label: 'Trạng thái' },
        { title: 'Đã hoàn thành', label: 'Trạng thái' },
        { title: 'Chưa thanh toán', label: 'Thanh toán' },
        { title: 'Thanh toán một phần', label: 'Thanh toán' },
        { title: 'Đã thanh toán', label: 'Thanh toán' },
        { title: 'Chờ nhập kho', label: 'Nhập kho' },
        { title: 'Nhập kho một phần', label: 'Nhập kho' },
        { title: 'Đã nhập kho', label: 'Nhập kho' }

    ];
    const options = Fillter.map((option) => {
        const firstLetter = option.label;
        return {
            firstLetter: /The/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // header xuất file
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
        // let value = 'thanh toán một phần';
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = listOrder.filter(product => product.code.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedProducts([...result]);
    }
    const handleFillter = (event, contentFillter) => {
        
        setSearchedProducts([...listOrder]);
        if (contentFillter.length !=0 ) {
            contentFillter.map(e => {
                let inputFilter = e.title;

                let input = inputFilter.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

                if (inputFilter == "Đang giao dịch" || inputFilter == "Đã hoàn thành") {

                    let result = searchedProducts.filter(product => product.status.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
                    setSearchedProducts([...result]);
                } else if (inputFilter == "Chưa thanh toán" || inputFilter == "Thanh toán một phần" || inputFilter == "Đã thanh toán") {
                    let result = searchedProducts.filter(product => product.transactionStatus.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
                   
                    setSearchedProducts([...result]);
                } else if (inputFilter == "Chờ nhập kho" || inputFilter == "Nhập kho một phần" || inputFilter == "Đã nhập kho") {
                    let result = searchedProducts.filter(product => product.importedStatus.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
                   
                    setSearchedProducts([...result]);
                }
            })
        } else {
            let value = '';
            let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
            let result = listOrder.filter(product => product.code.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
            setSearchedProducts([...result]);
        }

        // let value = e.toLowerCase();
        // let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        // if(e == "Đang giao dịch" || e == "Đã hoàn thành") {
        //     let result = searchedProducts.filter(product => product.status.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        //     setSearchedProducts([...result]);
        // } else if (e == "Chưa thanh toán" || e == "Thanh toán một phần" || e == "Đã thanh toán") {
        //     let result = searchedProducts.filter(product => product.transactionStatus.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        //     setSearchedProducts([...result]);
        // } else if (e == "Chờ nhập kho" || e == "Nhập kho một phần" || e == "Đã nhập kho") {
        //     let result = searchedProducts.filter(product => product.importedStatus.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        //     setSearchedProducts([...result]);
        // }
    }

    React.useEffect(() => {
        const fetchOrders = async () => {
            const res = await OrderAPI.OrderList();
            setListOrder(res.data);
            setSearchedProducts(res.data);
        }
        fetchOrders();
    }, [])
    // console.log(searchedProducts);
    return (
        <Box px={4} pt={2} backgroundColor="#F4F6F8" minHeight='91vh' >

            <Box display='flex' flexDirection='column'>

                <Box display='flex' justifyContent='space-between' py={2} px={2} backgroundColor='white'>
                    <CSVLink data={searchedProducts} headers={headers} filename="Orders.csv" target="_blank"
                        style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }}
                    >
                        <Download />
                        Xuất File
                    </CSVLink>
                    <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
                        <Box>
                            <Link style={{ textDecoration: "none" }} to="/nhap-hang/tao-don-nhap-hang">
                                <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Tạo đơn nhập hàng</Button>
                            </Link>
                        </Box>
                    </UnlockAccess>
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

                    <Box display='flex' alignItems='center' ml={10} sx={{ width: 200 }}>
                        {/* <FilterAlt fontSize="large"/> */}
                        <Autocomplete
                            multiple
                            options={options}
                            groupBy={(option) => option.firstLetter}
                            sx={{ width: 200 }}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, newValue) => handleFillter(event, newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    size='small'
                                    variant="outlined"
                                    placeholder="Lọc nhiều giá trị"
                                // InputProps={{
                                //     startAdornment: (
                                //         <InputAdornment position="start">
                                //             <FilterAltOutlined />
                                //         </InputAdornment>
                                //     ),
                                // }}
                                />
                            )}
                        />
                        {/* <TextField
                            placeholder="Lọc sản phẩm"
                            variant="outlined"
                            size='small'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FilterAltOutlined />
                                    </InputAdornment>
                                ),
                            }}></TextField> */}
                    </Box>

                </Box>
                <TableOrder searchedProducts={searchedProducts} />
            </Box>
        </Box>
    );
}