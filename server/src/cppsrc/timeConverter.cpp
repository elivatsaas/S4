#include <iostream>
#include <string>
#include "timeConverter.h"
using namespace std;




int convertTime(string toBeConverted)
{
    int timeNum;

    toBeConverted = formatTime(toBeConverted);
    timeNum = timeToNumber(toBeConverted);

    return timeNum;
}

string formatTime(string toBeFormatted)
{
    // removes the seconds
    toBeFormatted.pop_back(); // removes seconds col
    toBeFormatted.pop_back(); // removes 10 seconds col
    toBeFormatted.pop_back(); // removes : col

    int character = 0;
    int innerCharacter;
    int strLength = toBeFormatted.length();

    while(character < strLength)
    {
        if(toBeFormatted[character] == ':')
        {

            innerCharacter = character;

            while (innerCharacter < strLength)
            {
                toBeFormatted[innerCharacter] = toBeFormatted[innerCharacter + 1];
                innerCharacter++;
            }
            

        }
        else
        {
            character++;
        }

    }

    return toBeFormatted;
}


int timeToNumber(string time)
{
    int tempNum = stoi(time);
    int hour = tempNum / 100;
    int min = tempNum % 100;
    return (hour * 60) + min;
}
