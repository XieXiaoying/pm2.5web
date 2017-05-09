import fetch from 'isomorphic-fetch';
import history from 'history';
import { SET_ALERTMESSAGE, SHOW_ALERTMODAL, SET_CURRENTUSER } from '../constants/AppConstants';
export function setAlertMessage(message) {
    return {
        type: SET_ALERTMESSAGE, message
    };
}
export function showAlertModal() {
    return {
        type: SHOW_ALERTMODAL
    };
}
export function setCurrentUser(username, email, role) {
    return {
        type: SET_CURRENTUSER, username, email, role
    };
}
export function messageAlert(message) {
    this.props.dispatch(setAlertMessage(message));
    this.props.dispatch(showAlertModal());
}
export function asyncuserLogin(userName, passWord, role) {
    let req = '';
    if (role === 0) {
        req = 'http://182.92.116.126:8080/ps/user/login?userName=' + userName + '&passWord=' + passWord + '&role=' + role;
    } else {
        req = 'http://182.92.116.126:8080/ps/admin/login?userName=' + userName + '&passWord=' + passWord;
    }
    return (dispatch) => {
        // API
        return fetch(req, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                if (role === 0) {
                    window.localStorage.setItem('userName', userName);
                    window.localStorage.setItem('userType', 'user');
                    dispatch(setCurrentUser(userName, '', 'user'));
                } else {
                    window.localStorage.setItem('userName', json.message.username);
                    window.localStorage.setItem('userType', json.message.role);
                    dispatch(setCurrentUser(json.message.username, json.message.email, json.message.role));
                }
                history.push('/index');
            } else {
                messageAlert.bind(this)(json.message);
            }
        });
    };
}
export function asyncforgetPassword(role, userName) {
    return () => {
        // API
        return fetch('http://182.92.116.126:8080/ps/sendEmail?userName=' + userName + '&role=' + role, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                messageAlert.bind(this)('邮件已发送，请到邮箱查阅');
            } else {
                messageAlert.bind(this)(json.message);
            }
        });
    };
}
