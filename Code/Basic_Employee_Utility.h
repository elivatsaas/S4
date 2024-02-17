// Header File for Employee Class in S4
#ifndef EMPLOYEE_UTILITY_H
#define EMPLOYEE_UTILITY_H

// include necessary files
    // need time header file
#include <string>
#include <array>

// define namespace
using namespace std;

// enumeration for days of the week (used in availability array)
enum Weekday {MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY};

// Employee class will hold all
class Employee
{
    
    public:
    
    // will initialize/construct an employee variable with a name and Id
    Employee(string name, int employeeId);

    // will dsiplay all employee data
    void display(Employee employee) const;
    
    // gets employee start time for current day
    int getAvailabilityStart(int day) const;

    // gets employee end time for current day
    int getAvailabilityEnd(int day) const;

    // sets employee start time for given day
    void setAvailabilityStart(int day, int time);

    // sets employee end time for given day
    void setAvailabilityEnd(int day, int time);
    

    private:
    
    string name;
    int employeeId;
    int availabilityStart[7];
    int availabilityEnd[7];

};

// have a beginning of availability and end of availability array

// unavailable is 9999


#endif // EMPLOYEE_UTILITY_H
