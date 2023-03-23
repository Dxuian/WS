const fastify = require("fastify")({ logger: true })
var data = require("./data.js");
const PORT = 5000;

fastify.register(require('@fastify/swagger'), {})
fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})

fastify.register(require("./route.js"));



var start = async () => {
    try {
        await fastify.listen({ port: PORT })
        fastify.log.info("hello");
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)

    }
}
start()
