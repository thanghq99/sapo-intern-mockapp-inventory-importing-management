import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import ProductAPI from '../../api/ProductAPI'
import { Box, TextField, InputAdornment, Button, Divider } from '@mui/material'
import { Search, AddCircle, FactCheck } from '@mui/icons-material';
import VariantsTable from '../../components/variant/VariantTable'
import "./products.scss"

export default function Variants() {
    const history = useHistory();
    const [variants, setVariants] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [searchedVariants, setSearchedVariants] = useState([]);
    function getData() {
        ProductAPI.getAllVariants()
            .then((vResult) => {
                setVariants(vResult.data);
                setSearchedVariants(vResult.data);
                console.log(vResult.data)
            })
    }
        
    useEffect(() => {
        getData();
    }, [])

    //inputs
    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = variants.filter(variant => variant.variantName.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedVariants([...result]);
    }
    
    return (
        <Box backgroundColor="#F4F6F8" pt={2} pb={4} px={4} sx={{minHeight: '90vh'}}>
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
                        onClick={() => { history.push('/san-pham') }}
                    >Danh sách sản phẩm
                    </Button>
                    <Link style={{ textDecoration: "none" }} to="/kiem-hang">
                        <Button
                            variant='contained'
                            startIcon={<FactCheck />}
                        >Kiểm hàng</Button>
                    </Link>

                </Box>
            </Box>
            <Divider />
            <Box py={2}>
                {variants ? 
                    <VariantsTable variants={searchedVariants} />
                :
                    <Box>loading</Box>
                }
                
            </Box>
        </Box>
    )
}
