
// Include Libraries
#include <cmath>
#include <iostream>

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


bool sameWeek( int day_1, int month_1, int year_1, int day_2, int month_2, int year_2)
{
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