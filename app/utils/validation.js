import { tryParseInt } from '.';

const createValidationRule = (rule, message) => {
    return {
        rule,
        message
    }
};

export const mustNotBeEmptyStringRule = fieldName => createValidationRule(
    value => value !== null && value.trim() !== '',
    `${fieldName} không thể bị bỏ trống!`
);

export const mustBeANumberRule = fieldName => createValidationRule(
    value => value !== null && tryParseInt(value) !== null,
    `${fieldName} không hợp lệ!`
);

export const mustNotBeEmpty = fieldName => createValidationRule(
    value => value !== null,
    `${fieldName} cần phải được lựa chọn!`
);

export const mustReachNumber = (fieldName, number) => createValidationRule(
    value => value === number,
    `Cần chọn đủ ${number} ${fieldName}!`
);

export const validate = (value, rules, callback) => {
    let validated = true;
    rules.reverse().forEach(el => {
        if (el.rule(value) === false) {
            validated = false;
            callback(el.message);
        }
    });
    if (validated === true) {
        callback(null);
    }
    
};