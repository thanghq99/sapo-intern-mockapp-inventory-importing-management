import './ListOrder.scss';

import * as React from 'react';
import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import muiLink from '@mui/material/Link'
import { ArrowBack, Download, Upload, Group, AddCircle, Search, FilterAlt } from '@mui/icons-material';
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
    return(
        <Box px={4} pt={2} backgroundColor="#F4F6F8" minHeight='90vh'>
        <Box display='flex' flexDirection='column'>
            {/* <Box display='flex' pb={1}>
                <ArrowBack />
                <Link underline="none" sx={{}}>
                    Quay lại trang trước
                </Link>
            </Box> */}

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
                    {/* <Box display='flex' pr={2}>
                        <Group />
                        <muiLink underline="none">
                            Nhóm nhà cung cấp
                        </muiLink>
                    </Box> */}
                </Box>
                <Box>
                    <Link style={{ textDecoration: "none" }} to="/nhap-hang/tao-don-nhap-hang">
                        <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Tạo đơn nhập hàng</Button>
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
                    <FilterAlt fontSize="large"/>
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
            <TableOrder />
        </Box>
    </Box>
    );
}