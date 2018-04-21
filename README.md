# grenache-microservices-client


## Install
Unpackaged and install dependencies from both grenache-microservices-server and grenache-microservices-server

### Start two Grapes and connect them to each other:

>grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'

>grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'

## First run the server: 
Node server
## Then run the client
Node client

## How it works

**GET REQUETS TO: http://127.0.0.1:3000/**
Get the value of BTC as to simulate an operation and returns a hash as to follow its % gain, don’t worry if you “bought in bad”, each GET request to this URL restarts the operation as it has mutable data

**GET REQUEST TO: http://127.0.0.1:3000/check/{HASH}**
Gets the actual value of the BTC, the price you got in and the % gain you are doing.
