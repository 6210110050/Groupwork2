const net = require('net')

var users = []
var State = 0


net.createServer((socket) => {


    socket.on('data', (data) => {
        var msg = data.toString()
        var user = finduser(socket.remoteAddress, socket.remotePort)
        
        if(State == 0)
        {
            if(msg == 'login' && user == null) 
            {
                users.push({
                    addr: socket.remoteAddress,
                    port: socket.remotePort,
                    name: `user`,
                    password: null,
                    client: socket
                })
                socket.write('Enter username')
                
                console.log(`a user has joined.`)
                return
            }

                
            if(msg == '6210110014')     // ready
            {
                user['password'] = '1234567'
                user['name'] = msg
                console.log(`${user.name}(${user.addr}:${user.port}) is ready.`)
                State = 2
                socket.write("enter password")
                
                return
            }   

            if(msg == '6210110050')     // ready
            {
                user['password'] = 'abcd'
                user['name'] = msg
                console.log(`${user.name}(${user.addr}:${user.port}) is ready.`)
                State = 2
                socket.write("enter password")
                
                return
            }  

            else{
                socket.write('not known')
            }
        }

        if(State == 2)
        {
            
            if(user['name'] == '6210110014' && msg == '1234567' ){
                
                console.log('connected')
                socket.write('Class \n340-162 THE AESTHETIC IN PHOTOGRAPHY 240-311 DISTRIBUTED COMP & WEB TECH \n240-309 MICRO CONTROLLER & INTERFAC \n 240-212 PROBABILITY AND STATISTICS')
            }

            if(user['name'] == '6210110050' && msg == 'abcd' ){
                
                console.log('connected')
                socket.write('\nClass \n240-381 COMPUTER CONTROL SYSTEMS \n240-214 DATA COMMU & NETWORKING \n200-107 INTER OF THING FOR DIGI LIFE')
            }
        
            else{
                socket.write('password wrong')
            }
        }
    })


}).listen(6969, '127.0.0.1')
console.log('Server listening on 127.0.0.1:6969')

function finduser(addr, port)
{
    for(var user of users)
    {
        if(user['addr'] == addr && user['port'] == port) return user
    }
    return null
}

