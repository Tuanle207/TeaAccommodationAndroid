// Handling request api error in action
export const catchAsync = (fn, exptHandler) => (dispatch) => {
    fn(dispatch).catch(e => {
        exptHandler(e);
    })
};

// Check if object or array is empty
export const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

// Shorten money amount to million dong
export const shortenMoneyAmount = amount => {
    return amount / 1000000;
};

// limit down to 20 words
export const shortenText = (text, maxLength = 100) => {
    let words = text.substr(0, maxLength);
    words = words.substr(0, Math.min(words.length, words.lastIndexOf(' ')));
    return maxLength > text.length ? words : words + ' ...';
};