var data = require("./data.js");
const { v4: uuidv4 } = require('uuid');
const url = require("url");
var listofconnections = new Set()
async function routes(fastify, opts, done) {

    fastify.get("/handler*", (req, res) => {
        var afl = String(req.url).substring(8),lobbycode;
        fastify.log.info(afl)
        if (afl.length > 3) {
            var buffer = "ws://localhost:5000/ws" + afl
             lobbycode = String((afl)) ; 
        }
        else {
            var randlobbycode = uuidv4()
            lobbycode = String((randlobbycode))
            var buffer = "ws://localhost:5000/ws" + randlobbycode
        }
        
        // fastify.log.info(lobbycode.length) ; 
        // fastify.log.info("#######") ; 
        var wscode = String((buffer)) ; 
        try {
            res.setCookie('lobbycode',lobbycode);
            res.setCookie('wscode', wscode);
          

             res.code(200).sendFile("pract.html")
        } catch (error) {
            fastify.log.info(error)
        }
    })
    fastify.get("/ws/*", { WebSocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => { 
        fastify.log.info("###########")
        randssid = uuidv4();
        lbycode = String(connection.url).substring(4) ; 
        fastify.log.info(connection.url)
        fastify.log.info(lbycode)
        fastify.log.info("###########")
        listofconnections.add({ connect: connection, ssid: randssid, lobbycodes: lbycode })
        connection.socket.on("close", () => {
            fastify.log.info("%%%%%%%%%%%")
            for (let x of listofconnections) {
                if (x.connect === connection) {
                    listofconnections.delete(x)
                    break;
                }
            }
            sendmsg({ info: removeplayer }, toall, null)
        })
        connection.socket.on("message", (message) => {
            if (text == start) {
                for (let x of listofconnections) {
                    if (connection === x.connect) {
                        lcdtime = x.lobbycodes;
                        break;
                    }
                }
                timobj.add({ starttime: Tiimer(), lobbycodes: lcdtime, dnf: setTimeout(sendmsg(stop, toall, null), dnftimeinsec) });
                sendmsg({ info: "timerstart" }, toall, wsh)
            }
            else if (text == playerjoin) {
                if (playernumber <= 4) { sendmsg({ info: "playerinfo" }, nottoself, wsh) }
                else { sendmsg({ info: "maxnumber" }, toself, null) }
            }
            else if (text == playertype) { sendmsg({ info: playertype }, nottoself, wsh) }
            else if (text == (end, statsofall)) { sendmsg({ info: calculatewinner(message) }, toall, wsh) }
            else if (text = rematch) { sendmsg({ info: "clrall", timerstartnewmatch: x }, toall, wsh) }
            else if (text = closelobby) {
                for (const x of listofconnections) {
                    if (connection == x.connect) {
                        hold = x;
                        break;
                    }
                }
                for (const y of listofconnections) {
                    if (hold.lobbycodes = y.lobbycodes) {
                        y.connect.close();
                    }
                }

            }
        })
    })
    fastify.get("/xhr",(res,req)=>{

    })


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
     // async function routes(fastify,opts,done) {
    //     await fastify.get('/*', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    //       connection.socket.on('message', message => {
    //         // message.toString() === 'hi from client'
    //         fastify;
    //         connection.socket.send('hi from wildcard route')
    //       })
    //       done()
    //     })}
    fastify.get("/three", (req, res) => {
        res.sendFile("as.html")
    })

    done();
   

}


module.exports = routes; 