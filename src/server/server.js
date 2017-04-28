import Express from 'express';

// server side rendering
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../client/routes';
import createStore from '../client/redux/store';
import APIRoutes from './routes';
import cookie from 'react-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const PORT = 3000;
const app = Express();

let bodyParser = require('body-parser');
let morgan = require('morgan');

let config = require('./config'); // get our config file

app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//Mongoose
let mongoose = require('mongoose');

if (mongoose.connection.readyState !== 1) {
  mongoose.connect(config.database);
}

app.use('/api', APIRoutes);

app.use('/dist', Express.static('dist', { maxAge: '1d' }));

app.use((req, res) => {
  const history = createMemoryHistory(req.path);
  const store = createStore();
  cookie.setRawCookie(req.headers.cookie);
  cookie.save = res.cookie.bind(res);

  const matchParams = {
    history,
    routes,
    location: req.originalUrl
  };

  match(matchParams, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const muiTheme = getMuiTheme({
        userAgent: req.headers['user-agent'],
      });
      const reactString = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} muiTheme={muiTheme} />
        </Provider>
      );

      const reduxState = store.getState();

      const html = `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
                        <title>Universal React Boilerplate</title>
                        <script>
                            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)};
                        </script>
                      </head>
                      <body style="margin: 0">
                        <div id="reactDiv">${process.env.NODE_ENV === 'production' ? reactString : `<div>${reactString}</div>`}</div>
                        <script type="application/javascript" src="http://localhost:3002/dist/bundle.js"></script>
                      </body>
                    </html>`;

      res.end(html);
    } else {
      res.status(404).send('Not found');
    }
  });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

// export httpServer object so universal-hot-reload can access it
module.exports = httpServer;
