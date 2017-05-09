// 格式化Doclist， 宋鹏程 2016/06/26
import assignToEmpty from 'utils/assign';
import { LANG } from 'constants/Lang';
import moment from 'moment';
export const formatCharts = (sourceList, address) => {
    let insert = {
        'name': '',
        'data': [null, null, null, null, null, null, null]
    };
    const outFlow = {
        'series': []
    };
    let week = new Date().getDay();
    if (week === 0) {
        week = 7;
    }
    const date = new Date().getTime();
    Object.keys(sourceList).map((item, index) => {
        insert.name = address[item].address;
        if (parseInt((date - new Date(sourceList[item].pics[0].time)) / (24 * 60 * 1000 * 60), 10) < 7) {
            sourceList[item].pics.forEach((count) => {
                if (parseInt((date - new Date(count.time)) / (24 * 60 * 1000 * 60), 10) < week) {
                    insert.data[week - parseInt((date - new Date(count.time)) / (24 * 60 * 1000 * 60), 10) - 1] = count.fpm;
                }
            });
            outFlow.series[index] = insert;
        } else {
            outFlow.series[index] = insert;
        }
        insert = {
            'name': '',
            'data': [null, null, null, null, null, null, null]
        };
    });
    return outFlow.series;
};
export const formatColor = (sourceList) => {
    let colorIndex = 6;
    const date = new Date().getTime();
    if (parseInt((date - new Date(sourceList.time)) / (24 * 60 * 1000 * 60), 10) === 0 && sourceList.actual_fpm !== -1) {
        colorIndex = parseInt((sourceList.actual_fpm / 50), 10);
        if ((colorIndex > 3) && (colorIndex < 6)) {
            colorIndex = 4;
        }
        if (colorIndex > 5) {
            colorIndex = 5;
        }
    }
    return colorIndex;
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const formatDoclist = (sourceList) => {
    if ((!sourceList.values) || (sourceList.values.length === 0)) {
        return [];
    }
    // get fields for docs
    const fieldList = sourceList.fields.reduce( (mono, field) => {
        if (field.prop && ((field.prop.prior_view) || field.type === 'name')) {
            mono[field.fid] = field;
        }
        return mono;
    }, {});
    // for each doc in list
    const docList = sourceList.values.map( (row) => {
        const tempDoc = {
            fav: false,
            rank: row.prop.rank,
            orderkey: row.prop.orderkey,
            id: row.prop.id
        };
        // for each position in view
        row.value.forEach((value) => {
            if (fieldList[value.fid]) {
                const key = fieldList[value.fid].type + value.fid;
                let tempValue = '';
                switch (fieldList[value.fid].type) {
                    case 'name':
                    case 'text':
                    case 'textarea':
                    case 'link':
                    case 'number':
                        tempValue = value.value.join(' , ');
                        break;
                    case 'doc_img':
                    case 'image':
                        tempValue = value.value[0];
                        break;
                    case 'selectbox':
                    case 'checkbox':
                    case 'radio':
                        tempValue = value.value.map( (val) => {
                            let opt = '';
                            fieldList[value.fid].prop.value_list.forEach( (option) => {
                                if (val === option.val) {
                                    opt = option[LANG];
                                }
                            } );
                            return opt;
                        } ).join(' , ');
                        break;
                    case 'date':
                        tempValue = moment(value.value[0]).format('YYYY年M月DD日');
                        break;
                    case 'ref_doc':
                        tempValue = value.value.map( (_val) => _val[0].value[0]).join(' , ');
                        break;
                    default:
                        tempValue = '不支持的字段类型';
                }
                tempDoc[key] = tempValue;
            }
        });
        return tempDoc;
    } );
    return docList;
};

// 不同类型的默认值的默认值
const defaultValueMap = {
    'date': 0,
    'doc_img': '',
    'link': '',
    'name': '',
    'radio': -1,
    'ref_id': '',
    'selectbox': -1,
    'text': '',
    'textarea': '',
    'toggle': true
};

// 将field变为schema
const parseFieldToSchema = (field) => {
    const v = {
        fid: field.fid,
        prop: field.prop,
        type: field.type
    };
    if (field.fields) {
        v.fields = field.fields;
    }
    v.prop.description = v.prop.description ? v.prop.description[LANG] : '';
    v.prop.placeholder = v.prop.placeholder ? v.prop.placeholder[LANG] : '';
    v.prop.info = v.prop.info ? v.prop.info[LANG] : '';
    v.name = field.name[LANG];
    v.value = [];
    if (field.fields) {
        v.value[0] = [];
        field.fields.forEach( (_field) => {
            v.value[0].push(parseFieldToSchema(_field));
        });
    } else {
        if (field.prop.default_value !== undefined) {
            if (field.prop.default_value[LANG]) {
                v.value.push(field.prop.default_value[LANG]);
            } else {
                v.value.push(field.prop.default_value);
            }
        } else if (defaultValueMap[field.type] !== undefined) {
            v.value.push(defaultValueMap[field.type]);
        }
    }
    return v;
};

// 递归解析每个field成Data
const parseFieldToData = (field) => {
    const v = {
        fid: field.fid
    };
    if (field.fields) {
        v.value = [];
        v.value[0] = [];
        field.fields.forEach( (_field) => {
            v.value[0].push(parseFieldToData(_field));
        });
    } else {
        v.value = [];
        v.value[0] = field.prop.default_value ? field.prop.default_value : '';
    }
    return v;
};

// 递归解析每个schema成Data
const parseSchemaToData = (field) => {
    const v = {};
    v.fid = field.fid;
    v.value = [];
    for (let a = 0; a < field.value.length; a++) {
        if (field.type === 'combo' || field.type === 'ref_selectbox' || field.type === 'address' || field.type === 'loose_date' || field.type === 'ref_doc') {
            v.value[a] = [];
            for (let f = 0; f < field.value[a].length; f++) {
                v.value[a].push(parseSchemaToData(field.value[a][f]));
            }
        } else if (field.type === 'name' || field.type === 'text' || field.type === 'textarea') {
            v.value[a] = {};
            if (field.prop.trans_type === 'trans') {
                v.value[a][LANG] = field.value[a];
            } else if (field.prop.trans_type === 'uni') {
                v.value[a].uni = field.value[a];
            } else {
                v.value[a][LANG] = field.value[a];
            }
        } else if (field.type === 'doc_img' || field.type === 'ref_id' || field.type === 'link' || field.type === 'splitter' || field.type === 'toggle' || field.type === 'image') {
            v.value.push(field.value[a]);
        } else if (field.type === 'number' || field.type === 'radio' || field.type === 'selectbox' || field.type === 'checkbox' || field.type === 'date') {
            if (typeof field.value[a] === 'number') {
                v.value.push(field.value[a]);
            } else {
                v.value.push(Number(field.value[a]));
            }
        }
    }
    return v;
};

export const formToSchema = (form) => {
    const schema = {};
    schema.description = form.description[LANG];
    schema.info = form.info[LANG];
    schema.formid = form.id;
    schema.value = [];
    for (let f = 0; f < form.fields.length; f++ ) {
        schema.value.push(parseFieldToSchema(form.fields[f]));
    }
    return schema;
};

const parseEditFieldToData = (field, val) => {
    switch (field.fid) {
        case 1000:
            if (!val.name) {
                val.name = {};
            }
            val.name[LANG] = field.value[0];
            break;
        case 1010:
            if (!val.prop.description) {
                val.prop.description = {};
            }
            val.prop.description[LANG] = field.value[0];
            break;
        case 1020:
            if (!val.prop.info) {
                val.prop.info = {};
            }
            val.prop.info[LANG] = field.value[0];
            break;
        case 1100:
            if (!val.prop.placeholder) {
                val.prop.placeholder = {};
            }
            val.prop.placeholder[LANG] = field.value[0];
            break;
        case 1120:
            val.prop.default_value = field.value[0];
            break;
        case 2000:
            val.prop.required = field.value[0];
            break;
        case 2010:
            val.prop.uniqueness = field.value[0];
            break;
        case 2020:
            val.prop.sub_type = field.value[0];
            break;
        case 2030:
            val.prop.filter_enable = field.value[0];
            break;
        case 2041:
            if (field.value[0] === 0) {
                val.prop.trans_type = 'trans';
            } else {
                val.prop.trans_type = 'uni';
            }
            break;
        case 2070:
            val.prop.number_type = field.value[0] ? 'float' : 'int';
            break;
        case 2100:
            val.prop.prior_view = field.value[0];
            break;
        case 2201:
            val.prop.min_record = field.value[0];
            break;
        case 2202:
            val.prop.max_record = field.value[0];
            break;
        case 2310:
            val.prop.word_length = field.value[0];
            break;
        case 2311:
            val.prop.min_length = field.value[0];
            break;
        case 2312:
            val.prop.max_length = field.value[0];
            break;
        case 3000:
            val.prop.file_type = field.value[0];
            break;
        case 3011:
            val.prop.min_file_size = field.value[0];
            break;
        case 3012:
            val.prop.max_file_size = field.value[0];
            break;
        case 3301:
            val.prop.postcode_invisible = field.value[0];
            break;
        case 3302:
            val.prop.coordinate_invisible = field.value[0];
            break;
        case 5010:
            val.prop.value_list = [];
            for (let i = 0; i < field.value.length; i++) {
                const emu = {};
                emu.val = field.value[i][0].value[0];
                emu[LANG] = field.value[i][1].value[0];
                val.prop.value_list.push(emu);
            }
            break;
        case 4000:
            for (let k = 0; k < field.value[0].length; k++) {
                switch (field.value[0][k].fid) {
                    case 4100:
                        if (field.value[0][k].value.length > 0) {
                            val.prop.target_base = field.value[0][k].value[0];
                        } else {
                            val.prop.target_base = '';
                        }
                        break;
                    case 4110:
                        if (field.value[0][k].value.length > 0) {
                            val.prop.target_dir = field.value[0][k].value[0];
                        } else {
                            val.prop.target_dir = '';
                        }
                        break;
                    case 4120:
                        val.prop.target_filter = field.value[0][k].value[0];
                        break;
                    case 4130:
                        val.prop.target_field = field.value[0][k].value[0];
                        break;
                    default:
                }
            }
            break;
        case 4201:
            val.prop.min_level = field.value[0];
            break;
        case 4202:
            val.prop.max_level = field.value[0];
            break;
        case 4300:
            val.fields = [];
            for (let k = 0; k < field.value.length; k++) {
                const tempField = {
                    'fid': 0,
                    'name': { 'zh': '' },
                    'type': 'ref_id',
                    'prop': {
                        'required': false,
                        'value_type': 'string',
                        'filter_enable': true,
                        'trans_type': 'uni',
                        'max_record': 1,
                        'ref_type': 'dir',
                        'target_base': '',
                        'target_dir': ''
                    }
                };
                tempField.fid = val.fid * 100 + k + 1;
                tempField.name[LANG] = field.value[k];
                tempField.prop.target_base = val.prop.target_base;
                if (k === 0) {
                    tempField.prop.target_dir = val.prop.target_dir;
                } else {
                    tempField.prop.target_dir = '_RIC' + val.fields[k - 1].fid;
                }
                val.fields.push(tempField);
            }
            break;
        default:
    }
    return;
};

const parseEditFieldToSchema = (field, val) => {
    const v = {};
    v.fid = field.fid;
    v.prop = field.prop;
    v.type = field.type;
    v.name = field.name[LANG];
    v.prop.description = v.prop.description ? v.prop.description[LANG] : '';
    v.prop.placeholder = v.prop.placeholder ? v.prop.placeholder[LANG] : '';
    v.prop.info = v.prop.info ? v.prop.info[LANG] : '';
    if (field.fields) {
        v.fields = field.fields;
    }
    switch (v.fid) {
        case 1000:
            v.value = [(val.name ? val.name[LANG] : (field.prop.default_value || ''))];
            break;
        case 1010:
            v.value = [(val.prop.description ? val.prop.description[LANG] : (field.prop.default_value || ''))];
            break;
        case 1020:
            v.value = [(val.prop.info ? val.prop.info[LANG] : (field.prop.default_value || ''))];
            break;
        case 1100:
            v.value = [(val.prop.placeholder ? val.prop.placeholder[LANG] : (field.prop.default_value || ''))];
            break;
        case 1120:
            if (val.prop.default_value !== undefined ) {
                v.value = [val.prop.default_value];
            } else {
                v.value = [];
            }
            break;
        case 2000:
            v.value = [(val.prop.required || field.prop.default_value || false)];
            break;
        case 2010:
            v.value = [(val.prop.uniqueness || field.prop.default_value || false)];
            break;
        case 2020:
            v.value = [(val.prop.sub_type || field.prop.default_value || 'string')];
            break;
        case 2030:
            v.value = [(val.prop.filter_enable || field.prop.default_value || false)];
            break;
        case 2041:
            v.value = [((val.prop.trans_type === 'trans') ? 0 : 1)];
            break;
        case 2070:
            if (val.prop.number_type === 'float') {
                v.value = [1];
            } else {
                v.value = [0];
            }
            break;
        case 2100:
            v.value = [(val.prop.prior_view || field.prop.default_value || false)];
            break;
        case 2201:
            v.value = [(val.prop.min_record || field.prop.default_value || 0)];
            break;
        case 2202:
            v.value = [(val.prop.max_record || field.prop.default_value || 0)];
            break;
        case 2310:
            v.value = [(val.prop.word_length || field.prop.default_value || 0)];
            break;
        case 2311:
            v.value = [(val.prop.min_length || field.prop.default_value || 0)];
            break;
        case 2312:
            v.value = [(val.prop.max_length || field.prop.default_value || 0)];
            break;
        case 3000:
            v.value = [(val.prop.file_type || field.prop.default_value || '')];
            break;
        case 3011:
            v.value = [(val.prop.min_file_size || field.prop.default_value || 0)];
            break;
        case 3012:
            v.value = [(val.prop.max_file_size || field.prop.default_value)];
            break;
        case 3301:
            v.value = [(val.prop.postcode_invisible || field.prop.default_value || true)];
            break;
        case 3302:
            v.value = [(val.prop.coordinate_invisible || field.prop.default_value || true)];
            break;
        case 5010:
            v.value = [];
            for (let i = 0; i < val.prop.value_list.length; i++) {
                const combo = [];
                combo.push({
                    fid: field.fields[0].fid,
                    prop: field.fields[0].prop,
                    value: [val.prop.value_list[i].val],
                    type: field.fields[0].type,
                    name: field.fields[0].name[LANG]
                });
                combo.push({
                    fid: field.fields[1].fid,
                    prop: field.fields[1].prop,
                    value: [val.prop.value_list[i][LANG]],
                    type: field.fields[1].type,
                    name: field.fields[1].name[LANG]
                });
                v.value.push(combo);
            }
            break;
        case 4000:
            v.value = [];
            const combo = [];
            for (let k = 0; k < field.fields.length; k++) {
                const tempField = {
                    fid: field.fields[k].fid,
                    prop: field.fields[k].prop,
                    type: field.fields[k].type,
                    name: field.fields[k].name[LANG]
                };
                switch (field.fields[k].fid) {
                    case 4100:
                        if (val.prop.target_base) {
                            tempField.value = [val.prop.target_base];
                        } else {
                            tempField.value = [];
                        }
                        break;
                    case 4110:
                        if (val.prop.target_dir) {
                            tempField.value = [val.prop.target_dir];
                        } else {
                            tempField.value = [];
                        }
                        break;
                    case 4120:
                        tempField.value = [val.prop.target_filter || 1];
                        break;
                    case 4130:
                        tempField.value = [val.prop.target_field || 1];
                        break;
                    default:
                        break;
                }
                combo.push(tempField);
            }
            v.value.push(combo);
            break;
        case 4201:
            v.value = [(val.prop.min_level || field.prop.default_value || 0)];
            break;
        case 4202:
            v.value = [(val.prop.max_level || field.prop.default_value || 5)];
            break;
        case 4300:
            v.value = [];
            if (val.fields) {
                for (let k = 0; k < val.fields.length; k++) {
                    v.value.push(val.fields[k].name[LANG]);
                }
            }
            break;
        default:
            v.value = [''];
    }
    return v;
};

export const fieldFormToSchema = (form, val) => {
    const schema = {};
    schema.description = form.description[LANG];
    schema.info = form.info[LANG];
    schema.formid = form.id;
    schema.value = [];
    for (let f = 0; f < form.fields.length; f++ ) {
        schema.value.push(parseEditFieldToSchema(form.fields[f], val));
    }
    return schema;
};

export const fieldSchemaToData = (schema, val) => {
    const _val = assignToEmpty(val);
    for (let f = 0; f < schema.value.length; f++ ) {
        parseEditFieldToData(schema.value[f], _val);
    }
    return _val;
};

export const comboToSchema = (fields) => {
    const schema = [];
    for (let f = 0; f < fields.length; f++ ) {
        schema.push(parseFieldToSchema(fields[f]));
    }
    return schema;
};

export const comboToData = (fields) => {
    const data = [];
    for (let f = 0; f < fields.length; f++ ) {
        data.push(parseSchemaToData(fields[f]));
    }
    return data;
};

export const schemaToData = (schema) => {
    const data = { value: [] };
    for (let i = 0; i < schema.value.length; i++) {
        data.value.push(parseSchemaToData(schema.value[i]));
    }
    return data;
};

export function addOrgUserlist(sourceList) {
    const List = {
        Title: {
            username: '用户名',
            nickname: '昵称',
            photo: '头像',
            synopsis: '简介'
        },
        userList: []
    };
    if (sourceList === undefined) {
        return List;
    } else if (sourceList.values.length === 0) {
        return List;
    }
    // const userList = [];
    List.userList = sourceList.values.map( (user) => {
        const _user = {};
        Object.keys(List.Title).forEach( (key) => {
            _user[key] = user[key];
        });
        _user.uid = user.id;
        return _user;
    });
    return List;
}

export function formatOrgUserlist(sourceList) {
    const userTypeMap = {
        0: '不是组织成员',
        1: '普通成员',
        2: '管理员',
        3: '管理员'
    };
    const List = {
        Title: {
            username: '用户名',
            nickname: '昵称',
            photo: '头像',
            userType: '组织成员类型',
            uid: 'uid'
        },
        userList: []
    };
    if (sourceList === undefined) {
        return List;
    } else if (sourceList.values.length === 0) {
        return List;
    }
    // const userList = [];
    List.userList = sourceList.values.map( (user) => {
        const _user = {};
        Object.keys(List.Title).forEach( (key) => {
            _user[key] = user[key];
        });
        _user.userType = userTypeMap[_user.userType];
        return _user;
    });
    return List;
}
export function formatUserAdmin(sourceList) {
    const List = {
        userList: []
    };
    if (sourceList === {}) {
        return List;
    } else if (sourceList.values.length === 0) {
        return List;
    }
    List.userList = sourceList.values.map( (user) => {
        const _user = {};
        _user[user.uid] = user.userType;
        return _user;
    });
    return List;
}
export function formatMydata(mydata) {
    const List = {
        Title: {
            name: '名称',
            'docImg': '图标',
            creatorName: '创建者',
            type: '类型',
            id: 'id'
        },
        myData: []
    };
    if (mydata === {}) {
        return List;
    } else if (mydata.values.length === 0) {
        return List;
    }
    List.myData = mydata.values.map((key) => {
        const mydataTemp = {};
        Object.keys(List.Title).forEach( (item) => {
            mydataTemp[item] = key.prop[item];
        });
        mydataTemp.id = key.id;
        mydataTemp.type = key.type;
        return mydataTemp;
    });
    return List;
}
export function formatTempSet(tempSetList) {// keyila
    const List = {
        Title: {
            name: '名称',
            image: '图标',
            creatorName: '创建者',
            description: '简介',
            id: 'id'
        },
        tempSet: []
    };
    if (tempSetList === undefined) {
        return List;
    } else if (!tempSetList.values) {
        return List;
    }
    List.tempSet = tempSetList.values.map((key) => {
        const _tempSetList = {};
        Object.keys(List.Title).forEach((item) => {
            _tempSetList[item] = key.prop[item];
        });
        _tempSetList.image = key.value[1].value[0];
        _tempSetList.name = key.value[0].value[0];
        _tempSetList.description = key.value[2].value[0];
        return _tempSetList;
    });
    return List;
}
function filterid(value) {
    let flag = true;
    if (this.props.data.setInfo.setbases.values) {
        this.props.data.setInfo.setbases.values.forEach((point) => {
            if (point.prop.id === value.id) {
                flag = false;
            }
        });
    }
    if (flag) return value;
}
export function formatAddMyBase(baseList) {// keyila
    const List = {
        Title: {
            docImg: '图标',
            name: '名称',
            id: 'id',
            description: '简介'
        },
        baseList: []
    };
    if (!baseList.info) {
        return List;
    } else if (baseList.values.length === 0) {
        return List;
    }
    List.baseList = baseList.values.map((key) => {
        const mybaseTemp = {};
        Object.keys(List.Title).forEach( (item) => {
            mybaseTemp[item] = key.prop[item];
        });
        mybaseTemp.id = key.id;
        return mybaseTemp;
    });
    List.baseList = List.baseList.filter(filterid.bind(this));
    return List;
}
export function formatRemoveBase(baseList) {
    const List = {
        Title: {
            name: '名称',
            docImg: '图标',
            id: 'id',
            description: '简介'
        },
        baseList: []
    };
    if (baseList === {}) {
        return List;
    } else if (baseList.values.length === 0) {
        return List;
    }
    List.baseList = baseList.values.map((key) => {
        const mybaseTemp = {};
        Object.keys(List.Title).forEach( (item, index) => {
            mybaseTemp[item] = key.value[index].value[0];
        });
        mybaseTemp.id = key.prop.id;
        return mybaseTemp;
    });
    return List;
}
export default formatDoclist;
