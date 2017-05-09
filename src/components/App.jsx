/**
 * @file 所有页面的入口, 不处理实际业务
 * @author ,
 * Mar 30, 2016
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Waterfall from './pages/Waterfall';
import AlertMessage from './pages/AlertMessage';
import DeletePoi from'./pages/mypage/DeletePoi';
import './App.styl';
import 'react-dropzone-component/styles/filepicker.css';
import { hideWaterfall, hideAlertModal } from '../actions/homeActions';
import { hideDeletePoi } from '../actions/stationActions';
// import '../../node_modules/dropzone/dist/min/dropzone.min.css';
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { ClickToHideWaterfall, ClickToHideAlert, ClickToHideDeletePoi } = this.props;
        const { home } = this.props.data;
        return (
            <div>
                <div className="wrapper">
                    { this.props.children }
                </div>
                <div>
                    <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={ home.modalshow.showWaterfall } onHide={ ClickToHideWaterfall }>
                        <Waterfall />
                    </Modal>
                    <Modal className="modal-m" show={ home.modalshow.showAlertmodal } onHide={ ClickToHideAlert }>
                        <AlertMessage />
                    </Modal>
                    <Modal className="modal-m" show={ home.modalshow.showDeletePoi } onHide={ ClickToHideDeletePoi }>
                        <DeletePoi />
                    </Modal>
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

function mapdispatch(dispatch) {
    return {
        ClickToHideWaterfall: () => dispatch(hideWaterfall()),
        ClickToHideAlert: () => dispatch(hideAlertModal()),
        ClickToHideDeletePoi: () => dispatch(hideDeletePoi()),
        dispatch: action => dispatch(action)
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select, mapdispatch)(App);
