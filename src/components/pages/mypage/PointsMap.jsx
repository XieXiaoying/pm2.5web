import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncLoadAllPois } from '../../../actions/stationActions';
import { showWaterfall, setCurrentPic, asyncLoadPicsOfPoi } from '../../../actions/homeActions';
import { asyncGetPicNum } from '../../../actions/stationActions';
// import { asyncLoadPicsOfPoi } from '../../../actions/homeActions';
import './MyPage.styl';
const BMap = window.BMap;
function attribute(poiID) {
    console.log('test');
    this.props.dispatch(asyncLoadPicsOfPoi(poiID, 1, 15));
    this.props.dispatch(setCurrentPic(poiID));
    this.props.dispatch(showWaterfall());
    console.log(poiID);
}
function changeCurrentPoi(poiID) {
    this.props.dispatch(setCurrentPic(poiID));
    this.props.dispatch(asyncGetPicNum.bind(this)(poiID));
    console.log('poiID');
}
class PointsMap extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(asyncLoadAllPois());
        // const map = new BMap.Map('location_');
        // map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
        // map.addControl(new BMap.NavigationControl({ type: 'BMAP_NAVIGATION_CONTROL_SMALL' }));
        // map.enableScrollWheelZoom();
    }
    componentDidMount() {
        window.map1 = new BMap.Map('location_');
        window.map1.centerAndZoom(new BMap.Point(115.523765, 40.314850), 10);
        window.map1.addControl(new BMap.NavigationControl({ type: 'BMAP_NAVIGATION_CONTROL_SMALL' }));
        window.map1.enableScrollWheelZoom();
        window.map1.clearOverlays();
        const points = [];
        const pointIds = [];
        Object.keys(this.props.data.station.allPoiId).map((item) => {
            points.push(new BMap.Point(this.props.data.station.allPoiId[item].blongitude, this.props.data.station.allPoiId[item].blatitude));
            pointIds.push(this.props.data.station.allPoiId[item].stationID);
        });
        points.forEach((item, index) => {
            const marker = new BMap.Marker(points[index]);
            window.map1.addOverlay(marker);
            marker.addEventListener('click', () => { attribute.bind(this)(pointIds[index]); });
            marker.addEventListener('mouseover', () => { changeCurrentPoi.bind(this)(pointIds[index]); });
        });
    }
    componentDidUpdate() {
        window.map1.clearOverlays();
        const points = [];
        const pointIds = [];
        Object.keys(this.props.data.station.allPoiId).map((item) => {
            points.push(new BMap.Point(this.props.data.station.allPoiId[item].blongitude, this.props.data.station.allPoiId[item].blatitude));
            pointIds.push(this.props.data.station.allPoiId[item].stationID);
        });
        points.forEach((item, index) => {
            const marker = new BMap.Marker(points[index]);
            window.map1.addOverlay(marker);
            marker.addEventListener('click', () => { attribute.bind(this)(pointIds[index]); });
            marker.addEventListener('mouseover', () => { changeCurrentPoi.bind(this)(pointIds[index]); });
        });
    }
    render() {
        return (
            <div className="location_" id="location_" style={{ width: '65%', height: this.props.height }}></div>
        );
    }
}
function select(state) {
    return {
        data: state
    };
}
export default connect(select)(PointsMap);
