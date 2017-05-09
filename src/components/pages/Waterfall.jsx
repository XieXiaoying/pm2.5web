import './waterfall.styl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Body, Footer } from 'react-bootstrap/lib/Modal';
import { Button } from 'react-bootstrap';
import PicCard from '../cardView/PicCard';
import { showDeletePoi } from '../../actions/stationActions';
import { hideWaterfall } from '../../actions/homeActions';
import history from 'history';
function deletePOi() {
    this.props.dispatch(showDeletePoi());
}
function closeWaterfall() {
    this.props.dispatch(hideWaterfall());
}
function poiDetail() {
    this.props.dispatch(hideWaterfall());
    history.push('/detail');
}
class Waterfall extends Component {
    render() {
        return (
          <div className="">
                <Header closeButton>
                    <Title>站点照片墙</Title>
                </Header>
                <Body>
                { this.props.data.home.poiDetail[this.props.data.home.currentPic] ? this.props.data.home.poiDetail[this.props.data.home.currentPic].pics.map((item, index) => {
                    console.log(this.props.data.home.currentPic);
                    return (
                          <PicCard source={item} key={index} currentPic={this.props.data.home.currentPic}/>
                      );
                }) : null }
                </Body>
                <Footer><div className="text-center">
                <Button onClick={() => {poiDetail.bind(this)();}}>站点详情</Button>
                <Button onClick={() => {deletePOi.bind(this)();}}>删除该站点</Button>
                <Button onClick={closeWaterfall.bind(this)}>取消</Button>
                </div></Footer>
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
export default connect(select)(Waterfall);
