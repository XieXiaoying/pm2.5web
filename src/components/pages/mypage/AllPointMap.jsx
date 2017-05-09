import React, { Component } from 'react';
import { connect } from 'react-redux';
import PointsMap from './PointsMap';
import BubbleDetail from './BubbleDetail';
import WeeklyPoiData from './WeeklyPoiData';
import PolarChart from './PolarChart';
// import { asyncLoadAllPois } from '../../../actions/stationActions';
// import { showWaterfall, setCurrentPic } from '../../../actions/homeActions';
// import { asyncLoadPicsOfPoi } from '../../../actions/homeActions';
import './MyPage.styl';
class MyMap extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // changeState.bind(this)();
        const mapHeigth = 0.45 * (document.body.clientHeight - 85);
        return (
            <div className="mapflex">
                <PointsMap height={mapHeigth}/>
                <BubbleDetail height={mapHeigth}/>
                <WeeklyPoiData height={mapHeigth}/>
                <PolarChart height={mapHeigth}/>
            </div>
        );
    }
}
function select(state) {
    return {
        data: state
    };
}
export default connect(select)(MyMap);
