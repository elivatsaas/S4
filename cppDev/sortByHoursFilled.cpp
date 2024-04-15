// Include Libraries
#include "scheduleGenerator.h"


void sortByHoursFilled(EmployeeType employees, int *availableIds)
{
    // Define variables 
    int size = availableIds[0];
    int index, tempIndex, firstId, secondId;
    double firstPercent, secondPercent;

    // Interate through avaiableId's array
    for ( index = 1; index < size; index++ )
    {
        // Get current and next index in array of ids
        firstId = availableIds[index];
        secondId = availableIds[index + 1];

        // Find first employee by id
        for ( tempIndex = 0; tempIndex < size - 1; tempIndex++ )
        {
            if ( employees.empArr[tempIndex].id == firstId )
            {
                // Calculate first percentage based on hours worked and requested hours
                firstPercent = employees.empArr[tempIndex].currentTime / employees.empArr[tempIndex].timeRequested;
            }
        }

        // Find second employee by id
        for ( tempIndex = 0; tempIndex < size - 1; tempIndex++ )
        {
            if ( employees.empArr[tempIndex].id == secondId )
            {
                // Calculate second percentage based on hours worked and requested hours
                secondPercent = employees.empArr[tempIndex].currentTime / employees.empArr[tempIndex].timeRequested;
            }
        }

        // If first employee percentage is greater than second employee percentage
        if ( firstPercent > secondPercent )
        {
            // Swap id's in availableIds array
            availableIds[index] = secondId;
            availableIds[index + 1] = firstId;
        }
    }
}

