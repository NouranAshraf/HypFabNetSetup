'use strict';

var { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');

const util = require('util');




const getCCP = async (org) => {
    let ccpPath;
    if (org == "Sales") {
        ccpPath = path.resolve(__dirname, '..', 'config', 'ccp-Sales.json');

    } else if (org == "Resourcing") {
        ccpPath = path.resolve(__dirname, '..', 'config', 'ccp-Resourcing.json');

    } else if (org == "EngagementManagement") {
        ccpPath = path.resolve(__dirname, '..', 'config', 'ccp-EngagementManagement.json');
        
    } else if (org == "Client") {
        ccpPath = path.resolve(__dirname, '..', 'config', 'ccp-Client.json');                
    } else
        return null
    const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
    const ccp = JSON.parse(ccpJSON);
//    console.log(ccp.peers)
    return ccp
}

const getCaUrl = async (org, ccp) => {
    let caURL ;
    if (org == "Sales") {
        caURL = ccp.certificateAuthorities['ca.Sales.sqs.com'].url;

    } else if (org == "Resourcing") {
        caURL = ccp.certificateAuthorities['ca.Resourcing.sqs.com'].url;
        
    } else if (org == "EngagementManagement") {
        caURL = ccp.certificateAuthorities['ca.EngagementManagement.sqs.com'].url;
        
    } else if (org == "Client") {
        caURL = ccp.certificateAuthorities['ca.Client.sqs.com'].url;
        
    } else
        return null
    return caURL

}

const getWalletPath = async (org) => {
    let walletPath;
    if (org == "Sales") {
        walletPath = path.join(process.cwd(), 'Sales-wallet');

    } else if (org == "Resourcing") {
        walletPath = path.join(process.cwd(), 'Resourcing-wallet');
    } else if (org == "EngagementManagement") {
        walletPath = path.join(process.cwd(), 'EngagementManagement-wallet');
        
    } else if (org == "Client") {
        walletPath = path.join(process.cwd(), 'Client-wallet');
        
    } else
        return null
    return walletPath

}


const getAffiliation = async (org) => {
       return org == "Sales" ? 'org1.department1' : 'org2.department1'
}

const getRegisteredUser = async (username, userOrg, isJson) => {
    let ccp = await getCCP(userOrg)

    const caURL = await getCaUrl(userOrg, ccp)
    const ca = new FabricCAServices(caURL);

    const walletPath = await getWalletPath(userOrg)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(username);
    if (userIdentity) {
        console.log(`An identity for the user ${username} already exists in the wallet`);
        var response = {
            success: true,
            message: username + ' enrolled Successfully',
        };
        return response
    }

    // Check to see if we've already enrolled the admin user.
    let adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
        console.log('An identity for the admin user "admin" does not exist in the wallet');
        await enrollAdmin(userOrg, ccp);
        adminIdentity = await wallet.get('admin');
        console.log("Admin Enrolled Successfully")
    }

    // build a user object for authenticating with the CA
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: await getAffiliation(userOrg), enrollmentID: username, role: 'client' }, adminUser);
    // const secret = await ca.register({ affiliation: 'Sales.department1', enrollmentID: username, role: 'client', attrs: [{ name: 'role', value: 'approver', ecert: true }] }, adminUser);

    const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
    // const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret, attr_reqs: [{ name: 'role', optional: false }] });

    let x509Identity;
    if (userOrg == "Sales") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'SalesMSP',
            type: 'X.509',
        };
    } else if (userOrg == "Resourcing") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'ResourcingMSP',
            type: 'X.509',
        };
    }
    
      else if (userOrg == "EngagementManagement") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'EngagementManagementMSP',
            type: 'X.509',
        };
    } else if (userOrg == "Client") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'ClientMSP',
            type: 'X.509',
        };
    }    

    await wallet.put(username, x509Identity);
    console.log(`Successfully registered and enrolled admin user ${username} and imported it into the wallet`);

    var response = {
        success: true,
        message: username + ' enrolled Successfully',
    };
    return response
}


const getCaInfo = async (org, ccp) => {
    let caInfo
    if (org == "Sales") {
        caInfo = ccp.certificateAuthorities['ca.Sales.sqs.com'];

    } else if (org == "Resourcing") {
        caInfo = ccp.certificateAuthorities['ca.Resourcing.sqs.com'];

    } else if (org == "EngagementManagement") {
        caInfo = ccp.certificateAuthorities['ca.EngagementManagement.sqs.com'];

    } else if (org == "Client") {
        caInfo = ccp.certificateAuthorities['ca.Client.sqs.com'];
        
    } else
        return null
    return caInfo

}

const enrollAdmin = async (org, ccp) => {

    console.log('calling enroll Admin method')

    try {

        const caInfo = await getCaInfo(org, ccp) //ccp.certificateAuthorities['ca.Sales.sqs.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = await getWalletPath(org) //path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        let x509Identity;
        if (org == "Sales") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'SalesMSP',
                type: 'X.509',
            };
        } else if (org == "Resourcing") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'ResourcingMSP',
                type: 'X.509',
            };
        }
       
      else if (userOrg == "EngagementManagement") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'EngagementManagementMSP',
            type: 'X.509',
        };
    } else if (userOrg == "Client") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'ClientMSP',
            type: 'X.509',
        };
    }    
        


        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        return


    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }


}


exports.getRegisteredUser = getRegisteredUser

module.exports = {
    getCCP: getCCP,
    getWalletPath: getWalletPath,
    getRegisteredUser: getRegisteredUser

}
