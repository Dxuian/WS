const fastify = require('fastify')();

// Register the fastify-babel plugin
fastify.register(require('fastify-babel'), {
  babelrc: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    extensions: ['js', 'jsx'],
    plugins: ['bare-import-rewrite'],
  },
});

// Define the route
fastify.get('/', async (request, reply) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Hello, world!</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/js/app.js"></script>
      </body>
    </html>
  `;
  reply.type('text/html').send(html);
});

// Define the route for the JavaScript file
fastify.get('/js/app.js', async (request, reply) => {
  const js = `
    import React from 'react';
    import ReactDOM from 'react-dom';

    const App = () => {
      return <h1>Hello, world!</h1>;
    };

    ReactDOM.render(<App />, document.getElementById('root'));
  `;
  reply.type('application/javascript').send(js);
});

// Start the server
fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is running on port 3000');
});
