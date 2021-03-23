const tokensService = require('../../services/authService');
const {TOKENS_DAYS_TO_EXPIRE} = require('../../config');

const expiryDate = calculateExpiryDate();

module.exports = async () => {
    try {
        await tokensService.deleteEntriesByDate(expiryDate);
    } catch (e) {
        console.log(e.message);
    }
};

function calculateExpiryDate() {
    const date = new Date();
    date.setDate(date.getDate() - TOKENS_DAYS_TO_EXPIRE);
    return date;
}
