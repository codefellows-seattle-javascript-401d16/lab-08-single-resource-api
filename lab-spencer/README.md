# Seahawks Players REST API

## Player Structure
```
let player = {
  id: id, // randomly generated
  name: name,
  height: height,
  weight: weight,
  position: position,
  picture: picture
};
```

This is how a player is formatted, for POST and PUT requests it should be this structure in a JSON string. For GET, PUT, and POST requests you will receive this response in a JSON string.

To GET, PUT, or DELETE a player, the querystring at the end of the url that you are requesting from should be in the format:
```
http://example.com?id=afsafas
```
