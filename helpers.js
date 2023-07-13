module.exports.getAuthTokenFromCookie = (req) => {
    const cookie = req.headers.cookie;
    const cookieObj = {}
    cookie.replace(/\s/g, '').split(';').forEach(ele => {
        [key, val] = ele.split('=');
        cookieObj[key] = val;
    });

    return cookieObj['auth-token'];
}