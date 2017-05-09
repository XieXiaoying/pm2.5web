import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Row, Col, Nav, NavItem, Button, Collapse, ButtonGroup } from 'react-bootstrap';
import Header from '../Header';
import MyMap from './MyMap';
import AllPointMap from './AllPointMap';
import UserInfo from './UserPage';
// const BMap = window.BMap;
// function changeState() {
//     console.log('test');
//     this.setState({ allpoint: !this.state.allpoint });
// }
class MyPage extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            allpoint: false
        };
    }
    render() {
        console.log(this.state.allpoint);
        return (
            <div>
                <Header type={window.localStorage.getItem('userType')}/>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="clearfix">
                      <Col sm={2}>
                          <ButtonGroup vertical>
                          <Button onClick={ ()=> this.setState({ part1: !this.state.part1 })}>
                            站点
                            {this.state.part1 ? <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> : <span className="glyphicon glyphicon-chevron-down" aria-hidden="false"></span> }
                          </Button>
                          <Collapse in={this.state.part1}>
                              <div>
                                    <Nav bsStyle="pills" stacked>
                                      <NavItem eventKey="first">
                                          各省站点
                                          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                      </NavItem>
                                      <NavItem eventKey="second" onClick={ ()=> { this.setState({ allpoint: !this.state.allpoint }); this.forceUpdate();}}>
                                          所有站点
                                           <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                     </NavItem>
                                    </Nav>
                              </div>
                          </Collapse>
                          <Button onClick={ ()=> this.setState({ part2: !this.state.part2 })}>
                            用户
                            {this.state.part2 ? <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> : <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span> }
                          </Button>
                          <Collapse in={this.state.part2}>
                              <div>
                                    <Nav bsStyle="pills" stacked>
                                      <NavItem eventKey="third">
                                          本周新增用户
                                          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                      </NavItem>
                                      <NavItem eventKey="forth">
                                          所有用户
                                          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                     </NavItem>
                                    </Nav>
                              </div>
                          </Collapse>
                          </ButtonGroup>
                      </Col>
                      <Col sm={8}>
                        <Tab.Content animation>
                          <Tab.Pane eventKey="first">
                            <MyMap />
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <AllPointMap currentState={ this.state.allpoint }/>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <UserInfo />
                          </Tab.Pane>
                          <Tab.Pane eventKey="forth">
                            <UserInfo />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                      <Col sm={2}><div></div></Col>
                    </Row>
                  </Tab.Container>
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
export default connect(select)(MyPage);
