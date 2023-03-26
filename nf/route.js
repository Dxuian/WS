var data = require("./data.js");
const url = require("url");

async function routes(fastify, opts, done) {
    fastify.get('/items*', (req, reply) => {
        var holder = url.parse(req.url, true)
        fastify.log.info(" ####");
        fastify.log.info(holder.search);
        if (holder.search == "?name=unnat&ln=4") {
            fastify.log.info("h4321");
            reply.send({ test: 'failed but working' });
        }
        else if (holder.search == "?name=unnat&ln=5") {
            // fastify.log.info(data);
            reply.send({ test: 'success', datas: data })
        }
        else {
            reply.send({ test: 'failed' });
        }

    }
    )
    fastify.get("/items/:id", (req, res) => {
        var ide = Number((req.params.id)[1]), k;
        fastify.log.info(ide);
        if (ide == 4) {
            k = data.innerdata
            fastify.log.info("#123123");
        }



        res.send({ variable: k });
    })
    fastify.post("/items/:id", (req, res) => {
        fastify.log.info("#########");
        fastify.log.info(req.body);
        var ide = Number((req.params.id)[1]), k;
        fastify.log.info(ide);
        if (ide == 4) { k = data.innerdata }
        if (ide == 1) { k = data.sirname }
        fastify.log.info("#########");



        res.send({ variable: k, url: req.url });
    })
    fastify.delete("/items/delete/:id", (req, res) => {
        {
            fastify.log.info("#########");
            var ide = Number((req.params.id)[1])
            if (ide == 1) {
                delete data.sirname;
                res.code(200).send("item has been deleted");
            }
            else { res.code(201).send("failed to delete"); }

        }

    })
    fastify.put("/items/put/:id", (req, res) => {
        fastify.log.info("#########");
        var ide = Number((req.params.id)[1])
        if (ide == 2) {
            var n = req.body.key
            data.age = n;
            res.code(200).send("item has been update");
        }
        else { res.code(201).send("failed to update"); }
    }
    )
    fastify.get("/test1", (req, res) => {
        try {
            fastify.log.info("ok it works fine \n")
            res.sendFile("static.html")
        }
        catch (err) {
            fastify.log.info(err)
        }
    })
    fastify.get('/ws', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {

        connection.socket.on('message', message => {
            // message.toString() === 'hi from client'
            const decoder = new TextDecoder('utf-8');
             const text = decoder.decode(message);
             fastify.log.info(text)
            try {
                connection.socket.send('hi from server')
                fastify.log.info("message sent")
            }
            catch (err) {
                fastify.log.info(err)
            }
        })
    })


    done();
    // async function routes(fastify,opts,done) {
    //     await fastify.get('/*', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    //       connection.socket.on('message', message => {
    //         // message.toString() === 'hi from client'
    //         fastify;
    //         connection.socket.send('hi from wildcard route')
    //       })
    //       done()
    //     })}

}

module.exports = routes; 