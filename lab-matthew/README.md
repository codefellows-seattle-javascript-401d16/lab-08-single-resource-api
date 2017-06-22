# Create, Read, Update, Delete Animals with Superpowers and Professions!

This API lets the user create, read, update, or destroy objects with a name, species, profession, and power.

## Setting up

Required dependencies:

- uuid

To start the server, navigate to the API's directory in Node and in the terminal type:

- npm start

## To use

To begin creating, reading, updating, or destroying your superpowered animals with jobs, navigate to the API's directory in Node and in the terminal type the following for each respective action:

Create:

- echo '{"name" : "any name", "species" : "any species", "profession" : "any profession", "power" : "any power"}' | http POST localhost:3000/api/characters

Read:

- echo '{}' | http GET localhost:3000/api/characters?id=the-id-number-of-one-of-the-animals-you-created-with-put

Update:

- echo '{"name" : "updated name", "species" : "updated species", "profession" : "updated profession", "power" : "updated power"}' | http PUT localhost:3000/api/characters?id=the-id-number-of-one-of-the-animals-you-created-with-put

Delete

-  echo '{}' | http DELETE localhost:3000/api/characters?id=the-id-number-of-one-of-the-animals-you-created-with-put
