const axios = require('axios');


module.exports.entry = (req, res) => {
    res.render('index');
}
module.exports.loadDashboardPage = async (req, res, next) => {
    try {
        console.log(req.body['auth-token']);
        const authToken = req.body['auth-token'];
        const configs = {
            headers: {
                authToken: authToken
            }
        }
        await axios.get('https://jiara-workspace-server.onrender.com/accounts', configs)
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
            .catch(() => {
                res.render('pages/login/login');
            });
    } catch (error) {
     res.status(500).send({error: error.message});
    }
}


// try {
    //     console.log(req.headers);
    //     const authToken = req.headers['auth-token'];
    //     console.log('authToken: ' + authToken);

    //     // check if this browser first access
    //     if(authToken === null || authToken === undefined){
    //         return res.render('index');
    //     }

    //     const configs = {
    //         headers: {
    //             authToken: authToken,
    //         }
    //     };
    //     await axios.get('http://127.0.0.1:5001/fir-demo-13f7a/us-central1/app/accounts', configs)
    //         .then(apiResponse => {
    //             //console.log(apiResponse.data);
    //             const { status, data } = apiResponse.data;
    //             if (status === 'success') {
    //                 const accounts = data;
    //                 console.log(accounts);
    //                 res.render('backend', {
    //                     title: 'Dashboard',
    //                     'routeName': 'NodeJS',
    //                     'body': global.__path_views + 'pages/dashboard/index',
    //                     accounts: accounts
    //                 });
    //             }
    //         })
    //         .catch((error) =>{
    //             //console.log(error.response.status);
    //             switch(error.response.status){
    //                 case 401: { // invalid token, relogin to get token
    //                     //console.log('401');
    //                     //console.log(error.response.data.message);
    //                     res.render('pages/login/login');
    //                     break;
    //                 }
    //                 default: {
    //                     res.status(401).send({ error: error.message, message: JSON.stringify(error.response.data.message) });
    //                     break;
    //                 }
    //             }
    //         });
    // } catch (error) {
    //     res.render('/index');
    // }