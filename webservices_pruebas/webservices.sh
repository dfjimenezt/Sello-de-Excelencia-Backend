#!/bin/bash

command=${1:-register}
file=${2:-login.json}
host="http://localhost:3000/api/"

if [ "$command" = "register_user" ]; then
	echo -e "\n--> "`date` ", "`curl -H "Content-Type: application/json" -X POST -d "@${file}" ${host}auth/${command}` >> log/register.log
	less log/register.log
elif [ "$command" = "register_evaluator" ]; then
	echo -e "\n--> "`date` ", "`curl -H "Content-Type: application/json" -X POST -d "@${file}" ${host}auth/${command}` >> log/register.log
	less log/register.log
elif [ "$command" = "login" ]; then
	echo -e "\n--> "`date`", "`curl -H "Content-Type: application/json" -X POST -d "@${file}" ${host}auth/login` >> log/login.log
	less log/login.log
elif [ "$command" = "get_institution" ]; then
	echo -e "\n--> "`date` ", "`curl ${host}place/institution` > log/institution.log
	less log/institution.json
elif [ "$command" = "register_institution" ]; then
	echo -e "\n--> "`date`", "`curl -H "Content-Type: application/json" -X POST -d "@${file}" ${host}place/register_institution` >> log/institution.log
	less log/institution.log
elif [ "$command" = "clear" ]; then
	rm -v log/* 
elif [ "$command" = "help" ]; then
	echo "webservices.sh [command]"
	echo "	register, registerjson, loginjson, clear"
fi
