import React from 'react'
//import "./highchart.js";
import "./home.scss"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const options = {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Biểu đồ sản phẩm và doanh thu doanh nghiệp'
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
            format: '{value} tỉ',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Tổng doanh thu',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Tổng số hàng',
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
        name: 'Doanh thu',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
            valueSuffix: ' tỉ'
        }

    }, {
        name: 'sản phẩm',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            valueSuffix: ' nghìn sp'
        }
    }]
}
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home() {
    return (
        <Box pt={2} pb={4} px={4} sx={{ background: "#F4F6F8", height: "100vh" }}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #25bdeb);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tong san pham</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    100.000 <br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-cubes"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #25bdeb);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tong san pham</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    100.000 <br />
                                    <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> 20%
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-clipboard-list"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #25bdeb);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tong san pham</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    100.000 <br />
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
                            <h3><strong style={{ fontSize: "1.2em !important" }}>Tong san pham</strong></h3>
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
            <Box pt={4} pb={4} >
                <Grid xs={10} >
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Grid>
                <Grid xs={2}>

                </Grid>
            </Box>
        </Box>
    )
}
