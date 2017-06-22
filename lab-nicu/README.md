# READ ME
---
This allows you to create, read, update and delete burgers.
---
## Routes ```/api/burgers```

###**GET**  
```/api/burgers```
- Responds with the a message and a list of burger ids.
#### RESPONSE
```  
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Thu, 22 Jun 2017 18:59:25 GMT
Transfer-Encoding: chunked

{
    "Message": "Burger IDs Available",
    "ids": [
        "e271f5d0-577c-11e7-9082-85c98a8ff229"
    ]
}

```

```/api/burgers?id=xxxxx-xxxxx-xxxxx-xxxxx```
- Responds with a message with the burger info.
#### RESPONSE
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Thu, 22 Jun 2017 19:00:16 GMT
Transfer-Encoding: chunked

{
    "id": "e271f5d0-577c-11e7-9082-85c98a8ff229",
    "location": "Seattle,WA",
    "name": "Dope Burger",
    "stars": "5"
}
```
---
###**PUT**
```/api/burgers?id=xxxx-xxxxx-xxxxx-xxxxxx```
 -Updates the the burger based on id
#### REQUEST Body
 ```
 { name: 'Rafiki Burger', location: 'Seattle,WA', stars: '5' } 
 ```

#### RESPONSE
```
HTTP/1.1 202 Accepted
Connection: keep-alive
Content-Type: application/json
Date: Thu, 22 Jun 2017 19:09:27 GMT
Transfer-Encoding: chunked

{
    "Message": "Successfully updated",
    "UpdatedValues": {
        "id": "34b19ac0-577e-11e7-925a-9db87c4e92d3",
        "location": "Seattle,WA",
        "name": "Rafiki Burger",
        "stars": "5"
    }
}
```
---
##**DELETE**
- Deletes the burger item based on the id
```/api/burgers?id=34b19ac0-577e-11e7-925a-9db87c4e92d3```
- Responds with a STATUS CODE 204

