const axios = require('axios');

const { getAuthTokenFromCookie } = require('../helpers');

module.exports.getAllGroups = async (req, res, next) => {
    try {
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }

        let url = 'https://jiara-workspace-server.onrender.com/accounts';
        let accounts;
        await axios.get(url, configs)
            .then(apiRes => accounts = apiRes.data.data);
    
        url = "https://jiara-workspace-server.onrender.com/groups"
        await axios.get(url, configs)
            .then(apiRes => {
                const { groups } = apiRes.data;
                res.render('backend', {
                    title: 'Dashboard',
                    'routeName': 'aasasas',
                    'body': global.__path_views + 'pages/groups/index',
                    groups: groups,
                    accounts: accounts
                });
            })
            .catch(err => console.log(err.response.data))
    } catch (error) {
        console.log(error.message);
        res.render('error');
    }
}

module.exports.createNewGroup = async (req, res, next) => {
    try {
        const { groupName, managerIds } = req.body;
        console.log(req.body);
        console.log(groupName);
        console.log(managerIds);
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }
        const url = "https://jiara-workspace-server.onrender.com/groups";
        const body = {
            groupName: groupName,
            managers: managerIds
        }
        await axios.post(url, body, configs)
            .catch(err => console.log(err.response.data))
        res.redirect('/groups');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.getGroupDetails = async (req, res, next) => {
    try {
        let accounts;
        const { groupId } = req.params;
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }
        let url = 'https://jiara-workspace-server.onrender.com/accounts'
        await axios.get(url, configs)
            .then(apiRes => accounts = apiRes.data.data);

        url = `https://jiara-workspace-server.onrender.com/groups/${groupId}`
        await axios.get(url, configs)
            .then(apiRes => {
                const group = apiRes.data;
                res.render('backend', {
                    title: 'Group details',
                    'body': global.__path_views + 'pages/groups/groupDetail',
                    group: group,
                    accounts: accounts
                })
            })
            .catch(err => console.log(err.response.data))
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.addManagers = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }
        let url;
        let { managerIds } = req.body;
        if (!Array.isArray(managerIds)) {
            managerIds = [managerIds];
        }
        Promise.all(
            managerIds.map(manager => {
                url = `https://jiara-workspace-server.onrender.com/groups/${groupId}/managers/${manager}`;
                axios.post(url, {}, configs);
            })
        )
            .catch(err => console.log(err.response.data))
        res.redirect(`/groups/${groupId}`);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.removeManager = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const managerId = req.query.deleteManager;
        const url = `https://jiara-workspace-server.onrender.com/groups/${groupId}/managers/${managerId}`;
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }
        await axios.patch(url, {}, configs);
        res.redirect(`/groups/${groupId}`);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const url = `https://jiara-workspace-server.onrender.com/groups/${groupId}`;
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }

        console.log(JSON.stringify(configs));
        await axios.delete(url, configs)
            .catch(err => console.log(err.response.data));
        res.redirect(`/groups`);
    } catch (error) {
        console.log(error.message)
    }
}