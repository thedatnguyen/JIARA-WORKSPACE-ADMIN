const axios = require('axios');

const apis = require('../apis');

module.exports.getLoginPage = async (req, res, next) => {
    res.render('pages/login/login');
};

module.exports.authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await axios.post(apis.login,
            { username, password })
            .then(response => {
                console.log(response.data);
                const { username, role, token, avatarUrl, firstname, lastname, email, gender, phoneNumber } = response.data;
                if (role === 'admin') {
                    return res.render('verify', { 
                        username: username, 
                        token: token, 
                        avatarUrl: avatarUrl,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        gender: gender,
                        phoneNumber: phoneNumber
                    });
                }
                return res.render('pages/login/login', { status: 'login failed' });
            })
            .catch(err => {
                console.log(err.response.data.message);
                return res.status(500).send({ error: err.message, message: err.response.data.message });
            });
    } catch (error) {
        return res.render('pages/login/login', { status: 'login failed' });
    }
}