#include "addData.h"
#include "sqlConnection.h"

using namespace std;


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
        insertEmployeeData(session);
        break;

    case eShift:
        insertShiftData(session);
        break;

    case eRole:
        insertRoleData(session);
        break;

    case eStore:
        insertStoreData(session);
        break;

    case eAvailability:
        insertAvailabilityData(session);
        break;

    case eSchedule:
        insertScheduleData(session);
        break;

    case eDesiredShiftHours:
        insertDesiredShiftHoursData(session);
        break;

    case eEmployeeRole:
        insertEmployeeRoleData(session);
        break;

    case eEmployeeStore:
        insertEmployeeStoreData(session);
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
    dbo::ptr<Employee> employeePtr = session->add(std::move(employee));
}

void insertRoleData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto role = std::make_unique<Role>();

    string roleType;

    cout << "\nInsert Role Type: ";
    cin >> roleType;

    role->roleName = roleType;
    dbo::ptr<Role> rolePtr = session->add(std::move(role));
}

void insertStoreData(dbo::Session *session)
{

    dbo::Transaction transaction(*session);
    auto store = std::make_unique<Store>();

    string storeType;

    cout << "\nInsert Store Type: ";
    cin >> storeType;

    store->storeName = storeType;
    dbo::ptr<Store> storePtr = session->add(std::move(store));
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
    dbo::ptr<Role> role = session->find<Role>().where("roleName = ?").bind(shiftRole);
    shift->role = role;
    dbo::ptr<Store> store = session->find<Store>().where("storeName = ?").bind(shiftStore);
    shift->store = store;
    dbo::ptr<Schedule> schedule = session->find<Schedule>().where("id = ?").bind(shiftScheduleID);
    shift->schedule = schedule;

    dbo::ptr<Shift> shiftPtr = session->add(std::move(shift));
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
    dbo::ptr<Employee> employee = session->find<Employee>().where("id = ?").bind(availabilityEmployeeID);
    availability->employee = employee;
    dbo::ptr<Schedule> schedule = session->find<Schedule>().where("id = ?").bind(availabilityScheduleID);
    availability->schedule = schedule;
    dbo::ptr<Availability> availabilityPtr = session->add(std::move(availability));
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
    dbo::ptr<Schedule> schedulePtr = session->add(std::move(schedule));
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
    dbo::ptr<Employee> employee = session->find<Employee>().where("id = ?").bind(employeeID);
    desiredShiftHours->employee = employee;
    dbo::ptr<Schedule> schedule = session->find<Schedule>().where("id = ?").bind(dshSchedule);
    desiredShiftHours->schedule = schedule;

    dbo::ptr<DesiredShiftHours> desiredShiftHoursPtr = session->add(std::move(desiredShiftHours));
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

    dbo::ptr<Employee> employee = session->find<Employee>().where("id = ?").bind(employeeID);
    dbo::ptr<Role> rolePtr = session->find<Role>().where("roleName = ?").bind(role);
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

    dbo::ptr<Employee> employeePtr = session->find<Employee>().where("id = ?").bind(employeeID);
    dbo::ptr<Store> storePtr = session->find<Store>().where("storeName = ?").bind(store);
    employeePtr.modify()->employeeStores.insert(storePtr);
}