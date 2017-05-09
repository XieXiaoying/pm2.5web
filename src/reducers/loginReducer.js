import update from 'react/lib/update';
import { SET_ALERTMESSAGE, SET_CURRENTUSER } from '../constants/AppConstants';
const defaultState = {
    message: '',
    currentUser: {
        username: '',
        email: '',
        role: 'user',
        area: '北京'
    }
};
function loginReducer(state = defaultState, action) {
    Object.freeze(state); // Don't mutate state directly, always use assign()!
    switch (action.type) {
        case SET_ALERTMESSAGE:
            return update(state, { $merge: { message: action.message } });
        case SET_CURRENTUSER:
            return update(state, { currentUser: { $merge: { username: action.username, email: action.email, role: action.role } } });
        default:
            return state;
    }
}
export default loginReducer;
