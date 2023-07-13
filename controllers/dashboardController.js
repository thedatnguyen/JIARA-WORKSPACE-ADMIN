const axios = require('axios');

const apis = require('../apis');
const {getAuthTokenFromCookie} = require('../helpers');

module.exports.entry = (req, res) => {
    res.render('index');
}
module.exports.loadDashboardPage = async (req, res, next) => {
    try {
        const authToken = req.body['auth-token'];
        const configs = {
            headers: {
                authToken: authToken
            }
        }
        await axios.get(apis.getPendings, configs)
            .then(apiResponse => {
                //console.log(apiResponse.data);
                const { status, data } = apiResponse.data;
                if (status === 'success') {
                    const accounts = data;
                    //console.log(accounts);
                    res.render('backend', {
                        title: 'Dashboard',
                        'routeName': 'NodeJS',
                        'body': global.__path_views + 'pages/dashboard/index',
                        accounts: accounts
                    });
                }
            })
            .catch((err) => {
                //console.log(err.response.data)
                res.render('pages/login/login');
            });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports.approvePending = async (req, res, next) => {
    const username = req.query.username;
    try {
        const authToken = getAuthTokenFromCookie(req);
        const configs = {
            headers: {
                authToken: authToken
            }
        }
        await axios.post(apis.approvePending, { username: username }, configs)
            .then(() => res.redirect('/'))
            .catch(err => console.log(err.response.data));

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports.rejectPending = async (req, res) => {
    const username = req.query.username;
    try {
        const authToken = getAuthTokenFromCookie(req);
        const configs = {
            headers: {
                authToken: authToken
            }
        }
        await axios.post(apis.rejectPending, { username: username }, configs)
            .then(() => res.redirect('/'))
            .catch(err => console.log(err.response.data));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}