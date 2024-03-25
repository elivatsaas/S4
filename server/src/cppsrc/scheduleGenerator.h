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
        int id;
        string startTime;
        string endTime;
        int empId;
    };
    struct Employee
    {
        int id;
        int shiftCount = 0;
        // need to make this dynamically sized eventually
        Shift shiftList[40];
    };
    class ShiftType
    {
    private:
        int arrSize;

    public:
        Shift *sftArr;
        int shiftCount;
        ShiftType()
        {
            shiftCount = 0;
            sftArr = new Shift[0];
            arrSize = 0;
        }
        ShiftType(int sftCount)
        {
            shiftCount = sftCount;
            sftArr = new Shift[sftCount];
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
    class EmployeeType
    {
    private:
        int arrSize;

    public:
        Employee *empArr;
        int employeeCount;

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

    void deepCopyShift(Shift *dest, Shift src);

    bool empInArray(Employee *array, int arrLen, int toFind);

    int employeeExists(EmployeeType *employees, int checkId);

    bool fillShift(ShiftType *shifts, EmployeeType *employees, int shiftIndex, int **availableIds);

    bool intInArray(int *array, int arrLen, int toFind);

    void expectedOutput(int testVal);

    void setShifts(int testVal, ShiftType *shifts);

    void setIds(int testVal, int **availableIds, int *shiftIds);

    void setCount(int testVal, int *shiftCount, int *employeeCount);
}