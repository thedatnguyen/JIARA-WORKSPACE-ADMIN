const axios = require('axios');

const apis = require('../apis');
const {getAuthTokenFromCookie} = require('../helpers');

module.exports.getAllAccounts = async (req, res, next) => {
    try {
        const authToken = getAuthTokenFromCookie(req);
        const configs = {
            headers: {
                authToken: authToken
            }
        }
        await axios.get(apis.getAccounts, configs)
            .then(apiResponse => {
                const {status, data} = apiResponse.data;
                if (status === 'success') {
                    const accounts = data;
                    res.render('backend', {
                        title: 'Dashboard',
                        'routeName': 'aasasas',
                        'body': global.__path_views + 'pages/accounts/index',
                        accounts: accounts
                    });
                }
            })
            .catch(err => {
                //console.log(err.response.data);
                res.locals.errorMessage = err.response.data.message;
                next();
            });

    } catch (error) {
        res.status(500).send({ error: error.message });
        console.error(error.message);
    }
}