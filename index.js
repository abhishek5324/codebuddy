const chalk = require('chalk');
const app = require('./src/app');
const env = require("./constants");
const { connect } = require('./src/helpers/db.helper');

connect().then(() => {
    const port = env.PORT
    app.listen(port, () => {
        console.log(chalk.green(`Server started on port http://localhost:${port}`));
    });
}).catch(err => {
    console.log(err);
    process.exit(1);
});