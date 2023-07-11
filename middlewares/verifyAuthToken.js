module.exports = async (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) { 
        console.log(token);
        return res.render('index'); // send token to server if token is existed;
    }
    res.locals.authToken = token;
    next();
}