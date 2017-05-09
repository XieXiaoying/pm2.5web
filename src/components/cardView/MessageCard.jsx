import React, { Component } from 'react';
import './card.styl';
import { Button } from 'react-bootstrap';
export default class MessageCard extends Component {
    constructor(props) {
        super(props);
    }
      render() {
          return (
              <div className="box_card">
                  <h4>新建站点</h4>
                  <div className="content">
                      <span className="force">地点：</span>北京市海淀区西土城路十号
                      <br />
                      <span className="force">时间：</span>2017/1/14
                      <div className="text-center padding">
                          <Button className="">删除</Button>
                          <Button className="btn-cancel">标为未读</Button>
                      </div>
                  </div>
              </div>
          );
      }
}
