const root = 'https://jiara-workspace-server.onrender.com'

module.exports = {
    getPendings: `${root}/pendings`,
    approvePending: `${root}/pendings/approve`,
    rejectPending: `${root}/pendings/reject`,
    getAccounts: `${root}/accounts`,
    login: `${root}/api/auth/login`,
}
