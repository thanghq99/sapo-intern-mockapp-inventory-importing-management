import './ListOrder.scss';

import * as React from 'react';
import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import { Download, Upload, AddCircle, Search, FilterAltOutlined, FilterAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import TableOrder from '../../../components/table/TableListOrder';

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
    ]
    return (
        <Box px={4} pt={2} backgroundColor="#F4F6F8" minHeight='90vh'>
            <Box display='flex' flexDirection='column'>


                {/* <Divider /> */}
                <Box py={2} px={2} display='flex' justifyContent='space-between' backgroundColor='white'>
                    <Box display='flex' alignItems='center' sx={{width: "60%"}}>
                        <TextField
                            placeholder="Tìm kiếm"
                            sx={{
                                width: '100%'
                            }}

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

                    <Box display='flex' alignItems='center'>
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
                    <Box display='flex' justifyContent='space-between' py={2} px={2} backgroundColor='white'>
                        <Box>
                            <Link style={{ textDecoration: "none" }} to="/nhap-hang/tao-don-nhap-hang">
                                <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Tạo đơn nhập hàng</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <TableOrder />
            </Box>
        </Box>
    );
}