// Handling request api error in action
export const catchAsync = (fn, exptHandler) => (dispatch, getState) => fn(dispatch, getState).catch(err => exptHandler(err, dispatch));

// Check if object or array is empty
export const isEmpty = obj => Object.keys(obj).length === 0 && (obj.constructor === Object || obj.constructor === Array);

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
    const days = diff / (1000 * 3600 * 24);
    
    if (Math.floor(days / 365) >= 1)            return `${Math.floor(days / 30)} năm trước`;
    if (Math.floor(days / 30) >= 1)             return `${Math.floor(days / 30)} tháng trước`;
    if (1 <= Math.floor(days))                  return `${Math.floor(days)} ngày trước`;
    if (1 <= Math.floor(days * 24))             return `${Math.floor(days * 24)} giờ trước`;
    else if (1 <= Math.floor(days * 24 * 60))   return `${Math.floor(days * 24 * 60)} phút trước`;
    else                                        return `vừa xong`;
};

// format datetime
export const formatDatetime = time => {
    const reversedTime = time.split(' ').reverse();
    const date = reversedTime[1].split('-').reverse();
    const formatedTime = reversedTime[0] + ' ' + date.join('-')
    return formatedTime
};

// compareDate
const compareDate = (commentA, commentB) => {

    const date1 = new Date(commentA.commentedAt);
    const date2 = new Date(commentB.commentedAt);
    if (date1 > date2) {
        return -1;
    }
    if (date1 < date2) {
        return 1;
    }
    return 0;
};

export const sortArrayOfObjectByDate = arr => {
    return arr.sort(compareDate)
};

// try parse a string to an integer, otherwise, return null
export const tryParseInt = (str, defaultValue = null) => {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

export const ROLE_TYPE = {
    NORMAL_USER: 'user',
    LAND_LORD: 'landlord'
};

export const APARTMENT_MODIFICATION_TYPE = {
    CREATION: 0,
    UPDATION: 1
};

export const APARTMENT_STATUS = {
    AVAILABLE: 'còn phòng',
    FULL: 'hết phòng'
};