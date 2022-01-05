import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import {Download, Upload, Group, AddCircle, Search, FilterAlt } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom'
import TableSupply from '../../components/table/TableListSuppliers'
import "./suppliers.scss"

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
export default function Supplier() {
    return (
        <Box className="navig" px={4} pt={2} backgroundColor="#F4F6F8" minHeight='90vh'>
            <Box display='flex' flexDirection='column'>
                <Box display='flex' justifyContent='space-between' py={2} px={2} backgroundColor='white'>
                    <Box display='flex' alignItems='center'>
                        <Box display='flex' pr={2}>
                            <Download />
                            <Link underline="none">
                                Xuất file
                            </Link>
                        </Box>
                        <Box display='flex' pr={2}>
                            <Upload />
                            <Link underline="none">
                                Nhập file
                            </Link>
                        </Box>
                        <Box display='flex' pr={2}>
                            <Group />
                            <Link underline="none">
                                Nhóm nhà cung cấp
                            </Link>
                        </Box>
                    </Box>
                    <Box>
                        <Link style={{ textDecoration: "none" }} to="/nha-cung-cap/tao-moi-nha-cung-cap">
                            <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Thêm nhà cung cấp</Button>
                        </Link>
                    </Box>
                </Box>
                <Divider />
                <Box py={3} px={2} display='flex' justifyContent='space-between' backgroundColor='white'>
                    <TextField
                        placeholder="Tìm kiếm"
                        sx={{
                            width: '70%'
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
                    <Box display='flex' alignItems='center'>
                        <FilterAlt fontSize="large" />
                        <Autocomplete
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
                        />
                    </Box>
                </Box>
                <TableSupply />
            </Box>
        </Box>
    )
}
