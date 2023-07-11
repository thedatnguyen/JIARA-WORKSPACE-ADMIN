const axios = require('axios');

module.exports.getLoginPage = async (req, res, next) => {
    res.render('pages/login/login');
};

module.exports.authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await axios.post('https://jiara-workspace-server.onrender.com/api/auth/login',
            { username, password })
            .then(response => {
                //console.log(response.data);
                const { status, data, token } = response.data;
                if (data.role === 'admin') {
                    return res.render('verify', {token: token});
                }
                return res.render('pages/login/login', { status: 'login failed' });
            })
            .catch(err => {
                console.log(err.response.data.message);
                return res.status(500).send({error: err.message, message: err.response.data.message});
            });
    } catch (error) {
        return res.render('pages/login/login', { status: 'login failed' });
    }
}