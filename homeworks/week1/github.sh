#!/bin/bash

curl -silent https://api.github.com/users/$1 > temp.txt

for keyword in name bio location blog
do
	grep -w $keyword temp.txt | awk -F'"' '{print $4}'
done