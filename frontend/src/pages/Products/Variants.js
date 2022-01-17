import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ProductAPI from '../../api/ProductAPI'
import { Box, TextField, InputAdornment, Button, Divider, MenuItem, FormControl, Select, Typography } from '@mui/material'
import { Search } from '@mui/icons-material';
import VariantsTable from '../../components/variant/VariantTable'
import "./products.scss"
import VariantAPI from '../../api/VariantAPI';
import CategoryAPI from '../../api/CategoryAPI';

export default function Variants({setStateAlert}) {
    const history = useHistory();
    const [trigger, setTrigger] = useState(false);
    const [variants, setVariants] = useState([]);
    const [categories, setCategories] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchedVariants, setSearchedVariants] = useState([]);
    function getData() {
        ProductAPI.getAllVariants()
            .then((vResult) => {
                setVariants(vResult.data.reverse());
                setSearchedVariants(vResult.data);
                console.log(vResult.data)
            })
            .catch(err => {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Có lỗi xảy ra" });
                history.push('/san-pham');
            });
        CategoryAPI.CategoryList()
        .then((cResult) => {
            console.log(cResult.data);
            setCategories(cResult.data);
        })
        .catch(err => {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: "Có lỗi xảy ra" });
            history.push('/san-pham');
        });
    }

    useEffect(() => {
        getData();
    }, [trigger])

    useEffect(() => {
        searchAndFilter()
    }, [categoryFilter, searchInput]);

    const triggerReload = () => {
        setTrigger(!trigger);
    };

    //inputs
    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = variants.filter(variant => variant.variantName.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedVariants([...result]);
    }

    const handleChangeCategory = (e) => {
        let value = e.target.value;
        setCategoryFilter(value);
        console.log(value);
    }

    const searchAndFilter = () => {
        let categoryFilterValue = categoryFilter;
        let searchValue = searchInput.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = [];

        if (categoryFilterValue != "") {
            result = variants.filter(variant => variant.product.category.name === categoryFilterValue);
        } else {
            result = variants;
        }
        result = result.filter(variant => variant.variantName.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(searchValue) >= 0);
        setSearchedVariants([...result]);
    }

    const handleDeleteVariant = (id) => {
        VariantAPI.deleteVariant(id)
        .then(res => {
            setStateAlert({ severity: "success", variant: "filled", open: true, content: res.data.variantName + " đã được xóa" });
          })
          .catch(err => {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: err.response.data });
          });
    }
    
    return (
        <Box backgroundColor="#F4F6F8" pt={2} pb={4} px={4} minHeight="93vh" >
            <Box py={2} px={2} display="flex" backgroundColor='white'>
                    <TextField
                        placeholder="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size='small'
                        sx={{ mr: 2, flexGrow: 1}}
                        value={searchInput}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}></TextField>
                        <FormControl sx={{minWidth: 150, mr: 2}}>
                    {/* <InputLabel>Loại sản phẩm</InputLabel> */}
                    <Select
                        value={categoryFilter}
                        size='small'
                        displayEmpty
                        onChange={handleChangeCategory}
                        renderValue={
                            categoryFilter !== "" ? undefined : () => <Typography sx={{color: "#aaa"}}>Loại sản phẩm</Typography>
                          }
                    >
                        <MenuItem value="">
                            <Typography >Tất cả</Typography>
                        </MenuItem>
                        {categories.map(category => (
                        <MenuItem key={category.id} value={category.name}>
                            <Typography >{category.name}</Typography>
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <Button
                        variant='contained'
                        sx={{ mr: 2 }}
                        onClick={() => { history.push('/san-pham') }}
                    >Danh sách sản phẩm
                    </Button>
            </Box>
            <Divider />
            <Box py={2}>
                {variants ? 
                    <VariantsTable variants={searchedVariants} triggerReload={triggerReload} handleDeleteVariant={handleDeleteVariant}/>
                :
                    <Box>loading</Box>
                }
                
            </Box>
        </Box>
    )
}
