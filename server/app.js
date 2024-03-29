const { join } = require('path')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

    socket.on('userJoined', (data, cb) => {
        if (!data.name || !data.room) {
            return cb('invalid data')
        }
        socket.join(data.room)
        cb({userId: socket.id})
        socket.emit('newMessage', m('admin', `Hi, ${data.name}`))
        socket.emit('newMessage', m('test', `olololol`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', m('admin', `${data.name} joined.`))
    })
    
    socket.on('createMessage', data => {
        setTimeout(() => {
            socket.emit('newMessage', {
                text: data.text + ' SERVER'
            })
        }, 500)
    })

})

module.exports = {
    app, 
    server
}