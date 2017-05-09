import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Index.styl';
import ReactHighcharts from 'react-highcharts';
// import { formatCharts } from 'utils/parseService';
import { formatCharts } from '../../../utils/parseService';
class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            point: null
        };
    }
    render() {
        const seriesList = formatCharts(this.props.data.home.poiDetail, this.props.data.home.poiAddress);
        const lineConfig = { title: {
            text: '各站点一周内PM2.5走势',
            x: -20// center
        },
        xAxis: {
            categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'PM2.5指数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: seriesList
    };
        const barConfig = { chart: {
            type: 'column'
        },
        title: {
            text: '各站点一周内PM2.5指数'
        },
        xAxis: {
            categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'PM2.5指数'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesList
    };
        return (
            <div className="charts">
                <ReactHighcharts config={lineConfig} />
                <ReactHighcharts config={barConfig} />
            </div>
        );
    }
}

// REDUX STUFF

// Which props do we want to inject, given the global state
function select(state) {
    return {
        data: state
    };
}


export default connect(select)(Charts);
