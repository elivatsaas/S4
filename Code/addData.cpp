
#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/MySQL.h>#include "addData.h"
#include "sqlConnection.h"

using namespace std;

// runs sql interactions
void run()
{
    dbo::Session session;
	S4::InitializeSession(session);
    dbo::Transaction transaction(session);

    string dataType;
    cout << "Choose a Data Type to Insert:\nEmployee\nShift\nRole\nStore\nAvailabiity\nSchedule\nDesiredShiftHours\nEmployeeRole\nEmployeeStore\n";
    cin >> dataType;
    insertData(&session, dataType);
}

int main(int argc, char **argv)
{
    run();
}

dataType findDataType(string const &inString)
{
    if (inString == "Employee")
        return eEmployee;
    if (inString == "Shift")
        return eShift;
    if (inString == "Role")
        return eRole;
    if (inString == "Store")
        return eStore;
    if (inString == "Availability")
        return eAvailability;
    if (inString == "Schedule")
        return eSchedule;
    if (inString == "DesiredShiftHours")
        return eDesiredShiftHours;
    if (inString == "EmployeeRole")
        return eEmployeeRole;
    if (inString == "EmployeeStore")
        return eEmployeeStore;
}

void insertData(dbo::Session *session, string dataType)
{

    switch (findDataType(dataType))
    {
    case eEmployee:
        insertEmployeeData(&session);
        break;

    case eShift:
        insertShiftData(&session);
        break;

    case eRole:
        insertRoleData(&session);
        break;

    case eStore:
        insertStoreData(&session);
        break;

    case eAvailability:
        insertAvailabilityData(&session);
        break;

    case eSchedule:
        insertScheduleData(&session);
        break;

    case eDesiredShiftHours:
        insertDesiredShiftHoursData(&session);
        break;

    case eEmployeeRole:
        insertEmployeeRoleData(&session);
        break;

    case eEmployeeStore:
        insertEmployeeStoreData(&session);
        break;
    }
}

void insertEmployeeData(dbo::Session *session)
{


    string firstName;
    string lastName;
    string email;
    string phoneNumber;
    int hireYear;
    int hireMonth;
    int hireDay;
    int birthYear;
    int birthMonth;
    int birthDay;
    int payRate;

    cout << "\nInsert Employee First Name: ";
    cin >> firstName;
    cout << "\nInsert Employee Last Name: ";
    cin >> lastName;
    cout << "\nInsert Employee Email: ";
    cin >> email;
    cout << "\nInsert Employee Phone Number: ";
    cin >> phoneNumber;
    cout << "\nInsert Employee Hire Year (YYYY): ";
    cin >> hireYear;
    cout << "\nInsert Employee Hire Month (MM): ";
    cin >> hireMonth;
    cout << "\nInsert Employee Hire Day (DD): ";
    cin >> hireDay;
    cout << "\nInsert Employee Birth Year (YYYY): ";
    cin >> birthYear;
    cout << "\nInsert Employee Birth Month (MM): ";
    cin >> birthMonth;
    cout << "\nInsert Employee Birth Day (DD): ";
    cin >> birthDay;
    cout << "\nInsert Employee Pay Rate: ";
    cin >> payRate;


    dbo::Transaction transaction(*session);

    auto employee = std::make_unique<Employee>();

    employee->firstName = firstName;
    employee->lastName = lastName;
    employee->email = email;
    employee->phoneNumber = phoneNumber;
    employee->hireDate.setDate(hireYear, hireMonth, hireDay);
    employee->birthDate.setDate(birthYear, birthMonth, birthDay);
    employee->payRate = payRate;
    dbo::ptr<Employee> employeePtr = session.add(std::move(employee));
}

void insertRoleData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto role = std::make_unique<Role>();

    string roleType;

    cout << "\nInsert Role Type: ";
    cin >> roleType;

    role->roleName = roleType;
    dbo::ptr<Role> rolePtr = session.add(std::move(role));
}

void insertStoreData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto store = std::make_unique<Store>();

    string storeType;

    cout << "\nInsert Store Type: ";
    cin >> storeType;

    store->storeName = storeType;
    dbo::ptr<Store> storePtr = session.add(std::move(store));
}

void insertShiftData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto shift = std::make_unique<Shift>();

    int shiftYear;
    int shiftMonth;
    int shiftDay;
    int shiftStartHour;
    int shiftStartMinute;
    int shiftEndHour;
    int shiftEndMinute;
    string shiftRole;
    string shiftStore;
    int shiftScheduleID;

    cout << "\nInsert Shift Year (YYYY): ";
    cin >> shiftYear;
    cout << "\nInsert Shift Month (MM): ";
    cin >> shiftMonth;
    cout << "\nInsert Shift Day (DD): ";
    cin >> shiftDay;
    cout << "\nInsert Shift Start Hour (hh 0-23): ";
    cin >> shiftStartHour;
    cout << "\nInsert Shift Start Minute (mm 0-59): ";
    cin >> shiftStartMinute;
    cout << "\nInsert Shift End Hour (hh 0-23): ";
    cin >> shiftEndHour;
    cout << "\nInsert Shift End Minute (mm 0-59): ";
    cin >> shiftEndMinute;
    cout << "\nInsert Shift Role: ";
    cin >> shiftRole;
    cout << "\nInsert Shift Store: ";
    cin >> shiftStore;
    cout << "\nInsert Shift ScheduleID: ";
    cin >> shiftScheduleID;

    shift->date.setDate(shiftYear, shiftMonth, shiftDay);
    shift->startTime.setHMS(shiftStartHour, shiftStartMinute, 0);
    shift->endTime.setHMS(shiftEndHour, shiftEndMinute, 0);
    dbo::ptr<Role> role = session.find<Role>().where("roleName = ?").bind(shiftRole);
    shift->role = role;
    dbo::ptr<Store> store = session.find<Store>().where("storeName = ?").bind(shiftStore);
    shift->store = store;
    dbo::ptr<Schedule> schedule = session.find<Schedule>().where("id = ?").bind(shiftScheduleID);
    shift->schedule = schedule;

    dbo::ptr<Shift> shiftPtr = session.add(std::move(shift));
}

void insertAvailabilityData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto availability = std::make_unique<Availability>();

    int availabilityStartHour;
    int availabilityStartMinute;
    int availabilityEndHour;
    int availabilityEndMinute;
    int availabilityDayOfWeek;
    int availabilityEmployeeID;
    int availabilityScheduleID;

    cout << "\nInsert Availability Start Hour (hh 0-23): ";
    cin >> availabilityStartHour;
    cout << "\nInsert Availability Start Minute (mm 0-59): ";
    cin >> availabilityStartMinute;
    cout << "\nInsert Availability End Hour (hh 0-23): ";
    cin >> availabilityEndHour;
    cout << "\nInsert Availability End Minute (mm 0-59): ";
    cin >> availabilityEndMinute;
    cout << "\nEnter Day of Week (0-6 sunday-saturday): ";
    cin >> availabilityDayOfWeek;
    cout << "\nInsert Availability Employee ID: ";
    cin >> availabilityEmployeeID;
    cout <<"\n Is this for a specific schedule? ScheduleID (NULL if none): ";
    cin>> availabilityScheduleID; 

    availability->startTime.setHMS(availabilityStartHour, availabilityStartMinute, 0);
    availability->endTime.setHMS(availabilityEndHour, availabilityEndMinute, 0);
    availability->dayOfWeek = availabilityDayOfWeek;
    dbo::ptr<Employee> employee = session.find<Employee>().where("id = ?").bind(availabilityEmployeeID);
    availability->employee = employee;
    dbo::ptr<Schedule> schedule = session.find<Schedule>().where("id = ?").bind(availabilityScheduleID);
    availability->schedule = schedule;
    dbo::ptr<Availability> availabilityPtr = session.add(std::move(availability));
}

void insertScheduleData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto schedule = std::make_unique<Schedule>();

    int scheduleStartYear;
    int scheduleStartMonth;
    int scheduleStartDay;
    int scheduleEndYear;
    int scheduleEndMonth;
    int scheduleEndDay;
    string scheduleName;

    cout
        << "\nInsert Schedule Start Year (YYYY): ";
    cin >> scheduleStartYear;
    cout << "\nInsert Schedule Start Month (MM): ";
    cin >> scheduleStartMonth;
    cout << "\nInsert Schedule Start Day (DD): ";
    cin >> scheduleStartDay;
    cout << "\nInsert Schedule End Year (YYYY): ";
    cin >> scheduleEndYear;
    cout << "\nInsert Schedule End Month (MM): ";
    cin >> scheduleEndMonth;
    cout << "\nInsert Schedule End Day (DD): ";
    cin >> scheduleEndDay;
    cout << "\nInsert Optional Schedule Name (NULL For No Name) : ";
    cin >> scheduleName;

    schedule->startDate.setDate(scheduleStartYear, scheduleStartMonth, scheduleStartDay);
    schedule->endDate.setDate(scheduleEndYear, scheduleEndMonth, scheduleEndDay);
    schedule->scheduleName = scheduleName;
    dbo::ptr<Schedule> schedulePtr = session.add(std::move(schedule));
}

void insertDesiredShiftHoursData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto desiredShiftHours = std::make_unique<DesiredShiftHours>();

    int dHours;
    int mShifts;
    int dShifts;
    int maxHours;
    int employeeID;
    int dshSchedule; 

    cout << "\nInsert Desired Shifts: ";
    cin >> dShifts;
    cout << "\nInsert Max Shifts: ";
    cin >> mShifts;
    cout << "\nInsert Desired Hours: ";
    cin >> dHours;
    cout << "\nInsert Max Hours: ";
    cin >> maxHours;
    cout << "\nInsert Employee ID: ";
    cin >> employeeID;
    cout << "\nInsert Optional Schedule id (NULL For No Schedule) : ";
    cin >> dshSchedule;

    desiredShiftHours->desiredShifts = dShifts;
    desiredShiftHours->maxShifts = mShifts;
    desiredShiftHours->desiredHours = dHours;
    desiredShiftHours->maxHours = maxHours;
    dbo::ptr<Employee> employee = session.find<Employee>().where("id = ?").bind(employeeID);
    desiredShiftHours->employee = employee;
    dbo::ptr<Schedule> schedule = session.find<Schedule>().where("id = ?").bind(dshSchedule);
    desiredShiftHours->schedule = schedule;

    dbo::ptr<DesiredShiftHours> desiredShiftHoursPtr = session.add(std::move(desiredShiftHours));
}

void insertEmployeeRoleData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);

    int employeeID;
    string role;

    cout << "\nInsert Employee ID: ";
    cin >> employeeID;
    cout << "\nInsert Role: ";
    cin >> role;

    dbo::ptr<Employee> employee = session.find<Employee>().where("id = ?").bind(employeeID);
    dbo::ptr<Role> rolePtr = session.find<Role>().where("roleName = ?").bind(role);
    employee.modify()->employeeRoles.insert(rolePtr);
}

void insertEmployeeStoreData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);

    int employeeID;
    string store;

    cout << "\nInsert Employee ID: ";
    cin >> employeeID;
    cout << "\nInsert Store: ";
    cin >> store;

    dbo::ptr<Employee> employeePtr = session.find<Employee>().where("id = ?").bind(employeeID);
    dbo::ptr<Store> storePtr = session.find<Store>().where("storeName = ?").bind(store);
    employeePtr.modify()->employeeStores.insert(storePtr);
}
#include <Wt/Dbo/WtSqlTraits.h>
#include <memory>
#include <string>
#include "S4DatabaseClasses.h"



void run()
{
  
  auto mysql = std::make_unique<dbo::backend::MySQL>("S4", "root", "cs386pass", "localhost", 3306, "/tmp/mysql.sock"); 
  mysql->setProperty("show-queries", "true");
  dbo::Session session;
  session.setConnection(std::move(mysql));

  session.mapClass<Role>("Role");
  session.mapClass<Store>("Store");
  session.mapClass<Employee>("Employee");
  session.mapClass<Shift>("Shift");
  session.mapClass<Schedule>("Schedule");
  session.mapClass<Availability>("Availability");
  session.mapClass<DesiredShiftHours>("DesiredShiftHours");

  /*
   * Try to create the schema (will fail if already exists).
   */   
 
  
  session.createTables();
  //New employee
    {
        dbo::Transaction transaction(session);
        auto role = std::make_unique<Role>();
        role->roleName = "Manager";
        dbo::ptr<Role> rolePtr = session.add(std::move(role));
        auto role1 = std::make_unique<Role>();
        role1->roleName = "Driver";
        dbo::ptr<Role> role1Ptr = session.add(std::move(role1));
        auto role2 = std::make_unique<Role>();
        role2->roleName = "Cashier";
        dbo::ptr<Role> role2Ptr = session.add(std::move(role2));
        auto role3 = std::make_unique<Role>();
        role3->roleName = "Cook";
        dbo::ptr<Role> role3Ptr = session.add(std::move(role3));
   }
    {
        dbo::Transaction transaction(session);
        auto store = std::make_unique<Store>();
        store->storeName = "Downtown";
        dbo::ptr<Store> storePtr = session.add(std::move(store));
        auto store1 = std::make_unique<Store>();
        store1->storeName = "Eastside";
        dbo::ptr<Store> store1Ptr = session.add(std::move(store1));
        auto store2 = std::make_unique<Store>();
        store2->storeName = "Westside";
        dbo::ptr<Store> store2Ptr = session.add(std::move(store2));
   }
  {
    dbo::Transaction transaction(session);

    auto employee = std::make_unique<Employee>();
    employee ->firstName = "Joe";
    employee->lastName = "Smith";
    employee->email = "joe.smith@example.com";
    employee->phoneNumber = "1234567890";
    employee->hireDate.setDate(2020, 10, 12);
    employee->birthDate.setDate(2000, 9, 17);
    employee->payRate = 16;
    //dbo::ptr<Role> manager = session.addNew<Role>();
    //manager.modify()->roleName = "Manager";
    //dbo::ptr<Store> downtown = session.addNew<Store>();
    //downtown.modify()->storeName = "Downtown";
    //employee->employeeRoles.insert(manager);
    //employee->employeeStores.insert(downtown);


    dbo::ptr<Employee> employeePtr = session.add(std::move(employee));
  }
  {
    dbo::Transaction transaction(session);
    dbo::ptr<Employee> joe = session.find<Employee>().where("firstName = ?").bind("Joe");
    dbo::ptr<Role> manager = session.find<Role>().where("roleName = ?").bind("Manager");
    joe.modify()->employeeRoles.insert(manager);
  }
  {
    dbo::Transaction transaction(session);
    dbo::ptr<Employee> joe = session.find<Employee>().where("firstName = ?").bind("Joe");
    dbo::ptr<Store> downtown = session.find<Store>().where("storeName = ?").bind("Downtown");
    joe.modify()->employeeStores.insert(downtown);
  }
  {
    dbo::Transaction transaction(session);

    auto availability = std::make_unique<Availability>();
    availability->startTime.setHMS(7, 0, 0);
    availability->endTime.setHMS(23,0,0);
    availability->dayOfWeek = 0;
    dbo::ptr<Employee> joe = session.find<Employee>().where("firstName = ?").bind("Joe");
    availability->employee = joe;
    dbo::ptr<Availability> availabilityPtr = session.add(std::move(availability));
  }
  {
    dbo::Transaction transaction(session);
    auto schedule = std::make_unique<Schedule>();
    schedule->startDate.setDate(2024, 5, 19);
    schedule->endDate.setDate(2024, 5, 25);
    schedule->scheduleName = "templateSchedule";
    dbo::ptr<Schedule> schedulePtr = session.add(std::move(schedule));
  }
  {
    dbo::Transaction transaction(session);
    auto shift = std::make_unique<Shift>();
    shift->date.setDate(2024, 5, 19);
    shift->startTime.setHMS(8,0,0);
    shift->endTime.setHMS(17,0,0);
    dbo::ptr<Role> role = session.find<Role>().where("roleName = ?").bind("Manager");
    shift->role = role;
    dbo::ptr<Store> store = session.find<Store>().where("storeName = ?").bind("Downtown");
    shift->store = store;
    dbo::ptr<Schedule> schedule = session.find<Schedule>().where("startDate = ?").bind("2024-05-19");
    shift->schedule = schedule;

    dbo::ptr<Shift> shiftPtr = session.add(std::move(shift));
  }
  {
    dbo::Transaction transaction(session);
    auto shift = std::make_unique<Shift>();
    shift->date.setDate(2024, 5, 20);
    shift->startTime.setHMS(8,0,0);
    shift->endTime.setHMS(17,0,0);
    dbo::ptr<Role> role = session.find<Role>().where("roleName = ?").bind("Manager");
    shift->role = role;
    dbo::ptr<Store> store = session.find<Store>().where("storeName = ?").bind("Downtown");
    shift->store = store;
    dbo::ptr<Schedule> schedule = session.find<Schedule>().where("startDate = ?").bind("2024-05-19");
    shift->schedule = schedule;

    dbo::ptr<Shift> shiftPtr = session.add(std::move(shift));
  }
  {
    dbo::ptr<Employee> employee;
    dbo::ptr<Schedule> schedule; 
    dbo::Transaction transaction(session);
    auto desiredShiftHours = std::make_unique<DesiredShiftHours>();
    desiredShiftHours->desiredShifts = 5;
    desiredShiftHours->maxShifts = 7;
    desiredShiftHours->desiredHours = 40;
    desiredShiftHours->maxHours = 50;
    dbo::ptr<Employee> joe = session.find<Employee>().where("firstName = ?").bind("Joe");
    desiredShiftHours->employee = joe;
   
    dbo::ptr<DesiredShiftHours> desiredShiftHoursPtr = session.add(std::move(desiredShiftHours));
  }

}


int main(int argc, char **argv)
{
  run();
}
