module.exports = {
    PHOTO_MAX_SIZE: 4 * 1024 * 1024, // 2MB
    DOC_MAX_SIZE: 10 * 1024 * 1024, // 5MB
    MAX_PRODUCTS_FILES: 10,

    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],
};
