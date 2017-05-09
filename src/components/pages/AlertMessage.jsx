// 登录对话框
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import { Header, Body, Footer } from 'react-bootstrap/lib/Modal';
import { hideAlertModal } from '../../actions/homeActions';
import './modal.styl';
function cancelErrorMsg() {
    this.props.dispatch(hideAlertModal());
}
class AlertMessage extends Component {
    render() {
        return (
            <div className="">
                <Header closeButton>提示信息
                </Header>
                <Body>
                    <Form>
                        <FormGroup controlId="formValidationWarning1" validationState="warning">
                            <ControlLabel>{this.props.data.login.message}</ControlLabel>
                        </FormGroup>
                    </Form>
                </Body>
                <Footer>
                    <Button onClick={cancelErrorMsg.bind(this)}>关闭</Button>
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
export default connect(select)(AlertMessage);
