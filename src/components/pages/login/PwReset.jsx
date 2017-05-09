import React, { Component } from 'react';
import { connect } from 'react-redux';
class PwResetPage extends Component {
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
            <div></div>
        );
    }
}
// Which props do we want to inject, given the global state
function select(state) {
    return {
        data: state
    };
}


// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(PwResetPage);
