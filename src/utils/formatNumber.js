const toRupiah = (value) => {
    return value.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
};

const formatNumber = {
    toRupiah,
};

export default formatNumber;
