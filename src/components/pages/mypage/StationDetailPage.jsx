import './MyPage.styl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Header } from 'react-bootstrap/lib/Modal';// , Title, Body, Footer
import Header from '../Header';
import { Button } from 'react-bootstrap';
import BubbleDetail from './BubbleDetail';
import { asyncLoadPicNum } from '../../../actions/stationActions';
// import { hideWaterfall } from '../../actions/homeActions';
// import history from 'history';
class StationDetailPage extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            allpoint: false
        };
    }
    componentWillMount() {
        this.props.dispatch(asyncLoadPicNum(this.props.data.home.currentPic));
    }
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Header type={window.localStorage.getItem('userType')}/>
                <div style={{ height: '5%' }} id="picsum" >本站点共有照片: { this.props.data.station.PoiNum.sum }</div>
                <Button className="conduct" href="/setuser">跳转</Button>
                <BubbleDetail />
            </div>
         );
    }
}
function select(state) {
    return {
        data: state
    };
}
// REDUX STUFF
// Wrap the component to inject dispatch and state into it
export default connect(select)(StationDetailPage);
