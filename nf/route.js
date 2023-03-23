var data = require("./data.js");
const url = require("url");

function routes(fastify,opts, done)
{
    fastify.get('/items/', (req, reply) => {
        var holder = url.parse(req.url, true)
        fastify.log.info(holder.search);
        if (holder.search == "?name=unnat&ln=4") {
            fastify.log.info("h4321");
            reply.send({ test: 'failed' });
        }
        else if (holder.search == "?name=unnat&ln=5") {
            fastify.log.info(data);
            reply.send({ test: 'success' , datas:data} )
        }
        else{
            reply.send({ test: 'failed' });
        }
        
    }
    )
    done()
}
module.exports = routes ; 