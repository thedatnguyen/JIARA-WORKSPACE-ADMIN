module.exports.config = async (io) => {
    const {db} = require('./configs/firebase');
    const axios = require('axios');
    
    io.on('connection', socket => {
        socket.on('new message', () => {
            console.log('new message');
            io.emit('new message', 'change');
        })
    })

    db.collection('accounts').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            io.emit('accounts change', snapshot);
        })
    })

    db.collection('pendings').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            io.emit('pendings change', snapshot);
        })
    })


}