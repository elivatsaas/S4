#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/Sqlite3.h>
#include <Wt/Dbo/WtSqlTraits.h>
#include <memory>
#include <string>

namespace dbo = Wt::Dbo;

/*****
 * Dbo tutorial section 2. Mapping a single class
 *****/

class Employee;
class Shift; 
class Availability; 
class DesiredShiftHours;
class Schedule; 

class Role {
  public:
    std::string roleName;
    dbo::collection< dbo::ptr<Employee> > employees;
    dbo::collection< dbo::ptr<Shift> > shifts;

        template<class Action>
        void persist(Action& a)
        {
                dbo::field(a, roleName,     "RoleName");
                dbo::hasMany(a, employees, dbo::ManyToMany, "EmployeeRoles");
                 dbo::hasMany(a, shifts, dbo::ManyToOne, "Role");
        }
     };
 class Store {
    public:
 std::string storeName;
 dbo::collection< dbo::ptr<Employee> > employees;
 dbo::collection< dbo::ptr<Shift> > shifts;

  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, storeName,     "StoreName");
    dbo::hasMany(a, employees, dbo::ManyToMany, "EmployeeStores");
    dbo::hasMany(a, shifts, dbo::ManyToOne, "Store");
  } 
};

class Employee {
public:
  std::string firstName;
  std::string lastName;
  std::string email;
  std::string phoneNumber;
  Wt::WDate        hireDate;
  Wt::WDate        birthDate;
  int          payRate;
  dbo::collection< dbo::ptr<Role> >   employeeRoles;
  dbo::collection< dbo::ptr<Store> >  employeeStores;
  dbo::collection< dbo::ptr<Availability> >   availabilities;
  dbo::collection< dbo::ptr<DesiredShiftHours> >  shiftHours;
  dbo::collection< dbo::ptr<Shift> >   shifts;

  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, firstName,     "FirstName");
    dbo::field(a, lastName,     "LastName");
    dbo::field(a, email, "Email");
    dbo::field(a, phoneNumber,     "PhoneNumber");
    dbo::field(a, hireDate,     "HireDate");
    dbo::field(a, birthDate,     "BirthDate");
    dbo::field(a, payRate,     "PayRate");
    dbo::hasMany(a, employeeRoles, dbo::ManyToMany, "EmployeeRoles");
    dbo::hasMany(a, employeeStores, dbo::ManyToMany, "EmployeeStores");
    dbo::hasMany(a, availabilities, dbo::ManyToOne, "Employee");
    dbo::hasMany(a, shiftHours, dbo::ManyToOne, "Employee");
    dbo::hasMany(a, shifts, dbo::ManyToOne, "Employee");
  }
};
/*
namespace Wt {
    namespace Dbo {

        template<>
        struct dbo_traits<Employee> : public dbo_default_traits {
            static const char *surrogateIdField() {
                return "EmployeeID";
            }
             static const char *versionField() {
                return nullptr;
            }
        };

    }
}
*/
class  Shift{
public:
  Wt::WDate       date;
  Wt::WTime       startTime;
  Wt::WTime       endTime;
  dbo::ptr<Role> role;
  dbo::ptr<Store> store; 
  dbo::ptr<Employee> employee;
  dbo::ptr<Schedule> schedule; 


  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, date,     "date");
    dbo::field(a, startTime,     "startTime");
    dbo::field(a, endTime, "endTime");
    dbo::belongsTo(a, role,     "Role");
    dbo::belongsTo(a, store,     "Store");
    dbo::belongsTo(a, employee,     "Employee");
    dbo::belongsTo(a, schedule,     "Schedule");
  }
};
/*
namespace Wt {
    namespace Dbo {

        template<>
        struct dbo_traits<Shift> : public dbo_default_traits {
            static const char *surrogateIdField() {
                return "ShiftID";
            }
             static const char *versionField() {
                return nullptr;
            }
        };

    }
}
*/
class Schedule {
public:
  Wt::WDate        startDate;
  Wt::WDate        endDate;
  std::string  scheduleName;
  dbo::collection< dbo::ptr<Shift> > shifts;
  dbo::collection< dbo::ptr<Availability> > availabilities;



  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, startDate,     "StartDate");
    dbo::field(a, endDate,     "EndDate");
    dbo::field(a, scheduleName, "ScheduleName");
    dbo::hasMany(a, shifts, dbo::ManyToOne, "Schedule");
    dbo::hasMany(a, availabilities, dbo::ManyToOne, "Schedule");
  }
};
/*
namespace Wt {
    namespace Dbo {

        template<>
        struct dbo_traits<Schedule> : public dbo_default_traits {
            static const char *surrogateIdField() {
                return "ScheduleID";
            }
             static const char *versionField() {
                return nullptr;
            }
        };

    }
}
*/
class Availability {
public:
  Wt::WTime       startTime;
  Wt::WTime       endTime;
  int         dayOfWeek;
  dbo::ptr<Employee>    employee;
  dbo::ptr<Schedule>    schedule;

  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, startTime,     "startTime");
    dbo::field(a, endTime,     "endTime");
    dbo::field(a, dayOfWeek, "dayOfWeek");
    dbo::belongsTo(a, employee,     "Employee");
    dbo::belongsTo(a, schedule,     "Schedule");
  }
};
/*
namespace Wt {
    namespace Dbo {

        template<>
        struct dbo_traits<Availability> : public dbo_default_traits {
            static const char *surrogateIdField() {
                return "AvailabilityID";
            }
             static const char *versionField() {
                return nullptr;
            }
        };

    }
}
*/
class DesiredShiftHours {
public:
  int         desiredShifts;
  int         maxShifts;
  int         desiredHours;
  int         maxHours;
  dbo::ptr<Employee> employee;
  dbo::ptr<Schedule> schedule; 
  

  template<class Action>
  void persist(Action& a)
  {
    dbo::field(a, desiredShifts,     "desiredShifts");
    dbo::field(a, maxShifts,          "maxShifts");
    dbo::field(a, desiredHours,     "desiredHours");
    dbo::field(a, maxShifts,        "maxHours");
    dbo::belongsTo(a, employee,     "Employee");
    dbo::belongsTo(a, schedule,     "Schedule");
  }
};
/*
namespace Wt {
    namespace Dbo {

        template<>
        struct dbo_traits<DesiredShiftHours> : public dbo_default_traits {
            static const char *surrogateIdField() {
                return "DesiredShiftHoursID";
            }
             static const char *versionField() {
                return nullptr;
            }
        };

    }
}
*/