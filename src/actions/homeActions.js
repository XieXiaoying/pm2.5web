import { LOAD_POIDERAIL, SHOW_WATERFALL, HIDE_WATERFALL, SET_CURRENTPIC, HIDE_ALERTMODAL, SHOW_ALERTMODAL } from '../constants/AppConstants';
import fetch from 'isomorphic-fetch';

export function loadPoiDetai(poiIds, detail) {
    return {
        type: LOAD_POIDERAIL, poiIds, detail
    };
}
export function showWaterfall() {
    return {
        type: SHOW_WATERFALL
    };
}
export function asyncLoadPicsOfPoi(poiIds, beginNum, count) {
    return (dispatch) => {
        // API
        return fetch('http://182.92.116.126:8080/ps/PMStationDetail?stationID=' + poiIds + '&beginNum=' + beginNum + '&count=' + count, {
            method: 'POST'
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.stateCode === '000') {
                console.log(json);
                dispatch(loadPoiDetai(poiIds, json.message));
            }
        });
    };
}
export function hideWaterfall() {
    return {
        type: HIDE_WATERFALL
    };
}
export function setCurrentPic(poiID) {
    return {
        type: SET_CURRENTPIC, poiID
    };
}
export function showAlertModal() {
    return {
        type: SHOW_ALERTMODAL
    };
}
export function hideAlertModal() {
    return {
        type: HIDE_ALERTMODAL
    };
}
// export function asyncLoadPicNum() {
//     return (dispatch) => {
//         // API
//         return fetch('http://182.92.116.126:8080/ps/PMStationDetail?stationID=' + poiIds + '&beginNum=' + beginNum + '&count=' + count, {
//             method: 'POST'
//         }).then(response => {
//             return response.json();
//         }).then(json => {
//             if (json.stateCode === '000') {
//                 console.log(json);
//                 dispatch(loadPoiDetai(poiIds, json.message));
//             }
//         });
//     };
// }
