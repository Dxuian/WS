var data = require("./data.js");
const { v4: uuidv4 } = require('uuid');
const url = require("url");
const { send } = require("process");
var listofconnections = new Set(), timobj = new Set();
async function routes(fastify, opts, done) {
    fastify.get("/handler/:wildcard", (req, res) => {
        var afl = req.params.wildcard;
        if (afl.length > 3) {
            var buffer = "ws:://localhost:5000/ws/" + afl
            res.redirect(buffer)
        }
        else {
            var randlobbycode = uuidv4()
            res.send({ file: "prac.html", lobbycode: randlobbycode })
        }
    })
    fastify.get("/ws/:lobbycode", { WebSocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
        randssid = uuidv4();
        lbycode = req.params.lobbycode;
        listofconnections.add({ connect: connection, ssid: randssid, lobbycodes: lbycode })
        connection.on("close", () => {
            for (let x of listofconnections) {
                if (x.connect === connection) {
                    listofconnections.delete(x)
                    break;
                }
            }
            sendmsg(removeplayer, toall, null)
        })
        connection.on("message", (message) => {
            if (text == start) {
                for (let x of listofconnections) {
                    if (connection === x.connect) {
                        lcdtime = x.lobbycodes;
                        break;
                    }
                }
                timobj.add({ starttime: Tiimer(), lobbycodes: lcdtime, dnf: setTimeout(sendmsg(stop, toall, null), dnftimeinsec) });
                sendmsg(timerstart, toall, wsh)
            }
            else if (text == playerjoin) {
                if (playernumber <= 4) { sendmsg(playerinfo, nottoself, wsh) }
                else { sendmsg(maxnumber, toself) }
            }
            else if (text = playertype) { sendmsg(playertype, nottoself, wsh) }
            else if (text == (end, statsofall)) { sendmsg(calculatewinner(message)), toall, wsh }
            else if (text = rematch) { sendmsg({ clrall, timerstart }, toall, wsh) }
            else if (text = closelobby) { listofconnections.delete
            for (const x  of listofconnections) {
                if(connection == x.connect)
                {
                    hold = x ; 
                    break ; 
                }                
            }
            for (const y of listofconnections) {
                if(hold.lobbycodes = y.lobbycodes)
                {
                    y.connect.close() ; 
                }
            }

            }
        })
    })
    done();
}
function calculatewinner(message) {
    
    for (const x of listofconnections) {
        if (wsh === x.connect) {
            lobbynoforwin = listofconnections.lobbycodes
            break;
        }
    }
    for (const y of timobj) {
        if (lobbynoforwin === y.lobbycodes) {
            setholder = y;
        }
    }
    if(setholder.p1time!=null && setholder.p2time!=null &&setholder.p3time!=null &&setholder.p4time!=null)
    {
        minval  =  Math.min(setholder.p1time,setholder.p2time,setholder.p3time, setholder.p4time) ; 
        arr = [setholder.p1time,setholder.p2time,setholder.p3time,setholder.p4time] ; 
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < minVal) {
              minVal = arr[i];
              minIndex = i;
            }
          }
        return minIndex
    }
    // Convert Set to Array
    var myArray = Array.from(setholder);

    // Add new fields to each object in the array
    myArray.forEach(set => {
        set.forEach(obj => {
            const num = obj.message.player;
            if (num >= 1 && num <= 4) {
                obj[`p${num}time`] = message.x; // update p_num_time based on the num value of the object
            }
        });
    });



    // Convert Array back to Set
    const updatedSet = new Set(myArray);

    // Replace the original Set with the updated one
    timobj.delete(setholder);
    timobj.add(updatedSet);




}


function Tiimer() {
    var currtime = new Date.getTime();
    return currtime;
}
// listofconnections.add({connect:connection , ssid:randssid, lobbycodes:lbycode})
//flags  - toall wsh, nottoself wsh,self wsh ,NULL nowsh
function sendmsg(info, flag, wsh) {
    for (let x of listofconnections) {
        if (wsh === x.connect) {
            listobjholder = x;
            break;
        }
    }
    if (flag == toall || flag == null) {
        for (let y of listofconnections) {
            if (listobjholder.lobbycodes === y.lobbycodes) {
                y.connect.socket.send(JSON.parse(info))
            }
        }
    }
    else if (flag == nottoself) {
        for (let y of listofconnections) {
            if (
                listobjholder.lobbycodes === y.lobbycodes && y.lobbycodes != listobjholder.connect
            ) {
                y.connect.socket.send(JSON.parse(info))
            }
        }
    }
    else if (flag == toself) {
        wsh.socket.send(info)
    }
}
module.exports = routes;
// async function routes(fastify,opts,done) {
//     await fastify.get('/*', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//       connection.socket.on('message', message => {
//         // message.toString() === 'hi from client'
//         fastify;
//         connection.socket.send('hi from wildcard route')
//       })
//       done()
//     })}
// fastify.get('/wss', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//     connection.socket.on("message", (message) => {
//         var y, wsh;
//         for (const element of listofconnections) {
//             if (element.connect === connection) {
//                 y = "found"
//                 fastify.log.info("connection has been found !!")
//                 wsh = element.connect
//                 break;
//             }
//         }
//         if (y !== "found") {
//             var sessionID = uuidv4();
//             fastify.log.info(sessionID);
//             fastify.log.info("connection has not been found so making new!!")
//             listofconnections.add({ connect: connection, sessionId: sessionID })
//         }
//         if (!wsh) { wsh = connection }
//         fastify.log.info(`list of connections: ${listofconnections.size}`)
//         var decoder = new TextDecoder('utf-8');
//         var text = decoder.decode(message);
//         if(text.slice(0,4)=="[Obj"){
//             text = JSON.parse(text) ;
//             fastify.log.info(`123456789+${text.keys} `);
//         }
//         fastify.log.info(`heres the text ${text}`)
//         var ss;
//         for (const vary of listofconnections) {
//             if (wsh !== vary.connect) {
//                 fastify.log.info(`${vary.connect} ########## ${wsh}`)
//                 ss = "sent"
//                 vary.connect.socket.send(`${text}`);
//                 fastify.log.info("sento to others and it worked")
//             }
//         }
//         if (ss != "sent") {
//             fastify.log.info("posted")
//             wsh.socket.send("message sent");
//         }
//     })
// })
// fastify.get("/enter", (req, res) => {
//     res.sendFile("prac.html")
// })
// fastify.get('/items*', (req, reply) => {
//     var holder = url.parse(req.url, true)
//     fastify.log.info(" ####");
//     fastify.log.info(holder.search);
//     if (holder.search == "?name=unnat&ln=4") {
//         fastify.log.info("h4321");
//         reply.send({ test: 'failed but working' });
//     }
//     else if (holder.search == "?name=unnat&ln=5") {
//         // fastify.log.info(data);
//         reply.send({ test: 'success', datas: data })
//     }
//     else {
//         reply.send({ test: 'failed' });
//     }
// }
// )
// fastify.get("/items/:id", (req, res) => {
//     var ide = Number((req.params.id)[1]), k;
//     fastify.log.info(ide);
//     if (ide == 4) {
//         k = data.innerdata
//         fastify.log.info("#123123");
//     }
//     res.send({ variable: k });
// })
// fastify.post("/items/:id", (req, res) => {
//     fastify.log.info("#########");
//     fastify.log.info(req.body);
//     var ide = Number((req.params.id)[1]), k;
//     fastify.log.info(ide);
//     if (ide == 4) { k = data.innerdata }
//     if (ide == 1) { k = data.sirname }
//     fastify.log.info("#########");
//     res.send({ variable: k, url: req.url });
// })
// fastify.delete("/items/delete/:id", (req, res) => {
//     {
//         fastify.log.info("#########");
//         var ide = Number((req.params.id)[1])
//         if (ide == 1) {
//             delete data.sirname;
//             res.code(200).send("item has been deleted");
//         }
//         else { res.code(201).send("failed to delete"); }
//     }
// })
// fastify.put("/items/put/:id", (req, res) => {
//     fastify.log.info("#########");
//     var ide = Number((req.params.id)[1])
//     if (ide == 2) {
//         var n = req.body.key
//         data.age = n;
//         res.code(200).send("item has been update");
//     }
//     else { res.code(201).send("failed to update"); }
// }
// )
// fastify.get("/test1", (req, res) => {
//     try {
//         fastify.log.info("ok it works fine \n")
//         res.sendFile("static.html")
//     }
//     catch (err) {
//         fastify.log.info(err)
//     }
// })
// fastify.get('/ws', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//     connection.socket.on('message', message => {
//         // message.toString() === 'hi from client'
//         const decoder = new TextDecoder('utf-8');
//         const text = decoder.decode(message);
//         fastify.log.info(text)
//         try {
//             connection.socket.send('hi from server')
//             fastify.log.info("message sent")
//         }
//         catch (err) {
//             fastify.log.info(err)
//         }
//     })
// })
// fastify.get("/two", (req, res) => {
//     res.sendFile("a.html")
// })
// fastify.get("/three", (req, res) => {
//     res.sendFile("as.html")
// })