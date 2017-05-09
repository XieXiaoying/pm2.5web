import React, { Component } from 'react';
import { connect } from 'react-redux';
// import WeeklyData from './BubbleDetail';
// import { asyncLoadAllPois } from '../../../actions/stationActions';
// import { showWaterfall, setCurrentPic } from '../../../actions/homeActions';
// import { asyncLoadPicsOfPoi } from '../../../actions/homeActions';
import ReactHighcharts from 'react-highcharts';
import './MyPage.styl';
class WeeklyPoiData extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let categories = [];
        let picnum = [];
        if (this.props.data.station.poiPics.detail) {
            categories = [];
            picnum = [];
            this.props.data.station.poiPics.detail.forEach((item) => {
                picnum.push(item.count);
                categories.push(item.text);
            });
        }
        const barConfig = { chart: {
            type: 'bar'
        },
        title: {
            text: '本周上传'
        },
        xAxis: {
            categories: this.props.data.station.poiPics.detail ? categories : [],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '照片数量',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' 张'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    allowOverlap: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '本站点上传 ',
            data: picnum ? picnum : []
        }]
    };
        return (
            <div className="weeklypoidata" id="weeklypoidata" style={{ width: '40%', height: this.props.height }}>
                <ReactHighcharts config={barConfig} />
            </div>
        );
    }
}
function select(state) {
    return {
        data: state
    };
}
export default connect(select)(WeeklyPoiData);
