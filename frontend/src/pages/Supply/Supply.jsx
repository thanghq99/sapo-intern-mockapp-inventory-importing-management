import { Autocomplete, Button, TextField } from '@mui/material'
import React from 'react'
import TableSupply from '../../components/table/TableSupply'
import Table from '../../components/table/TableSupply'
import "./supply.scss"

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]
export default function Supply() {
    return (
        <div className='supply_page'>
            <div className="supply_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a>Quay lai trang truoc</a>
                </div>
                <div className="activity">
                    <div className="left_activity">
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Xuat file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Nhap file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Nhom nha cung cap</a>
                        </div>
                    </div>
                    <div className="right_activity">
                        <Button variant="contained"><i className="fas fa-plus-circle"></i> <span>Them nha cung cap</span> </Button>
                    </div>
                </div>
                <hr />
                <div className="find_section">
                    <div className="search_section">
                        <i className="fas fa-search"></i>
                        <input className='search_input' type="text" placeholder='search here ...' />
                    </div>
                    <div className="filter_section">
                        <i className="fas fa-filter"></i>
                        <Autocomplete
                            className="filter_input"
                            multiple
                            id="tags-standard"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Loc nhieu gia tri"
                                    placeholder="Favorites"
                                />
                            )}
                        />
                    </div>
                </div>
                <TableSupply className="table" />
            </div>
        </div>
    )
}
