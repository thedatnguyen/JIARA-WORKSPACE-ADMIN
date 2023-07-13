module.exports.config = async (io) => {
    const {db} = require('./configs/firebase');
    
    io.on('connection', socket => {
        //console.log('connected with id: ' + socket.id);
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