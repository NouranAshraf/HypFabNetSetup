export FABRIC_CFG_PATH=$PWD

../bin/cryptogen generate --config=./crypto-config.yaml

../bin/configtxgen -profile GenesisBlock -channelID sqs-sys-channel -outputBlock ./channel-artifacts/genesis.block

../bin/configtxgen -profile MainChannel -outputCreateChannelTx ./channel-artifacts/MainChannel.tx -channelID mainchannel

../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/SalesMSPanchors.tx -channelID mainchannel -asOrg SalesMSP
../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/ResourcingMSPanchors.tx -channelID mainchannel -asOrg ResourcingMSP
../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/EngagementManagementMSPanchors.tx -channelID mainchannel -asOrg EngagementManagementMSP

../bin/configtxgen -profile FirstChannel -outputCreateChannelTx ./channel-artifacts/FirstChannel.tx -channelID firstchannel
#../bin/configtxgen -profile FirstChannel -outputAnchorPeersUpdate ./channel-artifacts/SalesMSPanchors.tx -channelID firstchannel -asOrg SalesMSP
#../bin/configtxgen -profile FirstChannel -outputAnchorPeersUpdate ./channel-artifacts/ClientMSPanchors.tx -channelID firstchannel -asOrg ClientMSP

../bin/configtxgen -profile SecChannel -outputCreateChannelTx ./channel-artifacts/SecChannel.tx -channelID secchannel
#../bin/configtxgen -profile SecChannel -outputAnchorPeersUpdate ./channel-artifacts/SalesMSPanchors.tx -channelID secchannel -asOrg SalesMSP
#../bin/configtxgen -profile SecChannel -outputAnchorPeersUpdate ./channel-artifacts/EngagementManagementMSPanchors.tx -channelID secchannel -asOrg EngagementManagementMSP

../bin/configtxgen -profile ThirdChannel -outputCreateChannelTx ./channel-artifacts/ThirdChannel.tx -channelID thirdchannel
#../bin/configtxgen -profile ThirdChannel -outputAnchorPeersUpdate ./channel-artifacts/SalesMSPanchors.tx -channelID thirdchannel -asOrg SalesMSP
#../bin/configtxgen -profile ThirdChannel -outputAnchorPeersUpdate ./channel-artifacts/ResourcingMSPanchors.tx -channelID thirdchannel -asOrg ResourcingMSP

export IMAGE_TAG=latest

#docker-compose -f docker-compose-cli.yaml  -f docker-compose-couch.yaml -f docker-compose-etcdraft2.yaml up 

docker-compose -f docker-compose-cli.yaml -f docker-compose-etcdraft2.yaml up

docker ps -a
#docker exec -it cli bash
#CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/users/Admin@Sales.sqs.com/msp
#CORE_PEER_ADDRESS=peer0.Sales.sqs.com:7051
#CORE_PEER_LOCALMSPID="SalesMSP"
#CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Sales.sqs.com/peers/peer0.Sales.sqs.com/tls/ca.crt
#export CHANNEL_NAME=mainChannel
#peer channel create -o orderer.sqs.com:7050 -c mainchannel -f ./channel-artifacts/MainChannel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/sqs.com/orderers/orderer.sqs.com/msp/tlscacerts/tlsca.sqs.com-cert.pem
