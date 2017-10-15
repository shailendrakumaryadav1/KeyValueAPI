# KeyValueAPI
Node.js project for time-based version-controlled key-value store with a HTTP API.

### Overview
Designed in Node.js, using Express web-framework, and Mongoose object modeling tool for MongoDB.
Further, Mocha testing framework is used, along with Chai assertion library.

###  Framework details
| | version |
| ------ | ------ |
| mongoose | v4.12.1 |
| express | v4.16.2 |
| mocha | v4.0.1 |
| chai | v4.1.2 |

### API Details
The API is able to:

1. Accept a key(string) and value(some json blob/string) {"key" : "value"} and store them. If an existing key is sent, the value should be updated

2. Accept a key and return the corresponding latest value

3. When given a key AND a timestamp, return whatever the value of the key at the time was.

### Example:

Method: POST
> Endpoint: /object
> Body: JSON: {"mykey" : "value1"}
> Time: 6.00 pm
> Response: {"key":"mykey", "value":"value1", "timestamp": time } //Where time is timestamp of the post request (6.00pm).

Method: GET
> Endpoint: /object/mykey
> Response: {"value": "value1" }

Method: POST
> Endpoint: /object
> Body: JSON: {"mykey" : "value2"}
> Time: 6.05 pm
> Response: {"key":"mykey", "value":"value2", "timestamp": time } //Where time is timestamp of the new value (6.05pm).

Method: GET
> Endpoint: /object/mykey
> Response: {"value": "value2" }

Method: GET
> Endpoint: /object/mykey?timestamp=1440568980 [6.03pm] // notice that the time here is not exactly 6.00pm
> Response: {"value": "value1" } // still return value 1 , because value 2 was only added at 6.05pm


**Reach out to me in case of any problem** Email : skyadav0893@gmail.com Phone : +65-81525574

