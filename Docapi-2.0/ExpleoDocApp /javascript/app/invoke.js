/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets, TxEventHandler, GatewayOptions, DefaultEventHandlerStrategies, TxEventHandlerFactory } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger('sqsnetwork');
const util = require('util')
const helper = require('./helper')

const invokeTransaction = async (channelName, chaincodeName, fcn, args, username, orgName) => {

    try {
         // Defining connection profile and wallet name
        let orgPath = `ccp-${orgName}.json`;
        let walletName = `${orgName}-wallet`;
        let ccpPath = path.resolve(__dirname, '..', 'config', orgPath);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));


       // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), walletName);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username.toString());
        if (!identity) {
            console.log('An identity for the user username does not exist in the wallet');
            await helper.getRegisteredUser(username, orgName, true)
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username.toString(), discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mainchannel');

        // Get the contract from the network.
        const contract = network.getContract('doc');

        // Evaluate the specified transaction.
        let result;
        let message;
        
       if (fcn == "InitDoc"){
        result= await contract.submitTransaction('InitDoc', args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//         return message
//        result = JSON.parse(result.toString());
//        return result
        
        }else if (fcn == "DeleteDoc") {
        result= await contract.submitTransaction('DeleteDoc', args[0]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else if (fcn == "QueryDocByID") {
        result= await contract.submitTransaction('QueryDocByID', args[0]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else if (fcn == "QueryDocBySender") {
        result=  await contract.submitTransaction('QueryDocBySender', args[0]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else if (fcn == "DocValueHistory") {
        result= await contract.submitTransaction('DocValueHistory', args[0]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else if (fcn == "GetDocsByRange") {
        result= await contract.submitTransaction('GetDocsByRange', args[0], args[1]);
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else if (fcn == "GetAllDocs") {
        result= await contract.submitTransaction('GetAllDocs');
        console.log(result.toString())
        message = `Successfully modified offer state with key ${args[0]}`
//        return message
//        result = JSON.parse(result.toString());
//        return result

        }else{
         return `Invocation require either createDocument or modifiyDocument or modifiyOfferState or addComment as function but got ${fcn}`
        }
        
         let response = {
            message: message,
            //result
        }
        return response;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

exports.invokeTransaction = invokeTransaction;

