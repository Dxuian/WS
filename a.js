// const pino = require('pino-pretty')
//ss
require('dotenv').config();
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: "reqId,responseTime,req"
    }
  }
})
const fastify = require('fastify')({
  logger: logger
  /*envToLogger[environment] ?? true // defaults to true if no entry matches in the map*/
})
const path = require('path')
 global.app  = fastify.register(require("fastify-sqlite"),{
  promiseApi: true, 
  dbFile: './foo.db',
  verbose: true
})



// global.app = fastify.register(require('fastify-sqlite'),{
//   filename: './mydatabase.db',
//   driver: require('sqlite3'),
//   verbose: true
// })
fastify.register(require('@fastify/cookie'), {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
})

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
const fastifyStatic = require('@fastify/static')
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})




fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 }
})
fastify.register(require("./route.js"));



// const PORT = 5000 || process.env.PORT ;
// const port = process.env.PORT || 3000;
// // const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
// const host = process.env.WEBSITE_HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;
const host = process.env.WEBSITE_HOSTNAME || 'localhost';

var start = async () => {
  try {
    await fastify.listen({host: host, port: port }, function (err, address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    })
    fastify.log.info("UNNAT KA SERVER 1 IS STARTED AND READY TO GO !!!!!!");
    await app.ready() ;
  
    
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)

  }
}
start()





































































































































/*     ██╗██╗   ██╗███╗   ██╗██╗  ██╗    ██████╗ ███████╗██╗   ██╗ ██████╗ ███╗   ██╗██████╗     ████████╗██╗  ██╗██╗███████╗    ██████╗  ██████╗ ██╗███╗   ██╗████████╗    
     ██║██║   ██║████╗  ██║██║ ██╔╝    ██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔══██╗    ╚══██╔══╝██║  ██║██║██╔════╝    ██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝    
     ██║██║   ██║██╔██╗ ██║█████╔╝     ██████╔╝█████╗   ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ██║       ██║   ███████║██║███████╗    ██████╔╝██║   ██║██║██╔██╗ ██║   ██║       
██   ██║██║   ██║██║╚██╗██║██╔═██╗     ██╔══██╗██╔══╝    ╚██╔╝  ██║   ██║██║╚██╗██║██║  ██║       ██║   ██╔══██║██║╚════██║    ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║       
╚█████╔╝╚██████╔╝██║ ╚████║██║  ██╗    ██████╔╝███████╗   ██║   ╚██████╔╝██║ ╚████║██████╔╝       ██║   ██║  ██║██║███████║    ██║     ╚██████╔╝██║██║ ╚████║   ██║       
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝       
                                                                                                                                                                           */

// fastify.register(async function (fastify) {
//   fastify.get('/ws', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//     connection.socket.on('message', message => {
//       // message.toString() === 'hi from client'
//       connection.socket.send('hi from server')
//     })
//   })
// })
// require('@babel/register')({
//   ignore: [/\/(build|node_modules)\//],
//   presets: ['@babel/preset-react']
// });


// fastify
//   .register(require('@fastify/nextjs'), { dev: true })
//   .after(() => {
//     fastify.next('/hello')
//     fastify.next('/y')
    
//   })

  