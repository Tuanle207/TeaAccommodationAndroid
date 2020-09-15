import ACTION_TYPE from './type';

export const doSomething = data => dispatch => {
    console.log('You are doing something...Maybe it involves changing state?');

    if (!data) {
        data = {
            data: 'data has been changed',
            error: 'no error'
        };
    }
    dispatch({
        type: ACTION_TYPE.DO_SOMETHING,
        payload: data
    });
};