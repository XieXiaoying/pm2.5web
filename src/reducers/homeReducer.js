/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */
import update from 'react/lib/update';
import { LOAD_POIDERAIL, SHOW_WATERFALL, HIDE_WATERFALL, SET_CURRENTPIC, SHOW_ALERTMODAL, HIDE_ALERTMODAL, HIDE_DELETEPOI, SHOW_DELETEPOI } from '../constants/AppConstants';
const defaultState = {
    id: 'location',
    poiIds: [
        '1530028288', '1514698720', '904738673', '1526693698', '1515942832', '1549445234'
    ],
    poiDetail: {},
    poiAddress: {
        '1530028288': { 'lon': 116.456337, 'lat': 40.004158, 'blon': 116.46914610023, 'blat': 40.011163206192, 'address': '北京市朝阳区河荫西路' },
        '1514698720': { 'lon': 116.353172, 'lat': 39.962952, 'blon': 116.36593769761, 'blat': 39.970137790954, 'address': '北京市海淀区西土城路' },
        '904738673': { 'lon': 116.45613888888889, 'lat': 40.005383333333334, 'blon': 116.46894759526, 'blat': 40.01239399137, 'address': '北京市朝阳区利泽西二路' },
        '1526693698': { 'lon': 116.350037, 'lat': 39.962296, 'blon': 116.36281158486, 'blat': 39.969422316791, 'address': '北京市海淀区西土城路' },
        '1515942832': { 'lon': 116.455513, 'lat': 40.006062, 'blon': 116.46831869144, 'blat': 40.013068066397, 'address': '北京市朝阳区利泽西二路' },
        '1549445234': { 'lon': 116.352592, 'lat': 39.959904, 'blon': 116.36535806361, 'blat': 39.967072299136, 'address': '北京市海淀区杏坛路' }
    },
    modalshow: {
        showWaterfall: false,
        showAlertmodal: false,
        showDeletePoi: false
    },
    currentPic: '1530028288',
    userType: {
        'user': '客户端用户',
        'admin': '管理员'
    }
};
function homeReducer(state = defaultState, action) {
    Object.freeze(state); // Don't mutate state directly, always use assign()!
    switch (action.type) {
        case LOAD_POIDERAIL:
            const poiTemp = {};
            poiTemp[action.poiIds] = action.detail;
            return update(state, { poiDetail: { $merge: poiTemp } });
        // ==========================reducers of registerpage part====================== xiexiaoying 2016.6.28
        case SHOW_WATERFALL:
            return update(state, { modalshow: { $merge: { showWaterfall: true } } });
        case HIDE_WATERFALL:
            return update(state, { modalshow: { $merge: { showWaterfall: false } } });
        case SHOW_ALERTMODAL:
            return update(state, { modalshow: { $merge: { showAlertmodal: true } } });
        case HIDE_ALERTMODAL:
            return update(state, { modalshow: { $merge: { showAlertmodal: false } } });
        case SET_CURRENTPIC:
            return update(state, { $merge: { currentPic: action.poiID } });
        case SHOW_DELETEPOI:
            return update(state, { modalshow: { $merge: { showDeletePoi: true } } });
        case HIDE_DELETEPOI:
            return update(state, { modalshow: { $merge: { showDeletePoi: false } } });
        default:
            return state;
    }
}
export default homeReducer;
