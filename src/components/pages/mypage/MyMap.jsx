import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, ControlLabel, Form, FormGroup } from 'react-bootstrap';
import { asyncLoadAllPois } from '../../../actions/stationActions';
import './MyPage.styl';
const BMap = window.BMap;
function addMarker(point, map) {
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
}
// 显示可视区域内的标注
function addMymarkers(map, ply) {
    const points = [];
    const pointsIds = [];
    Object.keys(this.props.data.station.allPoiId).map((item) => {
        points.push(new BMap.Point(this.props.data.station.allPoiId[item].blongitude, this.props.data.station.allPoiId[item].blatitude));
        pointsIds.push(item);
    });
    for (let i = 0; i < points.length; i++) {
        const result = window.BMapLib.GeoUtils.isPointInPolygon(points[i], ply);
        if (result === true) {
            addMarker(points[i], map);
        }
    }
}
function _getBoundary(name) {
    const map = new BMap.Map('container');
    map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
    map.addControl(new BMap.NavigationControl({ type: 'BMAP_NAVIGATION_CONTROL_SMALL' }));
    map.enableScrollWheelZoom();
    const bdary = new BMap.Boundary();
    bdary.get(name, (rs) => {// 获取行政区域
        map.clearOverlays();// 清除地图覆盖物
        const count = rs.boundaries.length;// 行政区域的点有多少个
        if (count === 0) {
            window.alert('未能获取当前输入行政区域');
        }
        let pointArray = [];
        for (let i = 0; i < count; i++) {
            const ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: '#ff0000', fillOpacity: 0 });// Polygon建立多边形覆盖物
            map.addOverlay(ply);// 添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
            addMymarkers.bind(this)(map, ply);
        }
        map.setViewport(pointArray);
    });
}
class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: '北京'
        };
    }
    componentDidMount() {
        this.props.dispatch(asyncLoadAllPois());
        const map = new BMap.Map('container');
        map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
        map.addControl(new BMap.NavigationControl({ type: 'BMAP_NAVIGATION_CONTROL_SMALL' }));
        map.enableScrollWheelZoom();
    }
    _handleChange(evt) {
        this.setState({ province: evt.target.value });
    }
    render() {
        const mapHeigth = document.body.clientHeight - 85;
        return (
            <div>
                <Form inline>
                    <FormGroup controlId="formInlineName" width={'100%'}>
                        <ControlLabel>输入省、直辖市或县名称：</ControlLabel>
                        {' '}
                        <FormControl type="text" value={ this.state.province } placeholder="北京" onChange={this._handleChange.bind(this)}/>
                    </FormGroup>
                    {' '}
                    <Button bsStyle="primary" onClick={ () => { _getBoundary.bind(this)(this.state.province); } }>获取站点</Button>
                </Form>
                <div className="container" id="container" style={{ width: '100%', height: mapHeigth }}></div>
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
// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(MyMap);
