#include <string>
#include <iostream>
#include <fstream>
#include <time.h>

#include "scheduleGenerator.h"
#include "timeConverter.h"



#include "json/json.h"
#include "cppAPI.h"
using namespace std;
int main()
    {
        int shiftCount, employeeCount, employeeShiftCount, col;
        Json::Value shiftJson;
        Json::Value employeeShiftJson;
        Json::Value employeeJson;
        Json::Value hoursJson;


        // uncomment when ready for online connection eli 
        /*
        getShiftsForSchedule(2, shiftJson, shiftCount);
        getEmployeesForSchedule(2, employeeShiftJson, employeeShiftCount);
        getEmployees(employeeJson, employeeCount);
        getDesiredShiftHours(2, hoursJson)
            
        */

            
        // COMMENT FROM HERE
            
        ifstream shiftFile("inputData/test3Shifts.json",ifstream::binary);
        shiftFile >> shiftJson;
        shiftCount = 60;
            
            
        ifstream employeeForScheduleFile("inputData/test3EmployeesForSchedule.json",ifstream::binary);
        employeeForScheduleFile >> employeeShiftJson;
        employeeShiftCount = 360;
            

        ifstream employeeFile("inputData/test3Employees.json",ifstream::binary);
        employeeFile >> employeeJson;
        employeeCount = 12;


        ifstream hoursFile("inputData/test3Hours.json",ifstream::binary);
        hoursFile >> hoursJson;

        
        // TO HERE

        
        // get all shifts into Shift Type
        ShiftType shifts(shiftCount);
        ShiftType incomplete(shiftCount);
        EmployeeType employees(employeeCount);

        cout << "Data in" << endl;

        int loopIndex, row;
        int **availableIds;
        int *shiftIds = new int[shiftCount];

        for(loopIndex = 0; loopIndex < employeeCount; loopIndex++)
        {
            createNewEmployee(&employees, employeeJson[loopIndex]["id"].asInt(), hoursJson[loopIndex]["desiredHours"].asInt());

            employees.empArr[loopIndex].shiftList = new Shift[shiftCount];
        }

        cout << "Loop 1" << endl;
        // come back later and change to a dynamic allocation method to improve storage efficiency
        // each row is a shift and is filled with the employee ids of each worker that can work it
        availableIds = new int *[shiftCount];



        // fill up employees for shifts
        for (row = 0; row < shiftCount; row++)
        {
            // allocate space for array
            availableIds[row] = new int[employeeCount + 1];


            shiftIds[row] = shiftJson[row]["id"].asInt();

            int index, countIndex;
            col = 1;
            // loop through availability data -- w/ database
            for (countIndex = 0; countIndex < employeeShiftCount; countIndex++)
            {
                index = employeeShiftJson[countIndex]["shiftId"].asInt();
                // check if shiftId[row] matches shift id from data -- w/ database
                if (shiftIds[row] == index)
                {
                    // add employee id to availableIds[row][col]
                    availableIds[row][col] = employeeShiftJson[countIndex]["employee_id"].asInt();
                    col++;
                }
            }
            availableIds[row][0] = col;
        }
        cout << "Loop 2" << endl;
        // loop through availability data -- w/ database
        bool masterFilled = true;
        bool tempFilled;
        int nextStart = 0;
        int maxIndex = 0;
        // fill up shifts
        int shiftIndex;
        for (shiftIndex = 0; shiftIndex < shiftCount; shiftIndex++)
        {

            string startTime, endTime;
            //int weekInex;
                
            cout << "uploading shift to index " << shiftIndex << endl;

            startTime = shiftJson[shiftIndex]["startTime"].asString();
            endTime = shiftJson[shiftIndex]["endTime"].asString();

            shifts.sftArr[shiftIndex].startTime = convertTime(startTime);
            shifts.sftArr[shiftIndex].endTime = convertTime(endTime);
            shifts.sftArr[shiftIndex].id = shiftJson[shiftIndex]["id"].asInt();


            // no preset employee
            if(shiftJson[shiftIndex]["Employee_id"].asString() == "\0")
            {
                //cout << "Null worked!" << endl;
                shifts.sftArr[shiftIndex].empId = -1;
            }
            // preset employee
            else
            {
                   
                shifts.sftArr[shiftIndex].empId = shiftJson[shiftIndex]["Employee_id"].asInt();
                //cout << "Not null, inputted ID was " << shifts.sftArr[i].empId << endl;

                int validEmployee = employeeExists(&employees, shifts.sftArr[shiftIndex].empId);
                // check to make sure that is a valid employee
                if(validEmployee >= 0)
                {
                    addShiftToEmployee(shifts.sftArr[shiftIndex], validEmployee, &employees);
                    //cout << "Auto set employee into shift " << i << endl;
                }
                // otherwise let it be filled as normal
                else
                {
                    shifts.sftArr[shiftIndex].empId = -1;
                }
                
            }
            // NEW CODE 
            dateStringToInts(&shifts.sftArr[shiftIndex].day, &shifts.sftArr[shiftIndex].month, &shifts.sftArr[shiftIndex].year, shiftJson[shiftIndex]["date"].asString());
            //cout << "Shifts for schedule" << shifts.sftArr[i].id << shifts.sftArr[i].startTime << shifts.sftArr[i].endTime << endl;
            
            if(shiftIndex > 0 && !sameWeek(shifts.sftArr[shiftIndex-1], shifts.sftArr[shiftIndex]))
            {
                cout << "different weeks!" << endl;
                cout << "initial call!" << endl;
                tempFilled = fillShift(&shifts, &employees, nextStart, availableIds, &incomplete, &maxIndex);
                while(!tempFilled)
                {
                    cout << "Schedule failed, skipping shift" << endl;
                    deepCopyShiftType(&shifts, &incomplete);
                    tempFilled = fillShift(&shifts, &employees, maxIndex + 1, availableIds, &incomplete, &maxIndex);
                }
                
                
                masterFilled = tempFilled && masterFilled;
                resetEmployeeTime(employees);
                nextStart = shiftIndex;
            }
            else
            {
                //cout << "same week!" << endl;
            }
            
            shifts.shiftCount++;

            //cout << "shifts uploaded " << shifts.shiftCount << endl;
        }


        //cout << "Loop 3" << endl;


        //cout << "initial call!" << endl;
        tempFilled = fillShift(&shifts, &employees, nextStart, availableIds, &incomplete, &maxIndex);
        while(!tempFilled)
        {
            deepCopyShiftType(&shifts, &incomplete);
            tempFilled = fillShift(&shifts, &employees, maxIndex + 1, availableIds, &incomplete, &maxIndex);
        }
        masterFilled = tempFilled && masterFilled;


        if (masterFilled)
        {
            cout << "All shifts were filled, here is how!" << endl;
            //  uncomment when ready for online connection eli 
            //arrToJson(&shifts);

            for (shiftIndex = 0; shiftIndex < shifts.shiftCount; shiftIndex++)
            {
                cout << "Shift " << shifts.sftArr[shiftIndex].id << " employee: " << shifts.sftArr[shiftIndex].empId << endl;
            }
        }
        else
        {
            cout << "Unable to fill all shifts. Here was the best option." << endl;
            //  uncomment when ready for online connection eli 
            //arrToJson(&incomplete);

            for(shiftIndex = 0; shiftIndex < shifts.shiftCount; shiftIndex++)
            {
                cout << "Shift " << incomplete.sftArr[shiftIndex].id << " employee: " << incomplete.sftArr[shiftIndex].empId << endl;
            }
        }

        return 0;
    }