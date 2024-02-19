// Function code for Employee Utility
#include "EmployeeUtilities.h"
#include <iostream>

using namespace std;

Employee::Employee(string name, int employeeId)
{

    name = name;
    employeeId = employeeId;

}

void Employee::display(Employee employee) const
{

    // declare variables
    int day;

    // display name and id of requested employee
    cout << "Employee: " << name << "; ID: \n\n" << employeeId;
    
    cout << "Avaiability: ";
    // dispay employee availability
    for (day = MONDAY; day <= SUNDAY; day++)
    {

        cout << availabilityStart[day] << "-" << availabilityEnd[day] << "; ";

    }

}

int Employee::getAvailabilityStart(int day) const
{

    return availabilityStart[day];

}

int Employee::getAvailabilityEnd(int day) const
{

    return availabilityEnd[day];

}

void Employee::setAvailabilityStart(int day, int time)
{

    availabilityStart[day] = time;

}

void Employee::setAvailabilityEnd(int day, int time)
{

    availabilityEnd[day] = time;

}
