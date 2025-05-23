require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  extensions: ['.js', '.jsx'],
});

const express = require('express');
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const App = require('./src/App').default;

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  const content = renderToString(
    React.createElement(StaticRouter, { location: req.url }, React.createElement(App))
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR POC with Routing</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/static/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
