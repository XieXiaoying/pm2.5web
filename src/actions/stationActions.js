import { LOAD_ALLPOI, SHOW_DELETEPOI, HIDE_DELETEPOI, LOAD_POIPIC, LOAD_PICNUM, SET_USERFORMAT } from '../constants/AppConstants';
import fetch from 'isomorphic-fetch';
import { asyncLoadPicsOfPoi } from './homeActions';
function loadAllPoi(poiIds) {
    return {
        type: LOAD_ALLPOI, poiIds
    };
}
export function showDeletePoi() {
    return {
        type: SHOW_DELETEPOI
    };
}
export function hideDeletePoi() {
    return {
        type: HIDE_DELETEPOI
    };
}
export function asyncLoadAllPois() {
    return (dispatch) => {
        // API
        return fetch('http://182.92.116.126:8080/ps/PMStations?longitude=116.35228&latitude=39.962612&baidu=1', {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                dispatch(loadAllPoi(json.message.stations));
            }
        });
    };
}
export function asyncDeletePoi(poiId) {
    return (dispatch) => {
        // API
        return fetch('http://182.92.116.126:8080/ps/DeleteStation?stations=' + poiId, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                dispatch(asyncLoadAllPois());
            }
        });
    };
}
export function asyncDeletePic(url, currentPic) {
    return (dispatch) => {
        // API
        return fetch('http://182.92.116.126:8080/ps/BatchDeleteImg?url=' + url, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                dispatch(asyncLoadPicsOfPoi(currentPic, 1, 10));
            }
        });
    };
}
export function loadPoiPics(detail) {
    console.log(detail);
    return {
        type: LOAD_POIPIC, detail
    };
}
export function setUserFormat(userFormat) {
    return {
        type: SET_USERFORMAT, userFormat
    };
}
export function setUserInfo(detail) {
    this.props.dispatch(loadPoiPics(detail));
    this.props.dispatch(setUserFormat(detail));
}
export function asyncGetPicNum(stationId) {
    return () => {
        // API
        return fetch('http://182.92.116.126:8080/ps/UserPicCount?staionid=' + stationId, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                setUserInfo.bind(this)(json.message.detail);
            }
        });
    };
}
export function loadPicNum(num) {
    return {
        type: LOAD_PICNUM, num
    };
}
export function asyncLoadPicNum(stationId) {
    return (dispatch) => {
        // API
        return fetch('http://182.92.116.126:8080/ps/SumOfStationPic?staionid=' + stationId, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                dispatch(loadPicNum(json.message));
            }
        });
    };
}
