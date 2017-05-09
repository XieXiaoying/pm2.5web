import React, { Component } from 'react';
import { connect } from 'react-redux';
class InfoWindow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>test</h1>
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
export default connect(select)(InfoWindow);
