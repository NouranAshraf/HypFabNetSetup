docker exec -it cli bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp
CORE_PEER_ADDRESS=peer0.Sales.sqs.com:7051
CORE_PEER_LOCALMSPID="SalesMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt
export CHANNEL_NAME=mainChannel
peer channel create -o orderer.sqs.com:7050 -c mainchannel -f ./channel-artifacts/MainChannel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem
 peer channel join -b mainchannel.block
 
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp CORE_PEER_ADDRESS=peer1.Sales.sqs.com:8051 CORE_PEER_LOCALMSPID="SalesMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer1.Sales.sqs.com/tls/ca.crt peer channel join -b mainchannel.block

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp CORE_PEER_ADDRESS=peer0.Resourcing.sqs.com:9051 CORE_PEER_LOCALMSPID="ResourcingMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt peer channel join -b mainchannel.block

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp CORE_PEER_ADDRESS=peer1.Resourcing.sqs.com:10051 CORE_PEER_LOCALMSPID="ResourcingMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer1.Resourcing.sqs.com/tls/ca.crt peer channel join -b mainchannel.block

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp CORE_PEER_ADDRESS=peer0.EngagementManagement.sqs.com:11051 CORE_PEER_LOCALMSPID="EngagementManagementMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt peer channel join -b mainchannel.block

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp CORE_PEER_ADDRESS=peer1.EngagementManagement.sqs.com:12051 CORE_PEER_LOCALMSPID="EngagementManagementMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer1.EngagementManagement.sqs.com/tls/ca.crt peer channel join -b mainchannel.block

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp CORE_PEER_ADDRESS=peer0.Sales.sqs.com:7051 CORE_PEER_LOCALMSPID="SalesMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt peer channel update -o orderer.sqs.com:7050 -c mainchannel -f ./channel-artifacts/SalesMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp CORE_PEER_ADDRESS=peer0.Resourcing.sqs.com:9051 CORE_PEER_LOCALMSPID="ResourcingMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt peer channel update -o orderer.sqs.com:7050 -c mainchannel -f ./channel-artifacts/ResourcingMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp CORE_PEER_ADDRESS=peer0.EngagementManagement.sqs.com:11051 CORE_PEER_LOCALMSPID="EngagementManagementMSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt peer channel update -o orderer.sqs.com:7050 -c mainchannel -f ./channel-artifacts/EngagementManagementMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

cd /opt/gopath/src/github.com/hyperledger/fabric-samples/chaincode/abstore/go
GO111MODULE=on go mod vendor
cd -
peer lifecycle chaincode package mydoc.tar.gz --path github.com/hyperledger/fabric-samples/chaincode/abstore/go/ --lang golang --label mydoc1

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp
CORE_PEER_ADDRESS=peer0.Sales.sqs.com:7051
CORE_PEER_LOCALMSPID="SalesMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp
CORE_PEER_ADDRESS=peer1.Sales.sqs.com:8051
CORE_PEER_LOCALMSPID="SalesMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer1.Sales.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp
CORE_PEER_ADDRESS=peer0.Resourcing.sqs.com:9051
CORE_PEER_LOCALMSPID="ResourcingMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp
CORE_PEER_ADDRESS=peer1.Resourcing.sqs.com:10051
CORE_PEER_LOCALMSPID="ResourcingMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer1.Resourcing.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp
CORE_PEER_ADDRESS=peer0.EngagementManagement.sqs.com:11051
CORE_PEER_LOCALMSPID="EngagementManagementMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp
CORE_PEER_ADDRESS=peer1.EngagementManagement.sqs.com:12051
CORE_PEER_LOCALMSPID="EngagementManagementMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer1.EngagementManagement.sqs.com/tls/ca.crt
peer lifecycle chaincode install mydoc.tar.gz 

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp
CORE_PEER_ADDRESS=peer0.Sales.sqs.com:7051
CORE_PEER_LOCALMSPID="SalesMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt
peer lifecycle chaincode approveformyorg --channelID mainchannel --name doc --version 2.0 --init-required --package-id mydoc1:d26468edcc0803c9e4523502186ba04634e183d8290c7d32a546a14bd0311ce1 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/users/Admin@Resourcing.sqs.com/msp
CORE_PEER_ADDRESS=peer0.Resourcing.sqs.com:9051
CORE_PEER_LOCALMSPID="ResourcingMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt
peer lifecycle chaincode approveformyorg --channelID mainchannel --name doc --version 2.0 --init-required --package-id mydoc1:d26468edcc0803c9e4523502186ba04634e183d8290c7d32a546a14bd0311ce1 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/users/Admin@EngagementManagement.sqs.com/msp
CORE_PEER_ADDRESS=peer0.EngagementManagement.sqs.com:11051
CORE_PEER_LOCALMSPID="EngagementManagementMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt
peer lifecycle chaincode approveformyorg --channelID mainchannel --name doc --version 2.0 --init-required --package-id mydoc1:d26468edcc0803c9e4523502186ba04634e183d8290c7d32a546a14bd0311ce1 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem

peer lifecycle chaincode checkcommitreadiness --channelID mainchannel --name doc --version 2.0 --init-required --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem --output json

peer lifecycle chaincode commit -o orderer.sqs.com:7050 --channelID mainchannel --name doc --version 2.0 --sequence 1 --init-required --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt

peer chaincode invoke -o orderer.sqs.com:7050 --isInit --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc  --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt  --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["init"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["InitDoc", "0","Doc1","Allianz","Resourcing","Sales", "confirmation", "resources confirmed","background.jpg"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["DeleteDoc","0"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["QueryDocByID","0"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["DocValueHistory","0"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["GetDocsByRange","0","2"]}' --waitForEvent

peer chaincode invoke -o orderer.sqs.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem -C mainchannel -n doc --peerAddresses peer0.Sales.sqs.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt --peerAddresses peer0.Resourcing.sqs.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Resourcing.sqs.com/peers/peer0.Resourcing.sqs.com/tls/ca.crt --peerAddresses peer0.EngagementManagement.sqs.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/EngagementManagement.sqs.com/peers/peer0.EngagementManagement.sqs.com/tls/ca.crt -c '{"Args":["GetAllDocs"]}' --waitForEvent

#export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem
#peer lifecycle chaincode commit -o orderer.sqs.com:7050 --channelID mainchannel --name doc --version 2.0 --sequence 1 --init-required --tls --cafile $ORDERER_CA --peerAddresses peer0.Sales.sqs.com:7051 --peerAddresses peer0.Resourcing.sqs.com:9051 --peerAddresses peer0.EngagementManagement.sqs.com:11051
#peer chaincode instantiate -n doc -v 2.0 -c '{“Args”:["Doc1","pdf"]}' -C mainchannel
#peer chaincode -C mainchannel list --instantiated
#peer chaincode upgrade -n Doc -p github.com/hyperledger/fabric-samples/chaincode/abstore/go
#peer lifecycle chaincode queryinstalled
#CC_PACKAGE_ID=mydoc1:d26468edcc0803c9e4523502186ba04634e183d8290c7d32a546a14bd0311ce1




