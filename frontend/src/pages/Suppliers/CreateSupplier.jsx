import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiAlert from '@mui/material/Alert';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Snackbar, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import "./createSupplier.scss"
import { useHistory } from 'react-router-dom';
import SupplierAPI from '../../api/SupplierAPI';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function CreateSupplier() {

    const code = useRef("");
    const name = useRef("");
    const address = useRef("");
    const phone = useRef("");
    const email = useRef("");
    const website = useRef("");
    const description = useRef("");
    const fax = useRef("");
    const debt = useRef(0);
    const activityStatus = useRef("");
    const recordStatus = useRef("");


    const history = useHistory();

    const handleCreate = async (e) => {
        e.preventDefault();
        const supplier = {
            code: code.current.value,
            name: name.current.value,
            address: address.current.value,
            phone: phone.current.value,
            email: email.current.value,
            website: website.current.value,
            description: description.current.value,
            fax: fax.current.value,
            debt: debt.current.value
        }
        try {
            const res = await SupplierAPI.createSupplier(supplier);
            setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã tạo mới nhà cung cấp thành công" })
            history.push("/nha-cung-cap");
        } catch (error) {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: error.response.data })
        }
    }

    const [NameStaff, setNameStaff] = useState("");
    const [time, setTime] = useState(new Date());
    const handleChangeStaff = (event) => {
        setNameStaff(event.target.value);
    };


    const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });
    //const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);

    return (
        <div className='createSupplier_page'>
            <div className="createSupplier_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a href="#">Quay lại trang trước</a>
                </div>
                <div className="activity">
                    <Button onClick={handleCreate} className="button_activity" variant="contained"><i className="far fa-save"></i> <span>Lưu kết quả</span> </Button>
                    <Button className="button_activity" color="error" variant="contained"><i className="far fa-window-close"></i> <span>Hủy thao tác</span> </Button>
                    <Button className="button_activity" variant="outlined"><i className="far fa-question-circle"></i> <span>Trợ giúp</span> </Button>
                </div>
                <hr />
                <div className="createSupplier_form">
                    <div className="left_info">
                        <div className="left_info_first">
                            <div>
                                <strong style={{ width: "100%" }}>Thông tin cơ bản</strong>
                            </div>
                            <TextField inputRef={name} className="left_info_first_input" required id="outlined-required" label="Tên nhà cung cấp" />
                            <TextField inputRef={code} className="left_info_first_input left" required id="outlined-required" label="Mã nhà cung cấp" />
                            <TextField inputRef={phone} className="left_info_first_input" required id="outlined-required" label="Số điện thoại" />
                            <TextField inputRef={email} className="left_info_first_input left" id="outlined-required" label="Email" />
                            <TextField inputRef={address} className="left_info_first_input address" id="outlined-required" label="Địa chỉ" />
                        </div>
                        <div className="left_info_first second">
                            <div>
                                <strong style={{ width: "100%" }}>Thông tin bổ sung</strong>
                            </div>
                            <TextField inputRef={fax} className="left_info_first_input" id="outlined-required" label="Số Fax" />
                            <TextField inputRef={website} className="left_info_first_input left" id="outlined-required" label="Website" />
                            <TextField className="left_info_first_input" id="outlined-required" label="Mã số thuế" />
                            <TextField inputRef={description} className="left_info_first_input address" id="outlined-required" label="Mô tả nhà cung cấp" />
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
                                    value={NameStaff}
                                    label="Tên nhân viên"
                                    onChange={handleChangeStaff}
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
            <Snackbar open={stateAlert.open} autoHideDuration={3000} onClose={() => setStateAlert({ ...stateAlert, open: false })}>
                <Alert onClose={() => setStateAlert({ ...stateAlert, open: false })} severity={stateAlert.severity} variant={stateAlert.variant} sx={{ width: '100%' }}>
                    {stateAlert.content}
                </Alert>
            </Snackbar>
        </div >
    )
}
