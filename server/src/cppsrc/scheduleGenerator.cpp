#include <string>
#include <iostream>
#include <time.h>
#include "scheduleGenerator.h"
#include "timeConverter.h"

// CURL
// #include <curl/curl.h>

// // JSON stuff
// #include "allocator.h"
// #include "assertions.h"
// #include "config.h"
// #include "forwards.h"
// #include "json.h"
// #include "json_features.h"
// #include "reader.h"
// #include "value.h"
// #include "version.h"
// #include "writer.h"
#include <json/json.h>
#include "cppAPI.h"
using namespace std;
extern "C"
{
    void addEmployeeToShift(int shiftIndex, int employeeId, ShiftType *shifts)
    {
        shifts->sftArr[shiftIndex].empId = employeeId;
    }

    void addShiftToEmployee(Shift shiftToAdd, int employeeIndex, EmployeeType *employees)
    {
        cout << "Employee Index being added: " << employeeIndex << endl;
        int addIndex = employees->empArr[employeeIndex].shiftCount;
        deepCopyShift(&employees->empArr[employeeIndex].shiftList[addIndex], shiftToAdd);
        cout << "Shifts before increment " << employees->empArr[employeeIndex].shiftCount << endl;
        employees->empArr[employeeIndex].shiftCount = employees->empArr[employeeIndex].shiftCount + 1;
        cout << "Shifts after increment " << employees->empArr[employeeIndex].shiftCount << endl;
    }

    bool checkForOverlap(Employee checkEmp, Shift checkShift)
    {
        int shiftStart = convertTime(checkShift.startTime);

        int shiftEnd = convertTime(checkShift.endTime);

        int empStart, empEnd, empDay, empMonth, empYear;
        int shiftIndex;
        for (shiftIndex = 0; shiftIndex < checkEmp.shiftCount; shiftIndex++)
        {
            empDay = checkEmp.shiftList[shiftIndex].day;
            empMonth = checkEmp.shiftList[shiftIndex].month;
            empYear = checkEmp.shiftList[shiftIndex].year;
            empStart = convertTime(checkEmp.shiftList[shiftIndex].startTime);

            empEnd = convertTime(checkEmp.shiftList[shiftIndex].endTime);

            if ((empStart == shiftStart) || (empStart < shiftStart && shiftStart < empEnd) || (shiftStart < empStart && empStart < shiftEnd) && (checkShift.day == empDay) && (checkShift.month == empMonth) && (checkShift.year == empYear))
            {
                return true;
            }
        }

        return false;
    }

    void createNewEmployee(EmployeeType *employees, int newId)
    {
        int arrSize = employees->getArrSize();

        employees->empArr[arrSize].id = newId;

        employees->empArr[arrSize].shiftCount = 0;

        employees->incrementArrSize();
    }

    void dateStringToInts(int *day, int *month, int *year, string toConvert)
    {
        string dayString, monthString, yearString;
        dayString[0] = toConvert[8];
        dayString[1] = toConvert[9];

        monthString[0] = toConvert[5];
        monthString[1] = toConvert[6];

        yearString[0] = toConvert[0];
        yearString[1] = toConvert[1];
        yearString[2] = toConvert[2];
        yearString[3] = toConvert[3];

        *day = stoi(dayString);
        *month = stoi(monthString);
        *year = stoi(yearString);
    }

    void deepCopyShift(Shift *dest, Shift src)
    {
        dest->id = src.id;
        dest->startTime = src.startTime;
        dest->endTime = src.endTime;
        dest->empId = src.empId;
    }

    void deepCopyShiftType(ShiftType *dest, ShiftType *src)
    {
        int shiftIndex;
        int newShiftsFilled = src->getShiftsFilled();
        dest->setShiftsFilled(newShiftsFilled);
        dest->shiftCount = src->shiftCount;
        for (shiftIndex = 0; shiftIndex < dest->shiftCount; shiftIndex++)
        {
            deepCopyShift(&dest->sftArr[shiftIndex], src->sftArr[shiftIndex]);
        }
    }

    bool empInArray(Employee *array, int arrLen, int toFind)
    {
        int checkIndex;
        for (checkIndex = 0; checkIndex < arrLen; checkIndex++)
        {
            if (array[checkIndex].id == toFind)
            {
                return true;
            }
        }
        return false;
    }

    int employeeExists(EmployeeType *employees, int checkId)
    {
        int loopLen = employees->getArrSize();
        int index;
        for (index = 0; index < loopLen; index++)
        {
            if (employees->empArr[index].id == checkId)
            {
                return index;
            }
        }
        return -1;
    }

    // boolean function taking in a shift & employee data structure
    bool fillShift(ShiftType *shifts, EmployeeType *employees, int shiftIndex, int **availableIds, ShiftType *incompleteOption)
    {
        int index, empExists;
        if (shiftIndex == shifts->shiftCount)
        {
            return true;
        }
        else if (shifts->getShiftsFilled() > incompleteOption->getShiftsFilled())
        {
            deepCopyShiftType(incompleteOption, shifts);
        }

        // loop through available ids
        for (index = 1; index < availableIds[shiftIndex][0] + 1; index++)
        {
            cout << endl
                 << "Checking employee " << availableIds[shiftIndex][index] << " for shift " << shifts->sftArr[shiftIndex].id << endl;
            empExists = employeeExists(employees, availableIds[shiftIndex][index]);
            // check if employee created locally
            if (empExists >= 0)
            {
                // check for no overlap
                cout << "Checking for overlap between employee " << availableIds[shiftIndex][index] << " and shift " << shifts->sftArr[shiftIndex].id << endl;
                if (!checkForOverlap(employees->empArr[empExists], shifts->sftArr[shiftIndex]))
                {
                    // add shift
                    addShiftToEmployee(shifts->sftArr[shiftIndex], empExists, employees);
                    addEmployeeToShift(shiftIndex, availableIds[shiftIndex][index], shifts);
                    shifts->incrementShiftsFilled();
                    // cout << "Employee " << availableIds[shiftIndex][index] << " now has " << employees->empArr[empExists].shiftCount << " shifts" << endl;
                    //  recursively call for next shift
                    if (fillShift(shifts, employees, shiftIndex + 1, availableIds, incompleteOption))
                    {
                        // if successful return true
                        return true;
                    }
                    // otherwise
                    else
                    {
                        // remove shift
                        employees->empArr[empExists].shiftCount--;
                        shifts->sftArr[shiftIndex].empId = -1;
                        shifts->decrementShiftsFilled();
                    }
                }
            }
            else
            {
                // if not

                // create employee locally
                createNewEmployee(employees, availableIds[shiftIndex][index]);

                empExists = employees->getArrSize() - 1;
                // add shift
                addShiftToEmployee(shifts->sftArr[shiftIndex], empExists, employees);
                addEmployeeToShift(shiftIndex, availableIds[shiftIndex][index], shifts);
                shifts->incrementShiftsFilled();
                // cout << "Employee " << availableIds[shiftIndex][index] << " now has " << employees->empArr[employees->employeeCount - 1].shiftCount << " shifts" << endl;

                if (fillShift(shifts, employees, shiftIndex + 1, availableIds, incompleteOption))
                {
                    // if successful return true
                    return true;
                }
                // otherwise
                else
                {
                    // remove shift
                    employees->empArr[empExists].shiftCount--;
                    shifts->sftArr[shiftIndex].empId = -1;
                    shifts->decrementShiftsFilled();
                }
            }
        }

        return false;
    }

    /*
    int getRandomValue(int low, int high)
    {
        int randomVal = rand();
        return (randomVal % (high - low)) + low;
    }

    int getUniqueRandom(int possibleRandoms, char code)
    {
        // initialize variables
        static int *arr = NULL;
        static int size = 0;
        int randomVal;
        // check for initilization case
        if(code == 'i')
        {
            // check for array NULL
            if(arr == NULL)
            {
                // allocate data for array
                arr = new int[possibleRandoms];
                // set size to zero
                size = 0;
                // set srand
                srand(time(NULL));

            }
        }
        // otherwise check for return random case
        else if(code == 'g')
        {
            // check for array not NULL
            if(arr != NULL)
            {
                // start loop for getting value
                do
                {
                    // get random while
                    randomVal = getRandomValue(1, possibleRandoms);
                }
                // end loop if value not found in array
                while(intInArray(arr, size, randomVal));
                // load the value into array
                arr[size] = randomVal;
                // increment the size
                size = size + 1;
                // return the value
                return randomVal;
            }
        }
        // otherwise check for deallocation
        else if(code == 'c')
        {
            // check for array not NULL
            if(arr != NULL)
            {
                // free the array
                delete arr;
                // set ptr to null
                arr = NULL;
                // set size to 0
                size = 0;
            }
        }
        // return no result
        return -1;




    }
    */
    bool intInArray(int *array, int arrLen, int toFind)
    {
        int checkIndex;
        for (checkIndex = 0; checkIndex < arrLen; checkIndex++)
        {
            if (array[checkIndex] == toFind)
            {
                return true;
            }
        }
        return false;
    }

    int main()
    {
        // get total employees and shifts to fill -- w/ database
        bool testing = false;
        int testVal = 1;
        int shiftCount, employeeCount, employeeShiftCount, col;
        Json::Value shiftJson;
        Json::Value employeeShiftJson;
        Json::Value employeeJson;
        // for testing
        int shiftIndex;
        if (!testing)
        {

            getShiftsForSchedule(2, shiftJson, shiftCount);

            getEmployeesForSchedule(2, employeeShiftJson, employeeShiftCount);

            getEmployees(employeeJson, employeeCount);
        }
        else
        {
            setCount(testVal, &shiftCount, &employeeCount);
        }

        // get all shifts into Shift Type
        ShiftType shifts(shiftCount);
        ShiftType incomplete(shiftCount);
        EmployeeType employees(employeeCount);

        int loopIndex, row;
        int **availableIds;
        int *shiftIds = new int[shiftCount];

        for (loopIndex = 0; loopIndex < employeeCount; loopIndex++)
        {
            employees.empArr[loopIndex].shiftList = new Shift[shiftCount];
        }
        // come back later and change to a dynamic allocation method to improve storage efficiency
        // each row is a shift and is filled with the employee ids of each worker that can work it
        availableIds = new int *[shiftCount];

        for (loopIndex = 0; loopIndex < shiftCount; loopIndex++)
        {
            availableIds[loopIndex] = new int[employeeCount + 1];
        }

        // loop through availability data -- w/ database

        if (!testing)
        {
            for (int i = 0; i < shiftCount; i++)
            {
                shiftIds[i] = shiftJson[i]["id"].asInt();
                shifts.sftArr[i].startTime = shiftJson[i]["startTime"].asString();
                shifts.sftArr[i].endTime = shiftJson[i]["endTime"].asString();
                shifts.sftArr[i].id = shiftJson[i]["id"].asInt();
                shifts.sftArr[i].empId = shiftJson[i]["Employee_id"].asInt();
                // NEW CODE
                dateStringToInts(&shifts.sftArr[i].day, &shifts.sftArr[i].month, &shifts.sftArr[i].year, shiftJson[i]["date"].asString());
                cout << "Shifts for schedule" << shifts.sftArr[i].id << shifts.sftArr[i].startTime << shifts.sftArr[i].endTime << endl;
            }

            for (row = 0; row < shiftCount; row++)
            {
                int index;
                col = 1;
                // loop through availability data -- w/ database
                for (int i = 0; i < employeeShiftCount; i++)
                {
                    index = employeeShiftJson[i]["shiftId"].asInt();
                    // check if shiftId[row] matches shift id from data -- w/ database
                    if (shiftIds[row] == index)
                    {
                        // add employee id to availableIds[row][col]
                        availableIds[row][col] = employeeShiftJson[i]["employee_id"].asInt();
                        col++;
                    }
                }
                availableIds[row][0] = col - 1;
            }
        }
        else
        {
            setIds(testVal, availableIds, shiftIds);
            setShifts(testVal, &shifts);
        }

        srand(time(NULL));

        bool filled = fillShift(&shifts, &employees, 0, availableIds, &incomplete);

        if (filled)
        {
            arrToJson(&shifts);

            for (shiftIndex = 0; shiftIndex < shifts.shiftCount; shiftIndex++)
            {
                cout << "Shift " << shifts.sftArr[shiftIndex].id << " employee: " << shifts.sftArr[shiftIndex].empId << endl;
            }
        }
        else
        {
            cout << "Unable to fill all shifts. Here was the best option." << endl;

            arrToJson(&incomplete);

            for (shiftIndex = 0; shiftIndex < shifts.shiftCount; shiftIndex++)
            {
                cout << "Shift " << incomplete.sftArr[shiftIndex].id << " employee: " << incomplete.sftArr[shiftIndex].empId << endl;
            }
        }

        if (testing)
        {
            expectedOutput(testVal);
        }

        return 0;
    }

    // Test functions
    void expectedOutput(int testVal)
    {
        if (testVal == 1)
        {
            cout << endl
                 << "Expected Output:" << endl;
            cout << "Shift 1 employee: 1" << endl;
            cout << "Shift 2 employee: 3" << endl;
            cout << "Shift 3 employee: 1" << endl;
            cout << "Shift 4 employee: 2" << endl;
            cout << "Shift 5 employee: 3" << endl;
        }
        else if (testVal == 2)
        {
            cout << endl
                 << "Expected Output:" << endl;
            cout << "Shift 1 employee: 2" << endl;
            cout << "Shift 2 employee: 5" << endl;
            cout << "Shift 3 employee: 6" << endl;
            cout << "Shift 4 employee: 1" << endl;
            cout << "Shift 5 employee: 10" << endl;
            cout << "Shift 6 employee: 2" << endl;
            cout << "Shift 7 employee: 7" << endl;
            cout << "Shift 8 employee: 3" << endl;
            cout << "Shift 9 employee: 4" << endl;
            cout << "Shift 10 employee: 6" << endl;
        }
        else if (testVal == 3)
        {
            cout << "Expected Output:" << endl;
            cout << "Unable to fill all shifts.";
        }
    }

    void setShifts(int testVal, ShiftType *shifts)
    {
        if (testVal == 1)
        {
            // FIRST SHIFT
            shifts->sftArr[0].startTime = "11:30:00";
            shifts->sftArr[0].endTime = "12:30:00";
            shifts->sftArr[0].id = 1;
            shifts->sftArr[0].day = 1;
            shifts->sftArr[0].month = 1;
            shifts->sftArr[0].year = 2000;
            // SECOND SHIFT
            shifts->sftArr[1].startTime = "12:00:00";
            shifts->sftArr[1].endTime = "12:30:00";
            shifts->sftArr[1].id = 2;
            shifts->sftArr[1].day = 1;
            shifts->sftArr[1].month = 1;
            shifts->sftArr[1].year = 2000;
            // THIRD SHIFT
            shifts->sftArr[2].startTime = "12:30:00";
            shifts->sftArr[2].endTime = "14:30:00";
            shifts->sftArr[2].id = 3;
            shifts->sftArr[2].day = 1;
            shifts->sftArr[2].month = 1;
            shifts->sftArr[2].year = 2000;
            // FOURTH SHIFT
            shifts->sftArr[3].startTime = "17:30:00";
            shifts->sftArr[3].endTime = "18:30:00";
            shifts->sftArr[3].id = 4;
            shifts->sftArr[3].day = 1;
            shifts->sftArr[3].month = 1;
            shifts->sftArr[3].year = 2000;
            // FIFTH SHIFT
            shifts->sftArr[4].startTime = "17:00:00";
            shifts->sftArr[4].endTime = "18:30:00";
            shifts->sftArr[4].id = 5;
            shifts->sftArr[4].day = 1;
            shifts->sftArr[4].month = 1;
            shifts->sftArr[4].year = 2000;
        }
        else if (testVal == 2)
        {
            // FIRST SHIFT
            shifts->sftArr[0].startTime = "8:00:00";
            shifts->sftArr[0].endTime = "12:00:00";
            shifts->sftArr[0].id = 1;
            shifts->sftArr[0].day = 1;
            shifts->sftArr[0].month = 1;
            shifts->sftArr[0].year = 2000;
            // SECOND SHIFT
            shifts->sftArr[1].startTime = "8:00:00";
            shifts->sftArr[1].endTime = "20:00:00";
            shifts->sftArr[1].id = 2;
            shifts->sftArr[1].day = 1;
            shifts->sftArr[1].month = 1;
            shifts->sftArr[1].year = 2000;
            // THIRD SHIFT
            shifts->sftArr[2].startTime = "8:00:00";
            shifts->sftArr[2].endTime = "14:00:00";
            shifts->sftArr[2].id = 3;
            shifts->sftArr[2].day = 1;
            shifts->sftArr[2].month = 1;
            shifts->sftArr[2].year = 2000;
            // FOURTH SHIFT
            shifts->sftArr[3].startTime = "8:00:00";
            shifts->sftArr[3].endTime = "12:00:00";
            shifts->sftArr[3].id = 4;
            shifts->sftArr[3].day = 1;
            shifts->sftArr[3].month = 1;
            shifts->sftArr[3].year = 2000;
            // FIFTH SHIFT
            shifts->sftArr[4].startTime = "8:00:00";
            shifts->sftArr[4].endTime = "12:00:00";
            shifts->sftArr[4].id = 5;
            shifts->sftArr[4].day = 1;
            shifts->sftArr[4].month = 1;
            shifts->sftArr[4].year = 2000;
            // SIXTH SHIFT
            shifts->sftArr[5].startTime = "12:00:00";
            shifts->sftArr[5].endTime = "18:00:00";
            shifts->sftArr[5].id = 6;
            shifts->sftArr[5].day = 1;
            shifts->sftArr[5].month = 1;
            shifts->sftArr[5].year = 2000;
            // SEVENTH SHIFT
            shifts->sftArr[6].startTime = "16:00:00";
            shifts->sftArr[6].endTime = "20:30:00";
            shifts->sftArr[6].id = 7;
            shifts->sftArr[6].day = 1;
            shifts->sftArr[6].month = 1;
            shifts->sftArr[6].year = 2000;
            // EIGHTH SHIFT
            shifts->sftArr[7].startTime = "12:00:00";
            shifts->sftArr[7].endTime = "16:00:00";
            shifts->sftArr[7].id = 8;
            shifts->sftArr[7].day = 1;
            shifts->sftArr[7].month = 1;
            shifts->sftArr[7].year = 2000;
            // NINTH SHIFT
            shifts->sftArr[8].startTime = "10:00:00";
            shifts->sftArr[8].endTime = "14:00:00";
            shifts->sftArr[8].id = 9;
            shifts->sftArr[8].day = 1;
            shifts->sftArr[8].month = 1;
            shifts->sftArr[8].year = 2000;
            // TENTH SHIFT
            shifts->sftArr[9].startTime = "14:00:00";
            shifts->sftArr[9].endTime = "20:00:00";
            shifts->sftArr[9].id = 10;
            shifts->sftArr[9].day = 1;
            shifts->sftArr[9].month = 1;
            shifts->sftArr[9].year = 2000;
        }
        else if (testVal == 3)
        {
            // FIRST SHIFT
            shifts->sftArr[0].startTime = "8:00:00";
            shifts->sftArr[0].endTime = "12:00:00";
            shifts->sftArr[0].id = 1;
            shifts->sftArr[0].day = 1;
            shifts->sftArr[0].month = 1;
            shifts->sftArr[0].year = 2000;
            // SECOND SHIFT
            shifts->sftArr[1].startTime = "12:00:00";
            shifts->sftArr[1].endTime = "20:00:00";
            shifts->sftArr[1].id = 2;
            shifts->sftArr[1].day = 1;
            shifts->sftArr[1].month = 1;
            shifts->sftArr[1].year = 2000;
            // THIRD SHIFT
            shifts->sftArr[2].startTime = "12:00:00";
            shifts->sftArr[2].endTime = "16:00:00";
            shifts->sftArr[2].id = 3;
            shifts->sftArr[2].day = 1;
            shifts->sftArr[2].month = 1;
            shifts->sftArr[2].year = 2000;
            // FOURTH SHIFT
            shifts->sftArr[3].startTime = "16:00:00";
            shifts->sftArr[3].endTime = "20:00:00";
            shifts->sftArr[3].id = 4;
            shifts->sftArr[3].day = 1;
            shifts->sftArr[3].month = 1;
            shifts->sftArr[3].year = 2000;
            // FIFTH SHIFT
            shifts->sftArr[4].startTime = "10:00:00";
            shifts->sftArr[4].endTime = "16:00:00";
            shifts->sftArr[4].id = 5;
            shifts->sftArr[4].day = 1;
            shifts->sftArr[4].month = 1;
            shifts->sftArr[4].year = 2000;
        }
    }

    void setIds(int testVal, int **availableIds, int *shiftIds)
    {
        if (testVal == 1)
        {
            for (int i = 0; i < 5; i++)
            {
                shiftIds[i] = i + 1;
            }
            // shift 1
            availableIds[0][1] = 1;
            availableIds[0][2] = 2;
            availableIds[0][0] = 2;
            // shift 2
            availableIds[1][1] = 1;
            availableIds[1][2] = 3;
            availableIds[1][0] = 2;
            // shift 3
            availableIds[2][1] = 1;
            availableIds[2][2] = 3;
            availableIds[2][0] = 2;
            // shift 4
            availableIds[3][1] = 2;
            availableIds[3][2] = 3;
            availableIds[3][0] = 2;
            // shift 5
            availableIds[4][1] = 2;
            availableIds[4][2] = 3;
            availableIds[4][0] = 2;
        }
        else if (testVal == 2)
        {
            for (int i = 0; i < 10; i++)
            {
                shiftIds[i] = i + 1;
            }
            // shift 1
            availableIds[0][1] = 2;
            availableIds[0][2] = 3;
            availableIds[0][0] = 2;
            // shift 2
            availableIds[1][1] = 5;
            availableIds[1][2] = 9;
            availableIds[1][0] = 2;
            // shift 3
            availableIds[2][1] = 6;
            availableIds[2][2] = 10;
            availableIds[2][0] = 2;
            // shift 4
            availableIds[3][1] = 1;
            availableIds[3][2] = 8;
            availableIds[3][0] = 2;
            // shift 5
            availableIds[4][1] = 4;
            availableIds[4][2] = 10;
            availableIds[4][0] = 2;
            // shift 6
            availableIds[5][1] = 2;
            availableIds[5][2] = 5;
            availableIds[5][0] = 2;
            // shift 7
            availableIds[6][1] = 7;
            availableIds[6][2] = 8;
            availableIds[6][0] = 2;
            // shift 8
            availableIds[7][1] = 3;
            availableIds[7][2] = 7;
            availableIds[7][0] = 2;
            // shift 9
            availableIds[8][1] = 1;
            availableIds[8][2] = 4;
            availableIds[8][0] = 2;
            // shift 10
            availableIds[9][1] = 6;
            availableIds[9][2] = 39;
            availableIds[9][0] = 2;
        }
        else if (testVal == 3)
        {
            for (int i = 0; i < 5; i++)
            {
                shiftIds[i] = i + 1;
            }
            // shift 1
            availableIds[0][1] = 1;
            availableIds[0][2] = 3;
            availableIds[0][0] = 2;
            // shift 2
            availableIds[1][1] = 2;
            availableIds[1][2] = 3;
            availableIds[1][0] = 2;
            // shift 3
            availableIds[2][1] = 2;
            availableIds[2][2] = 3;
            availableIds[2][0] = 2;
            // shift 4
            availableIds[3][1] = 2;
            availableIds[3][2] = 3;
            availableIds[3][0] = 2;
            // shift 5
            availableIds[4][1] = 2;
            availableIds[4][2] = 3;
            availableIds[4][0] = 2;
        }
    }

    void setCount(int testVal, int *shiftCount, int *employeeCount)
    {
        if (testVal == 1)
        {
            *shiftCount = 5;
            *employeeCount = 3;
        }
        else if (testVal == 2)
        {
            *shiftCount = 10;
            *employeeCount = 10;
        }
        else if (testVal == 3)
        {
            *shiftCount = 5;
            *employeeCount = 3;
        }
    }
}