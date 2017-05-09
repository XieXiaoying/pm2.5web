import React, { Component } from 'react';
import { connect } from 'react-redux';
// import WeeklyData from './BubbleDetail';
// import { asyncLoadAllPois } from '../../../actions/stationActions';
// import { showWaterfall, setCurrentPic } from '../../../actions/homeActions';
// import { asyncLoadPicsOfPoi } from '../../../actions/homeActions';
// import HighchartsMore from 'highcharts-more';
import ReactHighcharts from 'react-highcharts';
import './MyPage.styl';
class PolarChart extends Component {
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
            polar: true,
            type: 'line'
        },
        title: {
            text: '系统拍照风云榜',
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: categories ? categories : [],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
            name: '本周统计',
            data: [7, 14, 7, 0, 0, 0],
            pointPlacement: 'on'
        }, {
            name: '上周统计',
            data: [7, 28, 7, 0, 5, 0],
            pointPlacement: 'on'
        }]
    };
        // const barConfig = { chart: {
        //     polar: true
        // },
        // xAxis: {
        //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        // },
        // series: [{
        //     data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        // }]
        // };
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
export default connect(select)(PolarChart);
