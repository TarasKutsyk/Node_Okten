const fileConstants = require('../fileConstants');

module.exports = {
    DATABASE_READ_ERROR: 'The server could not read a file from a database',
    DATABASE_WRITE_ERROR: 'The server could not write an entry to a database',
    TOO_WEAK_PASSWORD: {
        en: 'Your password must be minimum 6 characters long',
        ua: 'Ваш пароль має бути мінімум у 6 символів'
    },
    EMPTY_FIELD: {
        en: 'You must specify all the fields',
        ua: 'Ви повинні вказати всі поля'
    },
    USER_NOT_FOUND: {
        en: 'User with such fields does not exists',
        ua: 'Користувача з такими полями не існує'
    },
    USER_ALREADY_EXISTS: {
        en: 'User with such an email already exists',
        ua: 'Користувач з такою поштою вже існує'
    },
    INVALID_ID: {
        en: 'User ID is invalid',
        ua: 'ID користувача не валідне'
    },
    BAD_TOKEN: {
        en: 'You are unauthorised to visit this page',
        ua: 'Ви не маєте права відвідувати цю сторінку'
    },
    BAD_REFRESH_TOKEN: {
        en: 'Refresh token has expired or does not exist',
        ua: 'Токен оновлення прострочений або не існує'
    },

    TOO_MANY_FILES: 'You must send only one avatar',
    TOO_MANY_PRODUCT_FILES: `You cannot send more than ${fileConstants.MAX_PRODUCTS_FILES} files`,
    TOO_BIG_FILE: 'File sent was too big in size',
    BAD_EMAIL: 'Your email is invalid',
    BAD_LOGIN: 'Wrong email or password'
};
