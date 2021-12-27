import React from 'react'
import {useHistory} from 'react-router-dom'
import { Box, TextField, InputAdornment, Button, Divider, Card, CardContent, Typography } from '@mui/material'
import { Search, FilterAltOutlined, AddCircle } from '@mui/icons-material';
import ProductsTable from './ProductsTable'
import "./products.scss"

export default function Products() {
    const history = useHistory();
    return (
        <Box backgroundColor="#F4F6F8" pt={2} pb={4} px={4}>
            <Box py={2} px={2} display="flex" justifyContent="space-between" backgroundColor='white'>
                <Box >
                    <TextField
                        placeholder="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size='small'
                        sx={{ mr: 2, width: 600 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}></TextField>
                    <TextField
                        placeholder="Lọc sản phẩm"
                        variant="outlined"
                        size='small'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FilterAltOutlined />
                                </InputAdornment>
                            ),
                        }}></TextField>
                </Box>
                <Box>
                    <Button
                        variant='outlined'
                        sx={{ mr: 2 }}
                        endIcon={<AddCircle />}
                        onClick={() => { history.push('/san-pham/tao-san-pham') }}
                    >Thêm sản phẩm
                    </Button>
                    <Button
                        variant='outlined'
                        endIcon={<AddCircle />}
                    >Xuất file Excel</Button>
                </Box>
            </Box>
            <Divider />
            <Box py={2} px={1} display="flex" justifyContent="space-evenly"  backgroundColor='white'>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Tình trạng kho</Typography>
                        <Typography>1000/3000</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Tổng số sản phẩm</Typography>
                        <Typography>24</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Sản phẩm đang bán</Typography>
                        <Typography>21</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                    width: '20%'
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1}}>
                        <Typography variant='h6'>Sản phẩm hết hàng</Typography>
                        <Typography>1</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box py={2}>
                <ProductsTable />
            </Box>
        </Box>
    )
}
