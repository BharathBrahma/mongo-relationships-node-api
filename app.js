const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app_utils = require('./utils/app_utils');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(app_utils.db_config.hostname, {useMongoClient : true});

//Mount other routes
const users = require('./routes/users');
const address = require('./routes/address');

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());

// App Routes
app.use('/users', users);
app.use('/address', address);


// Catch 440 Errors and forward them to an error handler 
app.use((req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to ourselves
    console.error(err);
});

// Start tthe server
const port = app.get('port') || process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port port ${port}.`));