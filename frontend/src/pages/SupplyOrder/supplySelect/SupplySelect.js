import "./SupplySelect.scss";

import * as React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function SupplySelect() {
    const [detailSupply, setDetailSupply] = React.useState(false);
    const [Search, setSearch] = React.useState(true);

    const test = ["asdas","afasfas"];
    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 0,
            height: 40,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "white",
                height: 40,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"
            },
            "& #combo-box-demo": {
                padding: 0,
            }
            // ,
            // "& .MuiAutocomplete-root": {
            //     ariaExpanded: "true",
            // }
        },
        clearIndicator: {
            color: "black"
        }
    }));
    const classes = useStyles();
    const showDetail = () => {
        setSearch(!Search);
        setDetailSupply(!detailSupply);

    }

    return (
        <div>
            <Box className="Supply">
                <div className="title">Thông tin nhà cung cấp</div>
                {
                    Search ?
                        <Box className="selectSupply-info" >
                            <SearchIcon className="icon-search" />
                            <Autocomplete className="selectSupply"
                                classes={classes}
                                disablePortal
                                id="combo-box-demo"
                                options={test}
                                onChange={showDetail}
                                onClose={showDetail}
                                // sx={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} style={{ padding: 0 }}
                                    placeholder="Chọn nhà cung cấp" />}
                            />
                        </Box> : null
                }
                {
                    detailSupply ?
                        <Box>
                            <Box className="headerSupply">
                                <Box className="nameSupply">
                                    <PersonRoundedIcon sx={{ marginRight: "10px" }} />
                                    <Typography sx={{ marginRight: "5px" }}>Cty abc</Typography>
                                    <CancelOutlinedIcon sx={{ cursor: "pointer" }} onClick={showDetail} />
                                </Box>
                                <Typography className="debt">Công nợ: 125.000vnd</Typography>
                            </Box>
                            <Divider />
                            <Box className="detail-supplier">
                                <Box className="export-address">
                                    <Typography className="title-add">Địa chỉ xuất hàng</Typography>
                                    <Typography>Giao hàng</Typography>
                                    <Typography>----</Typography>
                                    <Typography>266 đội cấn</Typography>
                                    <Typography>Quận Ba Đình - Hà Nội</Typography>
                                    <Typography>Email: </Typography>
                                </Box>
                                <Box className="billing-ex-add">
                                    <Typography className="title-add" >Địa chỉ xuất hàng</Typography>
                                    <Typography>Giao hàng</Typography>
                                    <Typography>----</Typography>
                                    <Typography>266 đội cấn</Typography>
                                    <Typography>Quận Ba Đình - Hà Nội</Typography>
                                    <Typography>Email: </Typography>
                                </Box>
                            </Box>
                        </Box>
                        : null
                }
            </Box>
        </div>
        )
}

{/* return (
                <div>
                    <Box className="Supply">
                        <div className="title">Thông tin nhà cung cấp</div>
                        {Search ? (
                            <Box className="selectSupply-info">
                                <SearchIcon className="icon-search" />
                                <Autocomplete
                                    className="selectSupply"
                                    classes={classes}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={options}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(option) => (
                                        <>
                                            {option.name}
                                        </>
                                    )}
                                    //   onChange={showDetail}
                                    //   onClose={showDetail}
                                    // sx={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            //   style={{ padding: 0 }}
                                            placeholder="Chọn nhà cung cấp"
                                        />
                                    )}
                                />
                            </Box>
                        ) : null}
                        {detailSupply ? (
                            <Box>
                                <Box className="headerSupply">
                                    <Box className="nameSupply">
                                        <PersonRoundedIcon sx={{ marginRight: "10px" }} />
                                        <Typography sx={{ marginRight: "5px" }}>Cty abc</Typography>
                                        <CancelOutlinedIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={showDetail}
                                        />
                                    </Box>
                                    <Typography className="debt">Công nợ: 125.000vnd</Typography>
                                </Box>
                                <Divider />
                                <Box className="detail-supplier">
                                    <Box className="export-address">
                                        <Typography className="title-add">Địa chỉ xuất hàng</Typography>
                                        <Typography>Giao hàng</Typography>
                                        <Typography>----</Typography>
                                        <Typography>266 đội cấn</Typography>
                                        <Typography>Quận Ba Đình - Hà Nội</Typography>
                                        <Typography>Email: </Typography>
                                    </Box>
                                    <Box className="billing-ex-add">
                                        <Typography className="title-add">Địa chỉ xuất hàng</Typography>
                                        <Typography>Giao hàng</Typography>
                                        <Typography>----</Typography>
                                        <Typography>266 đội cấn</Typography>
                                        <Typography>Quận Ba Đình - Hà Nội</Typography>
                                        <Typography>Email: </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ) : null}
                    </Box>
                </div>
                ); */}
