// Handling request api error in action
export const catchAsync = (fn, exptHandler) => (dispatch) => {
    fn(dispatch).catch(e => {
        exptHandler(e, dispatch);
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

// capitalize string
export const capitalize = str => {
    if (str == null || str === '')
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// calculate time
export const calculateTime = time => {
    
    const date = new Date(time.split(' ')[0]);
    const diff = new Date().getTime() - date.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    console.log(days);
    if (Math.floor(days / 365) >= 1)
        return `${Math.floor(days / 30)} năm trước`;
    if (Math.floor(days / 30) >= 1)
        return  `${Math.floor(days / 30)} tháng trước`;
    if (1 <= days && days < 30)
        return `${days} ngày trước`;
    if (1 <= Math.floor(days * 24) < 24)
        return `${Math.floor(days * 24)} giờ trước`;
    else
        return `${Math.floor(days * 24 * 60)} phút trước`;
};