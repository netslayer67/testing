const getStatusColor = (stat) => {
    if (
        stat === 'AKTIF' ||
        stat === 'PENGGARAPAN SELESAI' ||
        stat === 'DISETUJUI' ||
        stat === '1'
    ) {
        return 'bg-[#7AC943]';
    } else if (stat === 'DITOLAK' || stat === '0') {
        return 'bg-[#DC143C]';
    } else if (stat === 'MENUNGGU VALIDASI' || stat === 'DALAM PENGGARAPAN') {
        return 'bg-goldPrimary';
    } else if (stat === 'CUTI') {
        return 'bg-gray-400';
    } else {
        return 'bg-white';
    }
};

export default getStatusColor;
