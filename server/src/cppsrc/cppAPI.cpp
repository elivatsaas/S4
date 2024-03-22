#include "cppAPI.h"
#include <curl/curl.h>
#include <iostream>
#include <cstring>
#include <string>
#include <json/json.h>



using namespace std;



static size_t
    curlPutJson ( void *ptr, size_t size, size_t nmemb, void *_putData, int& length )
    {
            Json::Value *putData = ( Json::Value * ) _putData;
            size_t realsize = ( size_t ) length;
            memcpy ( ptr, putData, realsize );
            return realsize;
    }




size_t write_callback(char* ptr, size_t size, size_t nmemb, void* userdata) {
    std::string& data = *static_cast<std::string*>(userdata);
    size_t len = size * nmemb;

    // append to the string:
    data.append(ptr, len);
    return len;
}
bool parseJsonResponse(const string& jsonResponse, Json::Value& parsedRoot) {
    Json::CharReaderBuilder builder;
    Json::CharReader *reader = builder.newCharReader();
    string errs;

    bool parsingSuccessful = reader->parse(jsonResponse.c_str(), jsonResponse.c_str() + jsonResponse.size(), &parsedRoot, &errs);
    delete reader;

    if (!parsingSuccessful) {
        cout << "Failed to parse JSON: "  << endl;
        return false;
    }

    return true;
}

void getShiftsForSchedule(int id, Json::Value& returnValue, int& length) {
    auto curl = curl_easy_init();
    if(curl) {
        string data; 
        string urlID = to_string(id);
        string url = "http://127.0.0.1:8080/api/v1/shifts/schedules/";
        url.append(urlID);
        char * cUrl = new char [url.length()+1];
        std::strcpy (cUrl, url.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, cUrl);
        curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);

        // provide a pointer to where you'd like to store the data:
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &data);

        // provide a callback function:
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);

        if(curl_easy_perform(curl) == CURLE_OK) {
            Json::Value root;
            if (parseJsonResponse(data, root)) {

                Json::Value shifts = root["shift"];
                returnValue = shifts;
                length = root["results"].asInt();

  
            }
        else {
            cout << "Failed to parse JSON" << endl;
        }
    }
         

        curl_easy_cleanup(curl);
    }
}


void getEmployeesForSchedule(int id, Json::Value& returnValue, int& length) {
    auto curl = curl_easy_init();
            
    if(curl) {
        string data;
        
        string urlID = to_string(id);
               
        string url = "http://127.0.0.1:8080/api/v1/schedules/find/";
 
        url.append(urlID);
        char * cUrl = new char [url.length()+1];
          
        std::strcpy (cUrl, url.c_str());
               
        curl_easy_setopt(curl, CURLOPT_URL, cUrl);
        curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);

        // provide a pointer to where you'd like to store the data:
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &data);

        // provide a callback function:
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);

        if(curl_easy_perform(curl) == CURLE_OK) {
            Json::Value root;
            if (parseJsonResponse(data, root)) {
                Json::Value shiftEmployees = root["returnValues"];
                returnValue = shiftEmployees;
                length = root["results"].asInt();
            }
        else {
            cout << "Failed to parse JSON" << endl;
        }
    }
        curl_easy_cleanup(curl);
    }
}


void getEmployees(Json::Value& returnValue, int& length) {
    auto curl = curl_easy_init();
            
    if(curl) {
        string data;
                
        string url = "http://127.0.0.1:8080/api/v1/employees/cpp";
 
        char * cUrl = new char [url.length()+1];
          
        std::strcpy (cUrl, url.c_str());
               
        curl_easy_setopt(curl, CURLOPT_URL, cUrl);
        curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);

        // provide a pointer to where you'd like to store the data:
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &data);

        // provide a callback function:
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);

        if(curl_easy_perform(curl) == CURLE_OK) {
            
            Json::Value root;
            if (parseJsonResponse(data, root)) {
                Json::Value employees = root["employees"];
                returnValue = employees;
                length = root["results"].asInt();
            }
        else {
            cout << "Failed to parse JSON" << endl;
        }
    }
        curl_easy_cleanup(curl);
    }
}

int postJson(Json::Value& data, int length){
  CURL *curl;
  CURLcode res;
  struct curl_slist *list = NULL;
    Json::FastWriter fastWriter;
    std::string jsonData = fastWriter.write(data);
    char * jsonDataChar = new char [jsonData.length()+1];
    std::strcpy (jsonDataChar, jsonData.c_str());


  string tempurl = "http://localhost:8080/api/v1/shifts/updatecpp";
    char * url = new char [tempurl.length()+1];
    std::strcpy (url, tempurl.c_str());
  /* get the file size of the local file */
  
 
 
  /* In windows, this inits the winsock stuff */
  curl_global_init(CURL_GLOBAL_ALL);
 
  /* get a curl handle */
  curl = curl_easy_init();
  if(curl) {
    /* we want to use our own read function */
    curl_easy_setopt(curl, CURLOPT_READFUNCTION, curlPutJson);
    /* enable uploading (implies PUT over HTTP) */
    curl_easy_setopt(curl, CURLOPT_UPLOAD, 1L);
    list = curl_slist_append(list, "Content-Type: application/json");
     curl_easy_setopt(curl, CURLOPT_HTTPHEADER, list);
    /* specify target URL, and note that this URL should include a file
       name, not only a directory */
       curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_easy_setopt(curl, CURLOPT_URL, url);
   // cout << jsonDataChar << endl;
    /* now specify which file to upload */
    curl_easy_setopt(curl, CURLOPT_COPYPOSTFIELDS, jsonDataChar);
    /* provide the size of the upload, we typecast the value to curl_off_t
       since we must be sure to use the correct data size */
    curl_easy_setopt(curl, CURLOPT_INFILESIZE_LARGE,
                     (curl_off_t)length);
    //cout << jsonDataChar << endl;
    /* Now run off and do what you have been told! */
    res = curl_easy_perform(curl);
    /* Check for errors */
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
 
    /* always cleanup */
    curl_easy_cleanup(curl);
  }
 
  curl_global_cleanup();
  return 0;
}


