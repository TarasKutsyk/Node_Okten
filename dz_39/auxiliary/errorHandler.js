module.exports = class ErrorHandler extends Error {
    constructor(message, code, customCode) {
        super(message);
        this.code = code;
        this.customCode = customCode;
    }
};
