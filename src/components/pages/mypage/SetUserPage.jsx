import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { asyncGetPicNum } from '../../../actions/stationActions';
import Header from '../Header';
import ReactPaginate from 'react-paginate';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './MyPage.styl';
class SetUserPage extends Component {
    constructor(...args) {
        super(...args);
    }
    componentWillMount() {
        this.props.dispatch(asyncGetPicNum.bind(this)(this.props.data.home.currentPic));
    }
    componentDidMount() {
        this.loadCommentsFromServer();
    }
    loadCommentsFromServer() {
        const comments = new Array('Saab', 'Volvo', 'BMW');
        this.setState({ data: comments, pageCount: 1 });// Math.ceil(data.meta.total_count / data.meta.limit)
    }
    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.props.perPage);
        this.setState({ offset: offset }, () => {
            this.loadCommentsFromServer();
        });
    };
    render() {
        function handleRowSelect(row, isSelected, e) {
            console.log(row);
            console.log(isSelected);
            console.log(e);
        }
        const selectRow = {
            mode: 'checkbox',  // multi select
            onSelect: handleRowSelect
        };
        return (
            <div>
                <Header type={window.localStorage.getItem('userType')}/>
                <div id="project-comments" className="commentList">
                    <div className="tableContainer">
                        {this.props.data.station.setUserFormat.detail ? <BootstrapTable data={this.props.data.station.setUserFormat.detail} striped={true} hover={true} selectRow={ selectRow }>
                            <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>用户名称</TableHeaderColumn>
                            <TableHeaderColumn dataField="picCount" dataSort={true}>照片数量</TableHeaderColumn>
                        </BootstrapTable> : null}
                        <ReactPaginate previousLabel={"previous"}
                           nextLabel={"next"}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={this.state.pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"pages pagination"}
                           activeClassName={"active"} />
                        <div className="conduct">
                            <Button className="setAdmin">设为管理员</Button>
                            <Button className="setAdmin">解禁用户</Button>
                            <Button className="setAdmin">禁止上传</Button>
                        </div>
                        </div>
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
// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(SetUserPage);
