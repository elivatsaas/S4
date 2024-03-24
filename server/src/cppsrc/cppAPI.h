#ifndef CPPAPI_H_INCLUDED
#define CPPAPI_H_INCLUDED

#include <curl/curl.h>
#include <iostream>
#include <cstring>
#include <string>
#include <json/json.h>



using namespace std;

 static size_t
    curlPutJson ( void *ptr, size_t size, size_t nmemb, void *_putData, int& length );

size_t write_callback(char* ptr, size_t size, size_t nmemb, void* userdata);

bool parseJsonResponse(const string& jsonResponse, Json::Value& parsedRoot);

void getShiftsForSchedule(int id, Json::Value& returnValue, int& length);

void getEmployeesForSchedule(int id, Json::Value& returnValue, int& length);

void getEmployees(Json::Value& returnValue, int& length);

int postJson(Json::Value& data, int length);

#endif
