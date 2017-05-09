import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './Header.styl';
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        localStorage.temp = document.getElementById('hutia').offsetWidth;
    }
      render() {
          return (
            <div>
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/index">参与式感知</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                  { this.props.type === 'visitor' ? null : <Nav pullRight>
                    <NavItem eventKey={1} href="/index">首页</NavItem>
                    <NavItem eventKey={2} href="/mypage">{ window.localStorage.getItem('userName') }的主页</NavItem>
                    <NavItem eventKey={3} href="/message"><img src={require('../../img/conversation.png')}/></NavItem>
                  </Nav> }
                </Navbar.Collapse>
              </Navbar>
                <div style={{ width: '1mm' }} id="hutia"></div>
                </div>
          );
      }
}
// function select(state) {
//     return {
//         data: state
//     };
// }
// export default PsMap;
