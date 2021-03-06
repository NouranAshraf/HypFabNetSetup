'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const bodyParser = require('body-parser');
const http = require('http')
const util = require('util');
const express = require('express')
const app = express();
const cors = require('cors');
const constants = require('./config/constants.json')

const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;


const helper = require('./app/helper')
const invoke = require('./app/invoke')
const query = require('./app/query')

app.options('*', cors());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
    res.header("Access-Control-Allow-Headers", "Authorization");
    next()
    }) ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var server = http.createServer(app).listen(port, function () { console.log(`Server started on ${port}`) });
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;

function getErrorMessage(field) {
    var response = {
        success: false,
        message: field + ' field is missing or Invalid in the request'
    };
    return response;
}

//check for registered users
app.post('/login', async function (req, res) {
    var username = req.body.username;
    var orgName = req.body.orgName;
    console.log(username)
    console.log('orgName:', orgName)
    if (!username) {
        res.json(getErrorMessage('\'username\''));
        return;
    }
    if (!orgName) {
        res.json(getErrorMessage('\'orgName\''));
        return;
    }

    let response = await helper.getRegisteredUser(username, orgName, true,orgName);

    console.log(response)

    if (response && typeof response !== 'string') {
        logger.debug('usr is valid %s', username, orgName);
        res.json(response);
    } else {
        logger.debug('user is not valid %s with::%s', username, orgName, response);
        res.json({ success: false, message: response });
    }

});

// Register and enroll user
app.post('/users', async function (req, res) {
    var username = req.body.username;
    var orgName = req.body.orgName;
    console.log(username)
    console.log('orgName:', orgName)
    if (!username) {
        res.json(getErrorMessage('\'username\''));
        return;
    }
    if (!orgName) {
        res.json(getErrorMessage('\'orgName\''));
        return;
    }

    let response = await helper.getRegisteredUser(username, orgName, true,orgName);

    console.log(response)

    if (response && typeof response !== 'string') {
        logger.debug('Successfully registered the username %s for organization %s', username, orgName);
        res.json(response);
    } else {
        logger.debug('Failed to register the username %s for organization %s with::%s', username, orgName, response);
        res.json({ success: false, message: response });
    }

});

// Invoke transaction on chaincode on target peers
app.post('/invoke', async function (req, res) {
    try {
        logger.debug('==================== INVOKE ON CHAINCODE ==================');
        var orgName = req.body.orgName;
        var userName = req.body.userName;
        console.log('username:', userName)
        console.log('orgName:', orgName)
        var peers = req.body.peers;
        var chaincodeName = req.body.chaincodeName;
        var channelName = req.body.channelName;
        var fcn = req.body.fcn;
        var args = req.body.args;
        
        if (!chaincodeName) {
            res.json(getErrorMessage('\'chaincodeName\''));
            return;
        }
        if (!channelName) {
            res.json(getErrorMessage('\'channelName\''));
            return;
        }
        if (!fcn) {
            res.json(getErrorMessage('\'fcn\''));
            return;
        }
        if (!args) {
            res.json(getErrorMessage('\'args\''));
            return;
        }

        let message = await invoke.invokeTransaction(channelName, chaincodeName, fcn, args, userName, orgName);
        console.log(message);

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }
        res.send(response_payload);

    } catch (error) {
        const response_payload = {
            result: null,
            error: error.name,
            errorData: error.message
        }
        res.send(response_payload)
    }
});

app.post('/query', async function (req, res) {
    console.log(req.body)
    try {
        var orgName = req.body.orgName;
        var userName = req.body.userName;
        console.log('username:', userName)
        console.log('orgName:', orgName)
        var channelName = req.body.channelName;
        var chaincodeName = req.body.chaincodeName;
        let args = req.body.args;
        let fcn = req.body.fcn;
        let peer = req.body.peer;

        if (!chaincodeName) {
            res.json(getErrorMessage('\'chaincodeName\''));
            return;
        }
        if (!channelName) {
            res.json(getErrorMessage('\'channelName\''));
            return;
        }
        if (!fcn) {
            res.json(getErrorMessage('\'fcn\''));
            return;
        }
        if (!args) {
            res.json(getErrorMessage('\'args\''));
            return;
        }
        console.log('args==========', args);
        let message = await query.query(channelName, chaincodeName, args, fcn, userName, orgName);

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }

        res.send(response_payload);
    } catch (error) {
        const response_payload = {
            result: null,
            error: error.name,
            errorData: error.message
        }
        res.send(response_payload)
    }
});
