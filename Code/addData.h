#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/MySQL.h>
#include <Wt/Dbo/WtSqlTraits.h>
#include <memory>
#include <string>
#include "S4DatabaseClasses.h"

using namespace std; 

enum dataType
{
    eEmployee,
    eShift,
    eRole,
    eStore,
    eAvailability,
    eSchedule,
    eDesiredShiftHours,
    eEmployeeRole,
    eEmployeeStore
};

void insertData(dbo::Session *session, string dataType);
dataType findDataType(string const &inString);
void insertEmployeeData(dbo::Session *session);
void insertRoleData(dbo::Session *session);
void insertStoreData(dbo::Session *session);
void insertShiftData(dbo::Session *session);
void insertAvailabilityData(dbo::Session *session);
void insertScheduleData(dbo::Session *session);
void insertDesiredShiftHoursData(dbo::Session *session);
void insertEmployeeRoleData(dbo::Session *session);
void insertEmployeeStoreData(dbo::Session *session);
