const toLocal = (dt) => {
    return new Date(dt).toLocaleDateString('en-GB');
};

const formatDate = {
    toLocal,
};

export default formatDate;
