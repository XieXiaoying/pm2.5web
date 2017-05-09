import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-bootstrap';
import './Index.styl';
// import { Item, Caption } from 'react-bootstrap/lib/Carousel';
import { showWaterfall, setCurrentPic } from '../../../actions/homeActions';// asyncLoadPicsOfPoi,
import '../../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
class PictureWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            point: null
        };
    }
    // componentWillUnmount() {
    //     const img = document.getElementsByTagName('img');
    //     img.forEach((item) => {
    //         item.onload = function() {
    //             this.width = (document.body.clientHeight - 85) / 2 - 58;
    //         };
    //     });
    // }
    _imageOnclick(value, i) {
        let poiID = 0;
        Object.keys(this.props.data.home.poiDetail).map((item, index) => {
            if (index === i.state.currentIndex) {
                poiID = item;
            }
        });
        // this.props.dispatch(asyncLoadPicsOfPoi(poiID, 1, 12));
        this.props.dispatch(showWaterfall());
        this.props.dispatch(setCurrentPic(poiID));
    }
    render() {
        //         original: 'http://lorempixel.com/500/300/nature/1/',
        //         thumbnail: 'http://lorempixel.com/250/150/nature/1/'
        const images = [];
        Object.keys(this.props.data.home.poiDetail).map((item) => {
            let picRes = {
                original: '',
                thumbnail: ''
            };
            this.props.data.home.poiDetail[item].pics[0].height = (document.body.clientHeight - 85) / 2 - 58;
            picRes.original = 'http://182.92.116.126:8080/' + this.props.data.home.poiDetail[item].pics[0].url;
            picRes.thumbnail = 'http://182.92.116.126:8080/' + this.props.data.home.poiDetail[item].pics[0].url;
            images.push(picRes);
            picRes = {
                original: '',
                thumbnail: ''
            };
        });
        // console.log(this.props.data.home.poiDetail);
        // return (
        //     <Carousel className="have-header" controls={config.controls} width={ document.getElementById('app').offsetWidth / 2 } height={ document.getElementById('app').offsetHeight / 2 }>
        //     { Object.keys(this.props.data.home.poiDetail).map((item, index) => {
        //         return (
        //             <Item key={index + ''}>
        //             <img src={'http://182.92.116.126:8080/' + this.props.data.home.poiDetail[item].pics[0].url} width={ document.getElementById('app').offsetWidth / 2 } height={ document.getElementById('app').offsetHeight / 2 }/>
        //             <Caption>
        //                 <p>官方PM2.5：{this.props.data.home.poiDetail[item].pics[0].fpm}</p>
        //                 <p>计算得出PM2.5：{this.props.data.home.poiDetail[item].pics[0].actual_fpm}</p>
        //             </Caption>
        //         </Item>
        //         );
        //     }) }
        //     </Carousel>
        // );
        return (
            <div style = {{ height: '100%', width: '100%' }} overflow="hidden">
              <ImageGallery
                ref={i => this._imageGallery = i}
                items={images}
                slideInterval={2000}
                autoPlay = {false}
                lideOnThumbnailHover = {true}
                onClick={ (evt) => { this._imageOnclick.bind(this)(evt, this._imageGallery); } }
                overflow="hidden"/>
                </div>
        );
    }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}


// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(PictureWall);
