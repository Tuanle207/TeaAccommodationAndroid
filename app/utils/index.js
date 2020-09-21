
export const catchAsync = (fn, exptHandler) => (dispatch) => {
    fn(dispatch).catch(e => {
        exptHandler(e);
    })
};