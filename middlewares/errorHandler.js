module.exports = async (req, res, next) => {
    //console.log(res.locals.error)
    const { errorMessage } = res.locals;
    switch (errorMessage) {
        case 'token is expired, login again': {
            res.redirect('/');
            break;
        }
        default: {
            break;
        }
    }
}