import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import "./createSupplier.scss"

export default function CreateSupplier() {

    const [name, setAge] = useState("");
    const [time, setTime] = useState(new Date());

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <div className='createSupplier_page'>
            <div className="createSupplier_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a href="#">Quay lại trang trước</a>
                </div>
                <div className="activity">
                    <Button className="button_activity" variant="contained"><i className="far fa-save"></i> <span>Lưu kết quả</span> </Button>
                    <Button className="button_activity"  color="error" variant="contained"><i className="far fa-window-close"></i> <span>Hủy thao tác</span> </Button>
                    <Button className="button_activity" variant="outlined"><i className="far fa-question-circle"></i> <span>Trợ giúp</span> </Button>
                </div>
                <hr />
                <div className="createSupplier_form">
                    <div className="left_info">
                        <div className="left_info_first">
                            <div>
                                <strong style={{ width: "100%" }}>Thông tin cơ bản</strong>
                            </div>
                            <TextField className="left_info_first_input" required id="outlined-required" label="Tên nhà cung cấp" />
                            <TextField className="left_info_first_input left" required id="outlined-required" label="Mã nhà cung cấp" />
                            <TextField className="left_info_first_input" required id="outlined-required" label="Số điện thoại" />
                            <TextField className="left_info_first_input left" required id="outlined-required" label="Email" />
                            <TextField className="left_info_first_input address" required id="outlined-required" label="Địa chỉ" />
                        </div>
                        <div className="left_info_first second">
                            <div>
                                <strong style={{ width: "100%" }}>Thông tin bổ sung</strong>
                            </div>
                            <TextField className="left_info_first_input" required id="outlined-required" label="Số Fax" />
                            <TextField className="left_info_first_input left" required id="outlined-required" label="Website" />
                            <TextField className="left_info_first_input" required id="outlined-required" label="Mã số thuế" />
                            <TextField className="left_info_first_input address" required id="outlined-required" label="Mô tả nhà cung cấp" />
                        </div>

                    </div>
                    <div className="right_info">
                        <div className="right_info_first">
                            <div>
                                <strong style={{ width: "100%" }}>Thông tin người tạo nhà cung cấp</strong>
                            </div>
                            <FormControl className="right_info_first_input" fullWidth>
                                <InputLabel id="demo-simple-select-label">Tên nhân viên</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={name}
                                    label="Tên nhân viên"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Nguyễn Văn A"}>Nguyễn Văn A</MenuItem>
                                    <MenuItem value={"Nguyễn Văn B"}>Nguyễn Văn B</MenuItem>
                                    <MenuItem value={"Nguyễn Văn C"}>Nguyễn Văn C</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="right_info_first_input">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Chọn ngày tạo mới"
                                        value={time}
                                        onChange={(newTime) => {
                                            setTime(newTime);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <TextField className="right_info_first_input" required id="outlined-required" label="ten nha cung cap" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
