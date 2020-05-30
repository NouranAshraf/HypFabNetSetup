package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"

)

// Chaincode provides functions for managing a Doc
type Chaincode struct {
	contractapi.Contract
}

//describes basic details of what makes up a doc
type Doc struct {
	Name     string `json:"name"`
	Doctype  string `json:"doctype"`
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Date     string `json:"date"`
	Time     string `json:"time"`
	Msg      string `json:"msg"`
}

func main() {
	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting chaincode: %s", err)
	}
}

func (t *Chaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {

    return shim.Success(nil)
}

func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {

// Extract the function and args from the transaction proposal
    function, args := stub.GetFunctionAndParameters()
	fmt.Println("invoke is running " + function)

	//Initializes a new Doc
	if function == "InitDoc" { 
		return t.InitDoc(stub, args)
    //Delete from world state	
	} else if function == "DeleteDoc" { 
		return t.DeleteDoc(stub, args)
	//Search Docs using a docname
	} else if function == "QueryDocByName" { 
		return t.QueryDocByName(stub, args)
	//Adds a msg 	
//	} else if function == "AddStateMsg" { 
//		return t.AddStateMsg(stub, args)
	//Retrieves all prev values for a doc	
	} else if function == "DocValueHistory" { 
		return t.DocValueHistory(stub, args)
	//Retrieves  a range of docs	
	} else if function == "GetDocsByRange" { 
		return t.GetDocsByRange(stub, args)
	// Search all Docs using any value	
    } else if function == "QueryAllDocByValue" { 
		return t.QueryAllDocByValue(stub, args)
	}

	fmt.Println("invoke did not find func: " + function)
	return shim.Error("Received unknown function invocation")	

}

// initDoc - create a new Doc, store into chaincode state
func (t *Chaincode) InitDoc(stub shim.ChaincodeStubInterface, args []string) pb.Response {

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
	err = stub.PutState(DocName, DocJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}
	fmt.Println("- end init marble")
	return shim.Success(nil)
}


// delete - remove a doc key/value pair from state
func (t *Chaincode) DeleteDoc(stub shim.ChaincodeStubInterface, args []string) pb.Response {
//	var jsonResp string
//	var DocJSON Doc
	var err error
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
func (t *Chaincode) QueryDocByName(stub shim.ChaincodeStubInterface, args []string) pb.Response {

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
func (t *Chaincode) QueryAllDocByValue(stub shim.ChaincodeStubInterface, args []string) pb.Response {

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

// getQueryResultForQueryString executes the passed in query string.
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(resultsIterator)
	if err != nil {
		return nil, err
	}

	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())

	return buffer.Bytes(), nil
}


func (t *Chaincode) DocValueHistory(stub shim.ChaincodeStubInterface, args []string) pb.Response {

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
func (t *Chaincode) GetDocsByRange(stub shim.ChaincodeStubInterface, args []string) pb.Response {

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

// constructQueryResponseFromIterator constructs a JSON array containing query results from

func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) (*bytes.Buffer, error) {
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return &buffer, nil
}

