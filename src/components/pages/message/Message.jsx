import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import './Message.styl';
import MessageCard from '../../cardView/MessageCard';
// import { Navbar } from 'react-bootstrap';
class Message extends Component {
    constructor(props) {
        super(props);
    }
      render() {
          return (
              <div className="box_container">
                  <Header type={window.localStorage.getItem('userType')}/>
                  <div className="box">
                      <MessageCard />
                      <MessageCard />
                      <MessageCard />
                  </div>
              </div>
          );
      }
}
function select(state) {
    return {
        data: state
    };
}
export default connect(select)(Message);
