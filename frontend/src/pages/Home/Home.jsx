import React from 'react'
//import "./highchart.js";
import "./home.scss"
import ReportAPI from '../../api/ReportAPI';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid, Paper, MenuItem, Select, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home() {
    // set year for charts
    const [yearChart, setYearChart] = React.useState(2021);
    const handleChangeYear = (event) => {
        setYearChart(event.target.value);
    };

    // get totalSuppliedQuantity from api report
    const [totalSuppliedQuantity, setTotalSuppliedQuantity] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.totalSuppliedQuantity(yearChart);
            setTotalSuppliedQuantity(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    // get totalSuppliedQuantity from api report
    const [totalOrders, setTotalOrders] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.totalOrders(yearChart);
            setTotalOrders(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    console.log(totalSuppliedQuantity);

    const options = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Biểu đồ sản phẩm và đơn hàng đã nhập của doanh nghiệp'
        },
        subtitle: {
            text: 'Số liệu từ bên kế toán'
        },
        xAxis: [{
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6',
                'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} đơn',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Tổng số đơn nhập hàng',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Tổng số sản phẩm đã nhập',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} sp',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Tổng số sản phẩm',
            type: 'column',
            yAxis: 1,
            data: totalSuppliedQuantity,
            tooltip: {
                valueSuffix: ' sp'
            }

        }, {
            name: 'Tổng số đơn hàng',
            type: 'spline',
            data: totalOrders,
            tooltip: {
                valueSuffix: ' đơn'
            }
        }]
    }

    return (
        <Box pt={2} pb={4} px={4} sx={{ background: "#F4F6F8", height: "100vh" }}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tổng sản phẩm</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    {totalSuppliedQuantity.reduce((a, b) => a + b, 0)}<br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-cubes"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585)", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tổng số đơn</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    {totalOrders.reduce((a, b) => a + b, 0)}<br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-clipboard-list"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585)", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tổng tiền hàng</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    10000<br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-dollar-sign"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #25bdeb);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tổng số nhà cung cấp</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    100.000 <br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-warehouse"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box spacing={2} sx={{ display: "flex" }} pt={4} pb={4} >
                <Grid item xs={10} >
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <strong>Chọn năm:</strong>
                            <Select
                                value={yearChart}
                                onChange={handleChangeYear}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>
                        </FormControl>
                    </Item>
                    <br />
                    <Item>
                        <strong>Thông số:</strong>
                        <br />
                        <br />
                        <ul style={{ listStyle: "none", textAlign: "left" }}>
                            <li><strong>Sản phẩm cao nhất :</strong> Tháng <strong>{totalSuppliedQuantity.indexOf(Math.max.apply(null, totalSuppliedQuantity)) + 1}</strong> </li>
                            <li><strong>Sản phẩm thấp nhất :</strong> Tháng <strong>{totalSuppliedQuantity.indexOf(Math.min.apply(null, totalSuppliedQuantity)) + 1}</strong></li>
                            <br />
                            <br />
                            <li><strong>Số đơn cao nhất :</strong> Tháng <strong>{totalOrders.indexOf(Math.max.apply(null, totalOrders)) + 1}</strong> </li>
                            <li><strong>Số đơn thấp nhất :</strong> Tháng <strong>{totalOrders.indexOf(Math.min.apply(null, totalOrders)) + 1}</strong></li>
                        </ul>
                    </Item>
                </Grid>
            </Box>
        </Box>
    )
}
