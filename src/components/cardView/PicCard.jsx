import React, { Component } from 'react';
import './card.styl';
import { connect } from 'react-redux';
import { asyncDeletePic } from '../../actions/stationActions';
function deletePic(url, currentPic) {
    this.props.dispatch(asyncDeletePic.bind(this)(url, currentPic));
}
class PicCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const resource = this.props.source;
        console.log(resource);
        return (
        <div className="imgBox">
            <div className="box_img">
                <img src={ 'http://182.92.116.126:8080/' + resource.url }/>
                <div>拍摄日期: {resource.time}</div>
                <div>真实PM2.5: {resource.actual_fpm}</div>
                <div>计算PM2.5: {resource.fpm}
                    <span className="glyphicon glyphicon-trash" aria-hidden="true" onClick={() => {deletePic.bind(this)(resource.url, this.props.currentPic);}}></span>
                </div>
            </div>
        </div>
         );
    }
}
export default connect()(PicCard);
