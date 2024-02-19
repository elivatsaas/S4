select * from ROLES;
select * from EMPLOYEE;
select * from EMPLOYEE_has_ROLES;
select * from EMPLOYEE_has_STORES;
select FirstName, LastName, ROLES_RoleName from EMPLOYEE e
inner join EMPLOYEE_has_ROLES ehr
on e.EmployeeID=ehr.EMPLOYEE_EmployeeID
where ehr.ROLES_RoleName='Manager';
select FirstName, LastName, ROLES_RoleName from EMPLOYEE e
inner join EMPLOYEE_has_ROLES ehr
on e.EmployeeID=ehr.EMPLOYEE_EmployeeID
where ehr.ROLES_RoleName='Driver';
select FirstName, LastName, STORES_StoreName from EMPLOYEE e
inner join EMPLOYEE_has_STORES ehs
on e.EmployeeID=ehs.EMPLOYEE_EmployeeID
where ehs.STORES_StoreName='Downtown';
select FirstName, LastName, StartTime, DayOfWeek from EMPLOYEE e
inner join AVAILABILITY a
on e.EmployeeID=a.EMPLOYEE_EmployeeID
where a.StartTime='08:00:00';
select FirstName, LastName, StartTime from EMPLOYEE e
inner join AVAILABILITY a
on e.EmployeeID=a.EMPLOYEE_EmployeeID
where a.DayOfWeek = 0;
