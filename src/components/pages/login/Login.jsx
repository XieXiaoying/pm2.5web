import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { asyncforgetPassword, asyncuserLogin } from '../../../actions/loginActions';
import { Row } from 'react-bootstrap';
import history from 'history';
function _changeType(event) {
    this.setState({ type: event.target.value });
}
function _changeName(event) {
    this.setState({ username: event.target.value });
}
function _changePasswprd(event) {
    this.setState({ password: event.target.value });
}
function _clickToLogin(name, password, type) {
    if (type === 'admin') {
        this.props.dispatch(asyncuserLogin.bind(this)(name, password, 1));
    } else {
        this.props.dispatch(asyncuserLogin.bind(this)(name, password, 0));
    }
}
function _forgetPasseord(type, username) {
    this.props.dispatch(asyncforgetPassword.bind(this)(type, username));
}
function _clickToVisit() {
    history.push('/index');
    window.localStorage.setItem('userType', 'visitor');
}
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            type: 'user'
        };
    }
    render() {
        return (
            <div>
                <section>
                <Row sm={3}>
                    <div className="container">
                    </div>
                </Row>
                    <div>
                        <figure className="preImg">
                            <center><img src={require('../../../img/login.jpg')} alt={'welcome to visit Participantory Sense,there is something wrong with network.'}/></center>
                        </figure>
                    </div>
                    <div>
                        <center>
                        <Form inline>
                            <FormGroup controlId="formInlineName">
                                <FormControl type="text" placeholder="用户名" value={this.state.username} onChange={_changeName.bind(this)}/>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlinePassword">
                                <FormControl type="password" placeholder="密码" value={this.state.password} onChange={_changePasswprd.bind(this)}/>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsSelect" value={this.state.type} onChange={_changeType.bind(this)}>
                                <FormControl componentClass="select" placeholder="user">
                                    { Object.keys(this.props.data.home.userType).map((item) => {
                                        return (
                                            <option value={ item }>{ this.props.data.home.userType[item] }</option>
                                        );
                                    })}
                                </FormControl>
                            </FormGroup>
                            {' '}
                            <Button onClick={() =>{ _clickToLogin.bind(this)(this.state.username, this.state.password, this.state.type); }}>登陆</Button>
                            {' '}
                            <Button onClick={() =>{ _clickToVisit(); }}>访客</Button>
                            {' '}
                            <Button bsStyle="link" onClick={() => { _forgetPasseord.bind(this)(this.state.type, this.state.username);}}>忘记密码</Button>
                          </Form>
                          </center>
                    </div>
                </section>
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
export default connect(select)(LoginPage);
