// 登录对话框
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import { Header, Body, Footer } from 'react-bootstrap/lib/Modal';
import { hideDeletePoi, asyncDeletePoi } from '../../../actions/stationActions';
import { hideWaterfall } from '../../../actions/homeActions';
import '../modal.styl';
function closeWindow() {
    this.props.dispatch(hideDeletePoi());
}
function deletePoi(poiId) {
    console.log(poiId);
    this.props.dispatch(asyncDeletePoi.bind(this)(poiId));
    this.props.dispatch(hideDeletePoi());
    this.props.dispatch(hideWaterfall());
}
class DeletePoi extends Component {
    render() {
        return (
            <div className="">
                <Header closeButton>站点删除
                </Header>
                <Body>
                    <Form>
                        <FormGroup controlId="formValidationWarning1" validationState="warning">
                            <ControlLabel>{'删除站点将会把站点和照片一起一起删除，您确定删除吗?'}</ControlLabel>
                        </FormGroup>
                    </Form>
                </Body>
                <Footer>
                    <Button onClick={() => {deletePoi.bind(this)(this.props.data.home.currentPic);}}>删除</Button>
                    <Button onClick={closeWindow.bind(this)}>关闭</Button>
                </Footer>
            </div>
        );
    }
}
// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(DeletePoi);
