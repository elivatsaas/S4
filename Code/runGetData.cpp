#include "addData.h"
#include "sqlConnection.h"

int main(int argc, char **argv)
{

    dbo::Session session;
	S4::InitializeSession(session);
    dbo::Transaction transaction(session);


    
   //Get employee info
    vector<Wt::Dbo::ptr<Employee>> employeeVec = getEmployees(&session);
    
    //Iterate through employee info
    for (Wt::Dbo::ptr<Employee> employee : employeeVec)
    {
     cout << " Employee " << employee->firstName << " " << employee->lastName << " Employee ID is  " << employee.id() << endl;
     cout << "Employee Email:" << employee->email << " Employee Phone Number " << employee->phoneNumber << endl;

    }
    
    //get employee info
    vector<Wt::Dbo::ptr<Employee>> employeeSVec = getEmployees(&session);
    
    //iterate through employee info
    for (Wt::Dbo::ptr<Employee> employee : employeeSVec)
    {
        //get store info for employee
        Wt::Dbo::collection<Wt::Dbo::ptr<Store>> collection{employee->employeeStores};
        vector<Wt::Dbo::ptr<Store>> eSVec{collection.begin(), collection.end()};
        cout << " Employee " << employee->firstName << " " << employee->lastName << " stores "<< endl;
        
        //iterate through employee stores
        for(Wt::Dbo::ptr<Store> store : eSVec)
        {
            cout<< store->storeName << " " << endl;
        }


    }

    //iterate through employee info
    for (Wt::Dbo::ptr<Employee> employee : employeeSVec)
    {
        //get role info for employee
        Wt::Dbo::collection<Wt::Dbo::ptr<Role>> collection{employee->employeeRoles};
        vector<Wt::Dbo::ptr<Role>> eRVec{collection.begin(), collection.end()};
        cout << " Employee " << employee->firstName << " " << employee->lastName << " roles "<< endl;
        
        //iterate through employee roles
        for(Wt::Dbo::ptr<Role> role : eRVec)
        {
            cout<< role->roleName << " " << endl;
        }


    }

    //get shift info
    vector<Wt::Dbo::ptr<Shift>> shiftVec = getShifts(&session);

    //iterate through store info/

    for (Wt::Dbo::ptr<Shift> shift : shiftVec)
    {
     cout << " Shift " << shift.id() << endl;
    }

    //get stores
    vector<Wt::Dbo::ptr<Store>> storeVec = getStores(&session);

    //iterate through stores
    for (Wt::Dbo::ptr<Store> store : storeVec)
    {
     cout << " Store: " << store->storeName << endl;
    }

    //get roles
    vector<Wt::Dbo::ptr<Role>> roleVec = getRoles(&session);

    //iterate through roles
    for (Wt::Dbo::ptr<Role> role : roleVec)
    {
     cout << " Role: " << role->roleName << endl;
    }
    

    //get schedule info
    vector<Wt::Dbo::ptr<Schedule>> scheduleVec = getSchedules(&session);

    //iterate through schedule ids
    for (Wt::Dbo::ptr<Schedule> schedule : scheduleVec)
    {
     cout << " Schedule IDs: " << schedule.id() << endl;
    }

    //get availability info

    vector<Wt::Dbo::ptr<Availability>> availabilityVec = getAvailabilities(&session);

    //iterate through availability info
    for (Wt::Dbo::ptr<Availability> availability : availabilityVec)
    {
     cout << " Availability IDs: " << availability.id() << endl;
    }

    //get desired shift hours
    vector<Wt::Dbo::ptr<DesiredShiftHours>> dshVec = getDSH(&session);

    //iterate through DSH
    for (Wt::Dbo::ptr<DesiredShiftHours> dsh : dshVec)
    {
     cout << " Desired Shift Hours IDs: " << dsh.id() << endl;
    }
}
