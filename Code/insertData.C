
#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/MySQL.h>
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
