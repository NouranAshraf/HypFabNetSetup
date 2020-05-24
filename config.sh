export FABRIC_CFG_PATH=$PWD

../bin/cryptogen generate --config=./crypto-config.yaml

../bin/configtxgen -profile GenesisBlock -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block

../bin/configtxgen -profile MainChannel -outputCreateChannelTx ./channel-artifacts/MainChannel.tx -channelID mainchannel

../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/SalesMSPanchors.tx -channelID mainchannel -asOrg SalesMSP

../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/ResourcingMSPanchors.tx -channelID mainchannel -asOrg ResourcingMSP

../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/EngagementManagementMSPanchors.tx -channelID mainchannel -asOrg EngagementManagementMSP

../bin/configtxgen -profile MainChannel -outputAnchorPeersUpdate ./channel-artifacts/ClientMSPanchors.tx -channelID mainchannel -asOrg ClientMSP

export IMAGE_TAG=latest

#docker-compose -f docker-compose-cli.yaml  -f docker-compose-etcdraft2.yaml up 

docker-compose -f docker-compose-cli.yaml -f docker-compose-etcdraft2.yaml up

docker ps -a
