#include <string>
#include <iostream>
#include <time.h>
#pragma once

using namespace std;

using namespace std;

extern "C"
{
    struct Shift
    {
        int day;
        int month;
        int year;
        
        int id;
        int startTime;
        int endTime;
        int empId;

        int length;
    };
    struct Employee
    {
        int id;
        int shiftCount = 0;
        Shift *shiftList;
        int timeRequested;
        int currentTime;

    };
    class ShiftType
    {
    private:
        int shiftsFilled;

    public:
        Shift *sftArr;
        int shiftCount;
        int totalTime;
        ShiftType()
        {
            shiftCount = 0;
            sftArr = new Shift[0];
            shiftsFilled = 0;
        }
        ShiftType(int sftCount)
        {
            shiftCount = 0;
            sftArr = new Shift[sftCount];
            shiftsFilled = 0;
        }
        void setShiftsFilled(int filledCount)
        {
            shiftsFilled = filledCount;
        }
        void incrementShiftsFilled()
        {
            setShiftsFilled(shiftsFilled + 1);
        }
        void decrementShiftsFilled()
        {
            setShiftsFilled(shiftsFilled - 1);
        }
        int getShiftsFilled()
        {
            return shiftsFilled;
        }
    };
    class EmployeeType
    {
    private:
        int arrSize;

    public:
        Employee *empArr;
        int employeeCount;
        int totalRequested;

        EmployeeType()
        {
            employeeCount = 0;
            empArr = new Employee[0];
            arrSize = 0;
        }
        EmployeeType(int empCount)
        {
            employeeCount = empCount;
            empArr = new Employee[empCount];
            arrSize = 0;
        }
        void setArrSize(int newSize)
        {
            arrSize = newSize;
        }
        void incrementArrSize()
        {
            setArrSize(arrSize + 1);
        }
        void decrementArrSize()
        {
            setArrSize(arrSize - 1);
        }
        int getArrSize()
        {
            return arrSize;
        }
    };

    // backtracking pseudo

    void addEmployeeToShift(int shiftIndex, int employeeId, ShiftType *shifts);

    void addShiftToEmployee(Shift shiftToAdd, int employeeIndex, EmployeeType *employees);

    bool checkForOverlap(Employee checkEmp, Shift checkShift);

    void dateStringToInts(int *day, int* month, int *year, string toConvert);

    void deepCopyShift(Shift *dest, Shift src);

    bool empInArray(Employee *array, int arrLen, int toFind);

    int employeeExists(EmployeeType *employees, int checkId);

    bool fillShift(ShiftType *shifts, EmployeeType *employees, int shiftIndex, int **availableIds, ShiftType *incompleteOption);

    bool intInArray(int *array, int arrLen, int toFind);

    void expectedOutput(int testVal);

    void setShifts(int testVal, ShiftType *shifts);

    void setIds(int testVal, int **availableIds, int *shiftIds);

    void setCount(int testVal, int *shiftCount, int *employeeCount);

    int DayOfWeek( int day, int month, int year );

    bool sameWeek( Shift shift1, Shift shift2);

    void resetEmployeeTime(EmployeeType employees);
}