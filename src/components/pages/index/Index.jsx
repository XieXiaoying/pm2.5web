import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Index.styl';
import PictureWall from './PictureWall';
import Charts from './Charts';
import PsMap from './PsMap';
import Header from '../Header';
import { asyncLoadPicsOfPoi } from '../../../actions/homeActions';
class IndexPage extends Component {
    componentWillMount() {
        this.props.data.home.poiIds.forEach((item) => {
            this.props.dispatch(asyncLoadPicsOfPoi(item, 1, 7));
        });
    }
    render() {
        const height = (document.body.clientHeight - 85) / 2 - 58;
        return (
            <div>
                <Header type={window.localStorage.getItem('userType')}/>
                <div className="flex container">
                    <div className="row-flex">
                        <PsMap />
                        <div style={{ width: '50%', height: height }}><PictureWall /></div>
                    </div>
                    <Charts />
                </div>
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
export default connect(select)(IndexPage);
