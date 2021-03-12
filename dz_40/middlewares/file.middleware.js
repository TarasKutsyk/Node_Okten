const ErrorHandler = require('../auxiliary/errorHandler');
const {errorCodes, errorMsg, customErrorCodes} = require('../constants/errors');
const fileConstants = require('../constants/fileConstants');

function sortFile(mimetypesArr, maxSize, mimetype, filesArr, file, size, name) {
    if (mimetypesArr.includes(mimetype)) {
        if (size > maxSize) {
            throw new ErrorHandler(`${name}: ${errorMsg.TOO_BIG_FILE}`, errorCodes.BAD_REQUEST, customErrorCodes.TOO_BIG_FILE);
        }

        filesArr.push(file);
    }
}

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            const {files} = req;

            const photos = [];
            const docs = [];

            const fileValues = Object.values(files);

            for (const file of fileValues) {
                const {mimetype, size, name} = file;

                sortFile(fileConstants.PHOTOS_MIMETYPES, fileConstants.PHOTO_MAX_SIZE,
                    mimetype, photos, file, size, name);
                sortFile(fileConstants.DOCS_MIMETYPES, fileConstants.DOC_MAX_SIZE,
                    mimetype, docs, file, size, name);
            }

            req.photos = photos;
            req.docs = docs;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new ErrorHandler(errorMsg.TOO_MANY_FILES, errorCodes.BAD_REQUEST, customErrorCodes.TOO_MANY_FILES);
            }

            const [avatar] = req.photos;

            req.avatar = avatar;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkProductsFiles: (req, res, next) => {
        try {
            const {photos, docs} = req;

            if (photos > fileConstants.MAX_PRODUCTS_FILES || docs > fileConstants.MAX_PRODUCTS_FILES) {
                throw new ErrorHandler(errorMsg.TOO_MANY_PRODUCT_FILES, errorCodes.BAD_REQUEST, customErrorCodes.TOO_MANY_FILES);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
