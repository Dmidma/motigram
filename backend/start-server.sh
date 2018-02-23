#!/bin/bash


MONGODB_PORT=8081

mongod --port $MONGODB_PORT --dbpath ./mongodb-data/ &
npm run dev


