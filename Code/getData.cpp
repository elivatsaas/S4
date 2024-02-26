#include "getData.h"
#include "sqlConnection.h"

using namespace std;

// runs sql interactions
vector<Wt::Dbo::ptr<Employee>> getEmployees(dbo::Session *thisSession)
{
        //gets Employee Data Object, Prints names. Could be used to get any employee data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Employee>> query{thisSession->find<Employee>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Employee>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Employee>> vec{collection.begin(), collection.end()};
        return vec;
}
vector<Wt::Dbo::ptr<Shift>> getShifts(dbo::Session *thisSession)
{
        //gets Shift Data Object, Prints names. Could be used to get any shift data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Shift>> query{thisSession->find<Shift>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Shift>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Shift>> vec{collection.begin(), collection.end()};
        return vec;
}

vector<Wt::Dbo::ptr<Store>> getStores(dbo::Session *thisSession)
{
        //gets Store Data Object, Prints names. Could be used to get any store data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Store>> query{thisSession->find<Store>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Store>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Store>> vec{collection.begin(), collection.end()};
        return vec;
}

vector<Wt::Dbo::ptr<Role>> getRoles(dbo::Session *thisSession)
{
        //gets Store Data Object, Prints names. Could be used to get any store data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Role>> query{thisSession->find<Role>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Role>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Role>> vec{collection.begin(), collection.end()};
        return vec;
}

vector<Wt::Dbo::ptr<Schedule>> getSchedules(dbo::Session *thisSession)
{
        //gets Store Data Object, Prints names. Could be used to get any store data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Schedule>> query{thisSession->find<Schedule>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Schedule>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Schedule>> vec{collection.begin(), collection.end()};
        return vec;
}

vector<Wt::Dbo::ptr<Availability>> getAvailabilities(dbo::Session *thisSession)
{
        //gets Store Data Object, Prints names. Could be used to get any store data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<Availability>> query{thisSession->find<Availability>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<Availability>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<Availability>> vec{collection.begin(), collection.end()};
        return vec;
}
vector<Wt::Dbo::ptr<DesiredShiftHours>> getDSH(dbo::Session *thisSession)
{
        //gets Store Data Object, Prints names. Could be used to get any store data.
        dbo::Transaction transaction(*thisSession);

        Wt::Dbo::Query<Wt::Dbo::ptr<DesiredShiftHours>> query{thisSession->find<DesiredShiftHours>()};
        Wt::Dbo::collection<Wt::Dbo::ptr<DesiredShiftHours>> collection{query.resultList()};
        vector<Wt::Dbo::ptr<DesiredShiftHours>> vec{collection.begin(), collection.end()};
        return vec;
}





