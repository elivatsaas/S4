#include "cppAPI.h"
#include <iostream>
#include <string>
#include <json/json.h>

int main() {
    //get all shifts for schedule id 1 
    Json::Value returnValue;
    int dataLength;
    getShiftsForSchedule(1, returnValue, dataLength);
    //print shifts
    // cout << "shifts =" << returnValue << endl;
    //print length of array
    // cout << "length =" << dataLength << endl;
    //iterate through shifts, get id
    //     for (int i = 0; i < dataLength; i++) {
        //returnValue[i]["id"].asInt(); to get int, functions for every datatype
    //  cout << "Shift ID:" << returnValue[i]["id"] << "\n";
    //     }

    //get employees available for all shifts on schedule
    Json::Value returnValue1;
    int dataLength1;
    getEmployeesForSchedule(1, returnValue1, dataLength1);
    // cout << "shiftEmployeess =" << returnValue1 << endl;
    // cout << "length =" << dataLength1 << endl;

    //set all employee ids to 1
        //     for (int j = 0; j < dataLength; j++) {
        //      returnValue[j]["Employee_id"] = 1;
        // }
    
    // get number of employees
    int employeeLength;
    Json::Value returnValue2;

    getEmployees(returnValue2, employeeLength);
    cout << employeeLength << endl;
    cout << returnValue2 << endl;
    //post to database
    postJson(returnValue, dataLength);

    return 0;
}