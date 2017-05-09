/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const LOAD_POIDERAIL = 'LOAD_POIDERAIL';
export const SHOW_WATERFALL = 'SHOW_WATERFALL';
export const HIDE_WATERFALL = 'HIDE_WATERFALL';
export const SET_CURRENTPIC = 'SET_CURRENTPIC';
export const SET_ALERTMESSAGE = 'SET_ALERTMESSAGE';
export const SHOW_ALERTMODAL = 'SHOW_ALERTMODAL';
export const HIDE_ALERTMODAL = 'HIDE_ALERTMODAL';
export const SET_CURRENTUSER = 'SET_CURRENTUSER';
export const LOAD_ALLPOI = 'LOAD_ALLPOI';
export const SHOW_DELETEPOI = 'SHOW_DELETEPOI';
export const HIDE_DELETEPOI = 'HIDE_DELETEPOI';
export const LOAD_POIPIC = 'LOAD_POIPIC';
export const LOAD_PICNUM = 'LOAD_PICNUM';
export const SET_USERFORMAT = 'SET_USERFORMAT';
// 连接服务器  2016.6.15
const SERVER_MODE = 'LOCAL';
const SERVER_MAP = {
    LOCAL: 'http://localhost:8080'
};
export const APISEVER = {
    /* 连接本地服务器，请取消以下注释 */
    apiServer: SERVER_MAP[SERVER_MODE] + '/dbc/api/'
};
