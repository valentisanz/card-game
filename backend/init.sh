#!/bin/bash

./gradlew clean build
java -jar ./build/libs/backend-0.0.1-SNAPSHOT.jar
