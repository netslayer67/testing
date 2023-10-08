export const RESPONSE_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
};

export const STATUS_CODE = {
    LOADING: 'LOADING',
    IDLE: 'IDLE',
    ERROR: 'ERROR',
};

export const menuAdmin = [
    {
        name: 'Profile',
        link: '/dashboard/admin/profile',
    },
    {
        name: 'Data Nasabah',
        link: '/dashboard/admin/nasabah',
    },
    {
        name: 'Data Anggota Joki',
        link: '/dashboard/admin/anggota-joki',
    },
    {
        name: 'Tambah Anggota',
        link: '/dashboard/admin/tambah-anggota',
    },
    {
        name: 'Pengajuan Cuti',
        link: '/dashboard/admin/pengajuan-cuti',
    },
];

export const menuJoki = [
    {
        name: 'Profile',
        link: '/dashboard/joki/profile',
    },
    {
        name: 'Data Tugas',
        link: '/dashboard/joki/data-tugas',
    },
];

export const menuSuperAdmin = [
    {
        name: 'Profile',
        link: '/dashboard/super-admin/profile',
    },
    {
        name: 'Data Tugas',
        link: '/dashboard/super-admin/data-admin',
    },
];

export const MODAL_NAME = {
    DELEGATE: 'DELEGATE',
    APPROVAL: 'APPROVAL',
    REJECTION: 'REJECTION',
};

export const RESP_FAP_ACT = {
    DELEGATE: 'DELEGATE',
    APPROVAL: 'APPROVAL',
    REJECTION: 'REJECTION',
};

export const FAP_APPR_STAT = {
    DISETUJUI: 'DISETUJUI',
    DITOLAK: 'DITOLAK',
};

export const DFLT_PAG_LIMIT = 10;
export const DFLT_PAG_PAGE = 1;
export const DFLT_PAG_SORT_BY = 'createdAt';
export const DFLT_PAG_SORT_DIR = 'desc';
