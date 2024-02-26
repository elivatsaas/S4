#include "addData.h"
#include "sqlConnection.h"
using namespace std;


int main(int argc, char **argv)
{
    dbo::Session session;
	S4::InitializeSession(session);
    dbo::Transaction transaction(session);

    string dataType;
    cout << "Choose a Data Type to Insert:\nEmployee\nShift\nRole\nStore\nAvailabiity\nSchedule\nDesiredShiftHours\nEmployeeRole\nEmployeeStore\n";
    cin >> dataType;
    insertData(&session, dataType);
}