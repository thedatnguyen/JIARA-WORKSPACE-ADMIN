const axios = require('axios');

const { getAuthTokenFromCookie } = require('../helpers');

module.exports.getAllConversations = async (req, res, next) => {
    try {
        const { idToChat } = req.query;
        const configs = {
            headers: {
                authToken: getAuthTokenFromCookie(req)
            }
        }
        const url = (idToChat) ?
                `https://jiara-workspace-server.onrender.com/messages?idToChat=${idToChat}` :
                `https://jiara-workspace-server.onrender.com/messages`;

        await axios.get(url, configs)
            .then(apiRes => {
                const { accessToken, chatId } = apiRes.data;
                res.render('backend', {
                    title: 'Group details',
                    'body': global.__path_views + 'pages/messages/index',
                    accessToken: accessToken,
                    chatId: chatId
                })
            })
    } catch (error) {

    }
}