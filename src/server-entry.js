require('babel-core/register')({
  only: [/tests/, /src/, /config/]
});
require('babel-polyfill');
require('./config/environment');

const debug = require('debug');
const hook = require('node-hook').hook;
const log = debug('lego: server-entry');
hook('.scss', () => '');
var extendRequire = require("isomorphic-loader/lib/extend-require");

require('./config/environment');

extendRequire()
  .then(() => {
    // important! this require must come after the isoTools server has started
    const createServer = require('./server/server'); //eslint-disable-line
    return createServer();
  })
  .then((server) => {
    server.listen(process.env.PORT, () => {
      console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
    });
  })
  .catch(e => log(e));
