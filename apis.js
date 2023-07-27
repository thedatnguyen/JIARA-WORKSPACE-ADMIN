const root = 'http://localhost:5001';

module.exports = {
    getPendings: `${root}/pendings`,
    approvePending: `${root}/pendings/approve`,
    rejectPending: `${root}/pendings/reject`,

    getAccounts: `${root}/accounts`,

    getMessage: `${root}/messages`,
    getInbox: `${root}/messages/:messageId`,
    
    login: `${root}/api/auth/login`,
}
