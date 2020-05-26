const app = require('./server/express');
const apollo_Server = require('./server/apollo');
const chalk = require('chalk');
const PORT = process.env.PORT || 3000;
console.log('port is ', PORT);
const startServer = () => {
  apollo_Server.listen()
  .then(({ url }) => {
    console.log(chalk.magenta(`Apollo server listening at ${url}`));
    return true;
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Application now listening on PORT ${PORT}`)
      );
    })
    return true;
  })
  .catch(e => {
    console.log(chalk.red('Error starting server'))
  })
};

module.exports = startServer;
