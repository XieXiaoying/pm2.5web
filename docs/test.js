localpath.value.map((item) => {
    switch (item.fid) {
        case 1:
            this.state.name = item.value[0];
            break;
        case 2:
            this.state.photo = item.value[0];
            break;
        case 4:
            this.state.introduction = item.value[0];
            break;
        default:
    }
});

const fidMap = {
    1: 'name',
    2: 'photo',
    4: 'intro'
};

localpath.value.forEach(item => {
    if (fidMap[item.fid]) {
        this.state[fidMap[item.fid]] = item.value[0];
    }
});


