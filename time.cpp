#include <iostream>
#include <string>
using namespace std;

string getTime();
string formatTime(string toBeFormatted);
bool getAm(string toBeChecked);
int timeToNumber(string time, bool am);
char toLowerCase(char testChar);


int main()
{
    string available;
    int timeNum;
    bool am;

    available = getTime();
    am = getAm(available);
    available = formatTime(available);
    timeNum = timeToNumber(available, am);

    cout << "Num is " << timeNum;

    return 0;
}

string getTime()
{
    string input;

    cout << "Enter A Time: ";
    cin >> input; 

    return input;
}

string formatTime(string toBeFormatted)
{
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
    cout << toBeFormatted << "\n";

    return toBeFormatted;
}

bool getAm(string toBeChecked)
{
    int character = 0;
    while(toBeChecked[character] != '\0')
    {
        if(toLowerCase(toBeChecked[character]) == 'a' && toLowerCase(toBeChecked[character + 1] == 'm'))
        {
            return true;
        }
        character++;
    }
    return false;
}

int timeToNumber(string time, bool am)
{
    int tempNum = stoi(time);
    int hour = tempNum / 100;
    int min = tempNum % 100;
    if(hour == 12)
    {
        hour = 0;
    }
    if(!am)
    {
        hour = hour + 12;
    }
    return (hour * 60) + min;
}

char toLowerCase(char testChar)
{
	if( testChar >= 'A' && testChar <= 'Z' )
	{
        return testChar - 'A' + 'a';
    }

    return testChar;
}
