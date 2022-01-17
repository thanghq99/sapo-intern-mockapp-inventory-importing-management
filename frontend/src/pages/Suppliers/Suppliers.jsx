import { Box, Button, TextField, Divider, InputAdornment } from '@mui/material'
import { Download, Upload, Group, AddCircle, Search, FilterAltOutlined } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom'
import TableSupply from '../../components/table/TableListSuppliers'
import UnlockAccess from '../../components/roleBasedRender/UnlockAccess'
import "./suppliers.scss"

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
                        <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
                            <Link style={{ textDecoration: "none" }} to="/nha-cung-cap/tao-moi-nha-cung-cap">
                                <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Thêm nhà cung cấp</Button>
                            </Link>
                        </UnlockAccess>
                    </Box>
                </Box>
                <Divider />
                <Box py={3} px={2} display='flex' justifyContent='space-between' backgroundColor='white'>
                    <TextField
                        placeholder="Tìm kiếm"
                        sx={{ width: '76%'}}
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
                        <TextField
                            placeholder="Lọc sản phẩm"
                            variant="outlined"
                            size='small'
                            sx={{ width: '100%'}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <FilterAltOutlined />
                                    </InputAdornment>
                                ),
                            }}>
                        </TextField>
                    </Box>
                </Box>
                <TableSupply />
            </Box>
        </Box>
    )
}
