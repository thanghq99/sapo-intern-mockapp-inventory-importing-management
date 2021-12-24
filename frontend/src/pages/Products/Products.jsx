import React from 'react'
import { Box, TextField, InputAdornment, Button, Divider, Card, CardContent, Typography } from '@mui/material'
import { Search, FilterAlt, AddCircle } from '@mui/icons-material';
import ProductsTable from './ProductsTable'
import "./products.scss"

export default function Products() {
    return (
        <Box backgroundColor="#F4F6F8" pt={2} pb={4} px={4}>
            <Box py={2} display="flex" justifyContent="space-between">
                <Box>
                    <TextField
                        placeholder="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size='small'
                        sx={{ mr: 1 }}
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
                                    <FilterAlt />
                                </InputAdornment>
                            ),
                        }}></TextField>
                </Box>
                <Box>
                    <Button
                        variant='outlined'
                        sx={{ mr: 1 }}
                        endIcon={<AddCircle />}
                    >Thêm sản phẩm</Button>
                    <Button
                        variant='outlined'
                        endIcon={<AddCircle />}
                    >Xuất file Excel</Button>
                </Box>
            </Box>
            <Divider />
            <Box py={2} display="flex" justifyContent="space-evenly">
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Khoi luong kho</Typography>
                        <Typography>1000/3000</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>Tong so san pham</Typography>
                        <Typography>24</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant='h6'>San pham dang hoat dong</Typography>
                        <Typography>21</Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    borderRadius: '40px',
                    px: 3,
                }}>
                    <CardContent sx={{ textAlign: 'center', py: 1}}>
                        <Typography variant='h6'>San pham ton kho</Typography>
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
