import { Autocomplete, Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TableSupply from '../../components/table/TableListSuppliers'
import "./supplier.scss"

const top100Films = [
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
        <div className='supply_page'>
            <div className="supply_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a href="#">Quay lại trang trước</a>
                </div>
                <div className="activity">
                    <div className="left_activity">
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Xuất file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-download"></i>
                            <a href="">Nhập file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-users"></i>
                            <a href="">Nhóm nhà cung cấp</a>
                        </div>
                    </div>
                    <div className="right_activity">
                        <Link style={{ textDecoration: "none" }} to="/nha-cung-cap/tao-moi-nha-cung-cap">
                            <Button variant="contained"><i className="fas fa-plus-circle"></i> <span>Thêm nhà cung cấp</span> </Button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="find_section">
                    <div className="search_section">
                        <i className="fas fa-search"></i>
                        <input className='search_input' type="text" placeholder='nhập giá trị ...' />
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
                                    label="Lọc nhiều giá trị"
                                    placeholder="Yêu thích"
                                />
                            )}
                        />
                    </div>
                </div>
                <TableSupply />
            </div>
        </div>
    )
}
