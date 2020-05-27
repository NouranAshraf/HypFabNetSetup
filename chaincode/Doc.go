package main

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Chaincode provides functions for managing a Doc
type Chaincode struct {
	contractapi.Contract
}

//describes basic details of what makes up a doc
type Doc struct {
	Name   string `json:"name"`
	Doctype   string `json:"doctype"`
	Sender   string `json:"sender"`
	Receiver   string `json:"receiver"`
	Date   string `json:"date"`
	Time   string `json:"time"`
	Msg   string `json:"msg"`
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(Chaincode))

	if err != nil {
		fmt.Printf("Error create fabDocchaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fabDoc chaincode: %s", err.Error())
	}
}

func (t *SampleChaincode) Init(stub shim.ChainCodeStubInterface) peer.Response {

// Get the args from the transaction proposal

       args := stub.GetStringArgs()

       if len(args) != 2 {

                return shim.Error("Incorrect arguments. Expecting a key and a value")
}

// We store the key and the value on the ledger

       err := stub.PutState(args[0], []byte(args[1]))

       if err != nil {

               return shim.Error(fmt.Sprintf("Failed to create asset: %s", args[0]))

}

       return shim.Success(nil)

}

func (t *SampleChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

// Extract the function and args from the transaction proposal

      function, args := stub.GetFunctionAndParameters()
	switch function {
	//Initializes a new Doc
	case "InitDoc":
		return write(stub, args)  
	//Delete from world state	
	case "DeleteDoc":
		return read(stub, args)
	//Search Docs using a docname	
	case "QueryDocByName":
		return read(stub, args)		
	// Search all Docs using any value	
	case "QueryAllDocByValue":
		return read(stub, args)
	//Adds a msg 	
	case "AddStateMsg":
		return read(stub, args)	
	//Retrieves all prev values for a doc 	
	case "DocValueHistory":
		return read(stub, args)		
	//Retrieves  a range of docs
	case "GetDocsByRange":
		return read(stub, args)		
		
							
// Failed to get function and/or arguments from transaction proposal  
 		
	default:
		return shim.Error("unknown function")
       }

}

// initDoc - create a new Doc, store into chaincode state
func (t *SimpleChaincode) InitDoc(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	var err error

	//   0       1          2           3       4     5       6
	// "name", "type", "sender", "receiver", "date", "time", "msg"
	if len(args) != 7 {
		return shim.Error("Incorrect number of arguments. Expecting 7")
	}
	
	fmt.Println("- start init Doc")
	
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return shim.Error("3rd argument must be a non-empty string")
	}
	if len(args[3]) <= 0 {
		return shim.Error("4th argument must be a non-empty string")
	}
	if len(args[4]) <= 0 {
		return shim.Error("5th argument must be a non-empty string")
	}
	if len(args[5]) <= 0 {
		return shim.Error("6th argument must be a non-empty string")
	}
	if len(args[6]) <= 0 {
		return shim.Error("7th argument must be a non-empty string")
	}

	DocName := args[0]
	DocType := strings.ToLower(args[1])
	sender := strings.ToLower(args[2])
	receiver := strings.ToLower(args[3])
	date := strings.ToLower(args[4])
	time := strings.ToLower(args[5])			
	msg := strings.ToLower(args[6])


	// ==== Check if doc already exists ====
	DocAsBytes, err := stub.GetState(DocName)
	if err != nil {
		return shim.Error("Failed to get doc: " + err.Error())
	} else if DocAsBytes != nil {
		fmt.Println("This doc already exists: " + DocName)
		return shim.Error("This doc already exists: " + DocName)
	}

	fmt.Println("-start init doc")
	// ==== Create doc object and marshal to JSON ====
	Doc := &Doc{DocType, DocName, sender, receiver, date, time, msg}
	DocJSONasBytes, err := json.Marshal(Doc)
	if err != nil {
		return shim.Error(err.Error())
	}

	// === Save Doc to state ===
	err = stub.PutState(docName, DocJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}
}


// delete - remove a doc key/value pair from state
func (t *SimpleChaincode) DeleteDoc(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var jsonResp string
	var DocJSON Doc
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	DocName := args[0]

	fmt.Println("-start delete doc")

	err = stub.DelState(DocName) //remove the Doc from chaincode state
	if err != nil {
		return shim.Error("Failed to delete state:" + err.Error())
	}

	return shim.Success(nil)
}


// QueryDocByName queries for docs based on a passed in name.
// This is an example of a parameterized query where the query logic is baked into the chaincode,
// and accepting a single query parameter (name).
// Only available on state databases that support rich query (e.g. CouchDB)
func (t *SimpleChaincode) QueryDocByName(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	//   0
	// "docname"
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	DocName := strings.ToLower(args[0])

	queryString := fmt.Sprintf("{\"selector\":{\"DocType\":\"Doc\",\"DocName\":\"%s\"}}", DocName)

	queryResults, err := getQueryResultForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

// QueryAllDocByValue uses a query string to perform a query for docs.
// Query string matching state database syntax is passed in and executed as is.
// Supports ad hoc queries that can be defined at runtime by the client.
// Only available on state databases that support rich query (e.g. CouchDB)
// =========================================================================================
func (t *SimpleChaincode) QueryAllDocByValue(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	//   0
	// "queryString"
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryString := args[0]

	queryResults, err := getQueryResultForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (t *SimpleChaincode) DocvalueHistory(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	marbleName := args[0]

	fmt.Printf("- start getHistoryForDoc: %s\n", marbleName)

	resultsIterator, err := stub.GetHistoryForKey(marbleName)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		// if it was a delete operation on given key, then we need to set the
		//corresponding value null. Else, we will write the response.Value
		//as-is (as the Value itself a JSON marble)
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getHistoryForDoc returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

// GetDocsByRange performs a range query based on the start and end keys provided.
func (t *SimpleChaincode) GetDocsByRange(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) < 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	startKey := args[0]
	endKey := args[1]

	resultsIterator, err := stub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(resultsIterator)
	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Printf("- getMarblesByRange queryResult:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
