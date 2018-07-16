import find from 'find';

const controller = require('../config/controller.js');
const gravity = require('../config/gravity.js');

module.exports = (app, passport, React, ReactDOMServer) => {
  let page;
  // ===========================================================
  // This constains constants needed to connect with Jupiter
  // ===========================================================
  // Loads Gravity module

  app.get('/admin', controller.isAppAdmin, (req, res) => {
    const messages = req.session.flash;
    const Page = require('../views/admin/index.jsx');

    req.session.flash = null;

    page = ReactDOMServer.renderToString(
      React.createElement(Page, {
        messages,
        name: 'Gravity - Admin',
        user: req.user,
        dashboard: true,
        public_key: req.session.public_key,
      }),
    );
    res.send(page);
  });

  app.get('/admin/tables', controller.isAppAdmin, (req, res) => {
    const messages = req.session.flash;
    const Page = require('../views/admin/tables.jsx');

    req.session.flash = null;

    page = ReactDOMServer.renderToString(
      React.createElement(Page, {
        messages,
        name: 'Gravity - App Tables',
        user: req.user,
        dashboard: true,
        public_key: req.session.public_key,
      }),
    );
    res.send(page);
  });

  app.get('/admin/api/app', controller.isAppAdmin, (req, res) => {
    gravity.loadAppData()
      .then((response) => {
        res.send({ success: true, application: response.app, tables: response.tables });
      })
      .catch((error) => {
        console.log(error);
        res.send({ success: false, message: 'There was an error retrieving app data' });
      });
  });

  app.get('/admin/api/:table', controller.isAppAdmin, (req, res, next) => {
    const table_name = req.params.table;
    const exceptions = [];
    let model = '';
    let model_found = false;

    // If table in route is in the exception list, then it goes lower in the route list
    if (exceptions.includes(table_name)) {
      next();
    } else {
      find.fileSync(/\.js$/, './models').forEach((file) => {
        const model_name = file.replace('models/', '').replace('.js', '');
        let is_included = table_name.includes(model_name) || false;
        if (table_name.includes('_')) {
          if (!model_name.includes('_')) {
            is_included = false;
          }
        }
        if (is_included) {
          model_found = true;
          model = model_name;
        }
      });

      const file = `../models/${model}.js`;

      if (!model_found) {
        res.send({ success: false, message: 'Invalid table', error: 'table-not-found' });
      } else {
        const Record = require(file);

        // We verify the user data here
        const recordObject = new Record({});
        recordObject.findAll()
          .then((response) => {
            res.send(response);
          })
          .catch((error) => {
            console.log(error);
            res.send({ success: false, errors: error });
          });
      }
    }
  });

  app.post('/admin/api/tables/balance', controller.isAppAdmin, (req, res) => {
    if (req.body.account) {
      gravity.getBalance(req.body.account)
        .then((response) => {
          res.send({ success: true, balances: response });
        })
        .catch((error) => {
          console.log(error);
          res.send({ success: false, message: 'There was an error retrieving app data' });
        });
    } else {
      res.send({ success: false, message: 'Address secret was not included in request' });
    }
  });
};