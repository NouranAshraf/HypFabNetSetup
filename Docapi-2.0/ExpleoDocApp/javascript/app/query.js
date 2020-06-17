/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')
const helper = require('./helper')
const query = async (channelName, chaincodeName, args, fcn, username, orgName) => {

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
        const contract = network.getContract('mydoc');

        // Evaluate the specified transaction.
        let result;
        
         if (fcn == "InitDoc"){
        result= await contract.evaluateTransaction('InitDoc', args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result
        
        }else if (fcn == "DeleteDoc") {
        result= await contract.evaluateTransaction('DeleteDoc', args[0]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else if (fcn == "QueryDocByName") {
        result= await contract.evaluateTransaction('QueryDocByName', args[0]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else if (fcn == "QueryDocBySender") {
        result=  await contract.evaluateTransaction('QueryDocBySender', args[0]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else if (fcn == "DocValueHistory") {
        result= await contract.evaluateTransaction('DocValueHistory', args[0]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else if (fcn == "GetDocsByRange") {
        result= await contract.evaluateTransaction('GetDocsByRange', args[0], args[1]);
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else if (fcn == "GetAllDocs") {
        result= await contract.evaluateTransaction('GetAllDocs');
        console.log(result.toString())
        result = JSON.parse(result.toString());
        return result

        }else{
         return `Invocation require either createDocument or modifiyDocument or modifiyOfferState or addComment as function but got ${fcn}`
        }

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

exports.query = query
