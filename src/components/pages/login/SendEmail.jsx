import '../modal.styl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Body, Footer } from 'react-bootstrap/lib/Modal';
import Select from 'react-select';
    function _changeAddress(evt) {
        this.setState({ emailAddress: evt.target.value });
    }
class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: ''
        };
    }
    render() {
        return(
            <div className="">
                <Header closeButton>
                    <Title>发送邮件</Title>
                </Header>
                {/* <Body>
                    <Form>
                        <FormGroup>
                            <p>邮箱地址</p>
                            <FormControl className="text-center" type="text" value={this.state.emailAddress} onChange={_changeAddress.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <p>用户类型</p>
                            <Select className="text-center"
                                name={ 'type' }
                                value={ this.state.permissionType }
                                options={ this.getOptions(this.props.data.modalState.currentState.currentType) }
                                onChange={ (evt) => {
                                    const _value = evt ? evt.value : -1;
                                    this.setState({ permissionType: _value });
                                }}
                            />
                        </FormGroup> */}
        ) ;
    }
}