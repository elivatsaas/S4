USE S4;
DELIMITER //

 CREATE PROCEDURE `FindEmployeesForSchedule`(
	IN scheduleID int
)
BEGIN
select es.employee_id, sh.id as shiftId
	-- Start by joining Shift and the Has tables for Store and Role to get employees that might be available
	from Shift sh
	inner join EmployeeStores es
		on sh.Store_id = es.store_id
			-- we do an and here to narrow the shift rows to the scheduleID input param
			and sh.schedule_id = schedule_id
	inner join EmployeeRoles er
		on sh.Role_id = er.Role_id and es.Employee_id=er.Employee_id
	-- Next, Join a subquery to find out who has availability declared for this schedule
	-- Employees with availability declared for this schedule will use only scheduled Availability
	-- Employees without availability declared for this schedule will use the default availability
	left join
		(Select Employee_Id, Schedule_Id From availability a
		group by Employee_id, Schedule_Id) HasSchedAvail
		on es.Employee_Id=HasSchedAvail.Employee_Id and HasSchedAvail.Schedule_Id=sh.Schedule_Id
	inner join Availability av
		on	((HasSchedAvail.Schedule_Id is null and av.Schedule_Id is null)
			or (HasSchedAvail.Schedule_Id is not null and HasSchedAvail.Schedule_Id = av.Schedule_Id is null))
			and av.Employee_Id=es.Employee_Id
			and DAYOFWEEK(sh.Date) - 1 = av.DayOfWeek
			and sh.StartTime >= av.StartTime
			and sh.EndTime <= av.EndTime
	inner join Employee e 
		on e.id = av.Employee_id
        ;
END//

DELIMITER ;