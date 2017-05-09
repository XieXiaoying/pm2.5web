import update from 'react/lib/update';
import { LOAD_ALLPOI, LOAD_POIPIC, LOAD_PICNUM, SET_USERFORMAT } from '../constants/AppConstants';
const defaultState = {
    allPoiId: {},
    poiPics: {},
    PoiNum: {},
    setUserFormat: {}
};
function stationReducer(state = defaultState, action) {
    Object.freeze(state); // Don't mutate state directly, always use assign()!
    switch (action.type) {
        case LOAD_ALLPOI:
            const poiTemp = action.poiIds;
            const allPOi = {};
            poiTemp.forEach((item) => {
                allPOi[item.stationID] = item;
            });
            return update(state, { allPoiId: { $merge: allPOi } });
        case LOAD_POIPIC:
            const detailPoi = action.detail;
            const temRes = [];
            const _poiTemp = {};
            console.log(detailPoi);
            Object.keys(detailPoi).forEach((item) => {
                const tempObj = {};
                tempObj.text = item;
                tempObj.count = detailPoi[item];
                temRes.push(tempObj);
            });
            _poiTemp.detail = temRes;
            console.log(_poiTemp);
            return update(state, { poiPics: { $merge: _poiTemp } });
        case SET_USERFORMAT:
            const userTemp = action.userFormat;
            const tempUser = [];
            const _userTemp = {};
            Object.keys(userTemp).forEach((item) => {
                const tempObj = {};
                tempObj.name = item;
                tempObj.picCount = userTemp[item];
                tempUser.push(tempObj);
            });
            _userTemp.detail = tempUser;
            return update(state, { setUserFormat: { $merge: _userTemp } });
        case LOAD_PICNUM:
            const PoiNum = action.num;
            return update(state, { PoiNum: { $merge: PoiNum } });
        default:
            return state;
    }
}
export default stationReducer;
