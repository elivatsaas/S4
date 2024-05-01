#include <string>
#include <iostream>
#include <fstream>
#include <time.h>

#include "scheduleGenerator.h"
#include "timeConverter.h"



#include "json/json.h"
#include "doctest.h"
#include "cppAPI.h"
using namespace std;

#include <cmath>
extern "C"
{
    void addEmployeeToShift(int shiftIndex, int employeeId, ShiftType *shifts)
    {
        shifts->sftArr[shiftIndex].empId = employeeId;
    }

    void addShiftToEmployee(Shift shiftToAdd, int employeeIndex, EmployeeType *employees)
    {
        //cout << "Employee Index being added: " << employeeIndex << endl;
        int addIndex = employees->empArr[employeeIndex].shiftCount;
        deepCopyShift(&employees->empArr[employeeIndex].shiftList[addIndex], shiftToAdd);
        //cout << "Shifts before increment " << employees->empArr[employeeIndex].shiftCount << endl;
        employees->empArr[employeeIndex].shiftCount = employees->empArr[employeeIndex].shiftCount + 1;
        //cout << "Shifts after increment " << employees->empArr[employeeIndex].shiftCount << endl;
        int addedTime = shiftToAdd.endTime - shiftToAdd.startTime;
        //cout << "adding " << addedTime << " minutes \n";
        //cout << "minutes before: " << employees->empArr[employeeIndex].currentTime << endl;
        employees->empArr[employeeIndex].currentTime += addedTime;
        //cout << "minutes after: " << employees->empArr[employeeIndex].currentTime << endl;
    }

    bool checkForOverlap(Employee checkEmp, Shift checkShift)
    {
        int shiftStart = checkShift.startTime;

        int shiftEnd = checkShift.endTime;


        int empStart, empEnd, empDay, empMonth, empYear;
        int shiftIndex;
        for(shiftIndex = 0; shiftIndex < checkEmp.shiftCount; shiftIndex++)
        {
            
            empDay = checkEmp.shiftList[shiftIndex].day;
            empMonth = checkEmp.shiftList[shiftIndex].month;
            empYear = checkEmp.shiftList[shiftIndex].year;
            empStart = checkEmp.shiftList[shiftIndex].startTime;

            empEnd = checkEmp.shiftList[shiftIndex].endTime;


            if((empStart == shiftStart) || (empStart < shiftStart && shiftStart < empEnd) 
                || (shiftStart < empStart && empStart < shiftEnd))
            {
                //cout << "Day comp " << checkShift.day << " to " << empDay << " Month comp " << checkShift.month << " to " << empMonth << " Year comp: " << checkShift.year << " to " << empYear << endl;
                if((checkShift.day == empDay) && (checkShift.month == empMonth) && (checkShift.year == empYear))
                {
                    //cout << "OVERLAP FOUND" << endl;
                    return true;
                }
            }
        }

        return false;
    }

    void createNewEmployee(EmployeeType *employees, int newId, int timeReq)
    {
        int arrSize = employees->getArrSize();

        employees->empArr[arrSize].id = newId;

        employees->empArr[arrSize].shiftCount = 0;

        employees->empArr[arrSize].currentTime = 0;

        employees->empArr[arrSize].timeRequested = timeReq * 60;

        employees->incrementArrSize();

    }

    void dateStringToInts(int *day, int* month, int *year, string toConvert)
    {
        //cout << toConvert << endl;
        char dayString[3], monthString[3], yearString[5];
        dayString[0] = toConvert[8];
        dayString[1] = toConvert[9];
        dayString[2] = '\0';
        


        monthString[0] = toConvert[5];
        monthString[1] = toConvert[6];
        monthString[2] = '\0';


        yearString[0] = toConvert[0];
        yearString[1] = toConvert[1];
        yearString[2] = toConvert[2];
        yearString[3] = toConvert[3];
        yearString[4] = '\0';


        //cout << "before stoi" << endl;
        *day = stoi(dayString);
        *month = stoi(monthString);
        *year = stoi(yearString);
        //cout << "after stoi" << endl;
        //cout << "Day: " << *day << endl;
        //cout << "Month: " << *month << endl;
        //cout << "Year: " << *year << endl;

    }

    void deepCopyShift(Shift *dest, Shift src)
    {
        dest->id = src.id;
        dest->startTime = src.startTime;
        dest->endTime = src.endTime;
        dest->empId = src.empId;
        dest->day = src.day;
        dest->month = src.month;
        dest->year = src.year;
    }

    void deepCopyShiftType(ShiftType *dest, ShiftType *src)
    {
        int shiftIndex;
        int newShiftsFilled = src->getShiftsFilled();
        dest->setShiftsFilled(newShiftsFilled);
        dest->shiftCount = src->shiftCount;
        for(shiftIndex = 0; shiftIndex < dest->shiftCount; shiftIndex++)
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
        //cout << "Id being serached for: " << checkId << endl;
        int loopLen = employees->employeeCount;

        int index;
        for (index = 0; index < loopLen; index++)
        {
            //cout << "Id at index " << index << " is " << employees->empArr[index].id << endl;
            if (employees->empArr[index].id == checkId)
            {
                return index;
            }
        }
        return -1;
    }

    // boolean function taking in a shift & employee data structure
    bool fillShift(ShiftType *shifts, EmployeeType *employees, int shiftIndex, int **availableIds, ShiftType *incompleteOption, int *maxIndex)
    {
        cout << "Trying to fill shift at index " << shiftIndex << endl;
        int index, empExists;
        if (shiftIndex > *maxIndex)
        {
            *maxIndex = shiftIndex;
        }
        if (shiftIndex == shifts->shiftCount)
        {
            return true;
        }
        else if (shifts->getShiftsFilled() > incompleteOption->getShiftsFilled())
        {
            deepCopyShiftType(incompleteOption, shifts); 
        }

        if (shifts->sftArr[shiftIndex].empId >= 0)
        {
            cout << "Employee prefilled" << endl;
            return fillShift(shifts, employees, shiftIndex + 1, availableIds, incompleteOption, maxIndex);
        }
        // sort available ids
        sortByHoursFilled(employees, availableIds, shiftIndex);
        

        // loop through available ids
        for (index = 1; index < availableIds[shiftIndex][0]; index++)
        {
            cout << endl << "Checking employee " << availableIds[shiftIndex][index] << " for shift " << shifts->sftArr[shiftIndex].id << endl;
            empExists = employeeExists(employees, availableIds[shiftIndex][index]);
            cout << "Employee Exists at index " << empExists << endl;
            if(!checkForOverlap(employees->empArr[empExists], shifts->sftArr[shiftIndex]))
            {
                // add shift
                addShiftToEmployee(shifts->sftArr[shiftIndex], empExists, employees);
                addEmployeeToShift(shiftIndex, availableIds[shiftIndex][index], shifts);
                shifts->incrementShiftsFilled();
                cout << "Employee " << availableIds[shiftIndex][index] << " now has " << employees->empArr[empExists].shiftCount << " shifts" << endl;
                //  recursively call for next shift
                if (fillShift(shifts, employees, shiftIndex + 1, availableIds, incompleteOption, maxIndex))
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

                    int removeTime = shifts->sftArr[shiftIndex].endTime - shifts->sftArr[shiftIndex].startTime;
                    //cout << "removing " << removeTime << " minutes \n";
                    //cout << "minutes before: " << employees->empArr[empExists].currentTime << endl;
                    employees->empArr[empExists].currentTime -= removeTime;
                    //cout << "minutes after: " << employees->empArr[empExists].currentTime << endl;
                }
            }

        }

        return false;
    }
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

    

    int DayOfWeek( int day, int month, int year )
    {
        // Define variables 
        int mon = month;
        // If month is Jan or Feb
        if(month < 3)
        {
            // Add 12 to mon
            mon = ( 12 + month );
            // Decrement the year
            year = year - 1; 
        }
        int lastYears = year % 100;
        int cent = year / 100;
        int weekday = (day + floor((13*(mon+1))/5) + lastYears + floor(lastYears/4) + floor(cent/4) + (5*cent));
        
        // Offset weekday by 5
        weekday = ( weekday + 5 ) % 7;
        // Return weekday as int
        return weekday;
    }


    bool sameWeek( Shift shift1, Shift shift2)
    {

        int day_1 = shift1.day;
        int month_1 = shift1.month;
        int year_1 = shift1.year;
        int day_2 = shift2.day;
        int month_2 = shift2.month;
        int year_2 = shift2.year;
    


        // Define variables 
        int weekday_1 = DayOfWeek(day_1, month_1, year_1);
        int weekday_2 = DayOfWeek(day_2, month_2, year_2);
        int diff = weekday_2 - weekday_1;

        // Add difference to day_1
        day_1 = day_1 + diff;
        // If month is Feb
        if ( month_1 == 2 )
        {
            // Check for leap year
            if ( year_1 % 4 == 0 && day_1 > 29)
            {
                day_1 = day_1 % 29;
                month_1 = month_1 + 1;
            }
            // Else not leap year
            else if ( day_1 > 28 )
            {
                day_1 = day_1 % 28;
                month_1 = month_1 + 1;
            }
        }
        // Check if month has 31 days and if day_1 increment to next month is needed
        else if ( (( month_1 < 8 && month_1 % 2 != 0 ) || ( month_1 > 7 && month_1 % 2 == 0 )) && day_1 > 31 )
        {
        day_1 = day_1 % 31;
        month_1 = month_1 + 1;
        }
        // Else month has 30 days. Check if increment to next month is needed
        else if ( day_1 > 30 )
        {
            day_1 = day_1 % 30;
        month_1 = month_1 + 1;
        }

        // Check if increment to next year is needed
        if ( month_1 == 13 )
        {
                month_1 = 1;
                year_1 = year_1 + 1;
        }

        // Check if dates are the same and return boolean
        return ( day_1 == day_2 && month_1 == month_2 && year_1 == year_2 );  
    }
    void resetEmployeeTime(EmployeeType employees)
    {
        int totalEmployees = employees.employeeCount;
        int index;
        for(index = 0; index < totalEmployees; index++)
        {
            employees.empArr[index].currentTime = 0;
        }
    }
    void sortByHoursFilled(EmployeeType *employees, int **availableIds, int shiftIndex)
    {
        // 
        int overtimeCount = 0;
        int overtimeIndex;
        int size = availableIds[shiftIndex][0];
        int outerIndex, innerIndex, swapVal;
        int leftEmpId, rightEmpId, leftEmpIndex, rightEmpIndex;
        double leftPer, rightPer;
        for(outerIndex = 1; outerIndex < size - 1; outerIndex++)
        {
            for(innerIndex = 1; innerIndex < size - outerIndex - 1; innerIndex++)
            {
                leftEmpId = availableIds[shiftIndex][innerIndex];
                rightEmpId = availableIds[shiftIndex][innerIndex + 1];
                leftEmpIndex = employeeExists(employees, leftEmpId);
                rightEmpIndex = employeeExists(employees, rightEmpId);
                leftPer = (double)employees->empArr[leftEmpIndex].currentTime / (double)employees->empArr[leftEmpIndex].timeRequested;
                rightPer = (double)employees->empArr[rightEmpIndex].currentTime / (double)employees->empArr[rightEmpIndex].timeRequested;
                if(leftPer > rightPer)
                {
                    swapVal = leftEmpId;
                    availableIds[shiftIndex][innerIndex] = availableIds[shiftIndex][innerIndex + 1];
                    availableIds[shiftIndex][innerIndex + 1] = swapVal;
                }
            }
        }
        for(overtimeIndex = 1; overtimeIndex < size; overtimeIndex++)
        {
            leftEmpIndex = employeeExists(employees, availableIds[shiftIndex][overtimeIndex]);
            int timeIn = employees->empArr[leftEmpIndex].currentTime;
            if(timeIn >= 2400)
            {
                swapVal = leftEmpIndex;
                availableIds[shiftIndex][overtimeIndex] = availableIds[shiftIndex][size - overtimeCount];
                availableIds[shiftIndex][size - overtimeCount] = swapVal;
                overtimeIndex--;
                overtimeCount++;
            }
        }
    }
}


