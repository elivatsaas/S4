#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/MySQL.h>
#include <Wt/Dbo/WtSqlTraits.h>
#include <memory>
#include <string>
#include "S4DatabaseClasses.h"
#include <iostream>
#include "sqlConnection.h"

using namespace std;

vector<Wt::Dbo::ptr<Employee>> getEmployees(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<Shift>> getShifts(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<Store>> getStores(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<Role>> getRoles(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<Schedule>> getSchedules(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<Availability>> getAvailabilities(dbo::Session *thisSession);
vector<Wt::Dbo::ptr<DesiredShiftHours>> getDSH(dbo::Session *thisSession);
