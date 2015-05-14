#!/bin/bash

# Publish `123` to the `count` url
curl -X POST -d '123' http://127.0.0.1:3000/resources/count
