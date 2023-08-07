const axios = require('axios');
const formidable = require('formidable');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const crypto = require('crypto');
const sharp = require('sharp');
const jimp = require('jimp');

const { getAuthTokenFromCookie } = require('../helpers');

module.exports.loadPersonalDetail = (req, res) => {
    res.render('backend', {
        'body': global.__path_views + 'pages/personal/index',
        newPhoneNumber: undefined
    })
}

module.exports.updatePersonalDetail = async (req, res, next) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            const phoneNumber = fields.phoneNumber[0];
            let base64Avatar;
            if (files.avatar) {
                var filepath = files.avatar[0].filepath;
                var newFilepath = `${global.__path_avatars}/${uuid()}.png`

                await sharp(filepath)
                    .resize({ width: 150, height: 150, fit: "cover" })
                    .toFile(newFilepath)

                base64Avatar = fs.readFileSync(newFilepath, 'base64');

                fs.unlinkSync(filepath);
                fs.unlinkSync(newFilepath);
            }

            const url = 'https://jiara-workspace-server.onrender.com/personal';
            const body = {
                base64Avatar,
                phoneNumber
            }
            const authToken = getAuthTokenFromCookie(req);
            const configs = {
                headers: {
                    authToken: authToken,
                }
            }
            await axios.post(url, body, configs)
                .then(() => {
                    res.render('backend', {
                        'body': global.__path_views + 'pages/personal/index',
                        newPhoneNumber: phoneNumber
                    })
                })
        })
    } catch (error) {
        //console.log(error);
        res.render('error');
    }
}

module.exports.changePassword = async (req, res, next) => {
    try {
        const url = 'https://jiara-workspace-server.onrender.com/personal/resetPassword';
        const { body } = req;
        const authToken = getAuthTokenFromCookie(req);
        const configs = {
            headers: {
                authToken: authToken,
            }
        }
        await axios.post(url, body, configs)
            .then(() => res.redirect('/personal'))
            .catch(err => {
                console.log(err.response.data);
                res.redirect('/personal');
            })
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

module.exports.forgetPassword = async (req, res, next) => {
    try {
        const url = 'https://jiara-workspace-server.onrender.com/personal/resetPassword';
        const body = {
            username: req.body.username_forgetPassword,
            email: req.body.email_forgetPassword
        }
        const authToken = getAuthTokenFromCookie(req);
        const configs = {
            headers: {
                authToken: authToken,
            }
        }
        await axios.patch(url, body, configs)
            .then(() => res.redirect('/personal'))
            .catch(err => {
                console.log(err.response.data);
                res.redirect('/personal');
            })
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}