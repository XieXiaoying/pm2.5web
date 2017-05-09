import React, { Component } from 'react';
// import UserTable from './Table';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0
        };
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
        return (
            <div className="commentBox">
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
            </div>
        );
    }
}

// ReactDOM.render(
//   <  url={'http://localhost:3000/comments'}
//        author={'adele'}
//        perPage={10} />,
//   document.getElementById('react-paginate')
// );
// Which props do we want to inject, given the global state
function select(state) {
    return {
        data: state
    };
}
// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(UserInfo);
