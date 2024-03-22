USE S4;

-- give the  columns a default value so we don't have to specify them in our inserts

-- Remove all the existing data from the tables and reset the auto-increments on the PK fields so we can get a fresh start
-- Start by telling the DB to ignore FK integrity
SET FOREIGN_KEY_CHECKS=0;

-- Truncate all the tables
TRUNCATE TABLE Employee;
TRUNCATE TABLE Role;
TRUNCATE TABLE Store;
TRUNCATE TABLE Availability;
TRUNCATE TABLE Schedule;
TRUNCATE TABLE DesiredShiftHours;
TRUNCATE TABLE Shift;
TRUNCATE TABLE employeeRoles;
TRUNCATE TABLE employeeStores;


-- Tell the DB to enforce FK integrity again
SET FOREIGN_KEY_CHECKS=1;

-- Insert ROLE --
INSERT INTO `S4`.`ROLE`
(`RoleName`)
VALUES
('Manager');
select @ManagerRoleId := LAST_INSERT_ID();
select @ManagerRoleId;

INSERT INTO `S4`.`ROLE`
(`RoleName`)
VALUES
('Cook');
select @CookRoleId := LAST_INSERT_ID();

INSERT INTO `S4`.`ROLE`
(`RoleName`)
VALUES
('Cashier');
select @CashierRoleId := LAST_INSERT_ID();

INSERT INTO `S4`.`ROLE`
(`RoleName`)
VALUES
('Driver');
select @DriverRoleId := LAST_INSERT_ID();

-- Insert Employees --
INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Marian',
'Ostberg',
'MOstberg@example.com',
'7201234567',
'2022-10-18',
'1992-02-19',
16,
'testpass');
select @MarianEmployeeId := LAST_INSERT_ID();
select @MarianEmployeeId;

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Howell',
'Rosenberg',
'howellR@example.com',
'9285637283',
'2020-11-23',
'2003-06-12',
18,
'testpass');
select @HowellEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Mary',
'Carpenter',
'MaryCarpenter@example.com',
'9285638273',
'2023-04-20',
'2000-12-10',
17,
'testpass');
select @MaryEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Radovan',
'Klerkx',
'radovan@example.com',
'2739284938',
'2015-10-17',
'1996-03-17',
20,
'testpass');
select @RadovanEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Thiemo',
'Maria',
'thiemo@example.com',
'8738949384',
'2018-09-25',
'2001-04-21',
16,
'testpass');
select @ThiemoEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Alba',
'Winship',
'albawinship@example.com',
'9279302845',
'2019-10-22',
'2000-02-29',
16,
'testpass');
select @AlbaEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Edina',
'Carlson',
'edinacarlson@example.com',
'1029482940',
'2021-11-22',
'2003-06-28',
19,
'testpass');
select @EdinaEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Christopher',
'Komatka',
'ChristopherK@example.com',
'0389203928',
'2023-09-01',
'1994-06-20',
20,
'testpass');
select @ChristopherEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Walaric',
'Winston',
'thewalaric@example.com',
'8273890482',
'2012-12-31',
'1994-07-27',
20,
'testpass');
select @WalaricEmployeeId := LAST_INSERT_ID();

INSERT INTO `S4`.`EMPLOYEE`
(`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`,
`password`)
VALUES
('Big',
'Show',
'BigSHow@example.com',
'9283920394',
'2010-01-02',
'1972-02-08',
25,
'testpass');
select @BigEmployeeId := LAST_INSERT_ID();

-- Insert employee ROLE --
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@MarianEmployeeId,
@ManagerRoleID);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@MarianEmployeeId,
@CookRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@MarianEmployeeId,
@CashierRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@MarianEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@HowellEmployeeId,
@CookRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@MaryEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@RadovanEmployeeId,
@CashierRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@ThiemoEmployeeId,
@ManagerRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@AlbaEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@AlbaEmployeeId,
@CookRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@EdinaEmployeeId,
@CashierRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@EdinaEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@ChristopherEmployeeId,
1);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@ChristopherEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@ChristopherEmployeeId,
@CashierRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@WalaricEmployeeId,
@CookRoleId
);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@WalaricEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@BigEmployeeId,
@CookRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@BigEmployeeId,
@DriverRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@BigEmployeeId,
@CashierRoleId);
INSERT INTO `S4`.`employeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(@BigEmployeeId,
@ManagerRoleId);

-- Insert Store --
INSERT INTO `S4`.`Store`
(`StoreName`)
VALUES
('Downtown');
select @DowntownStoreId := LAST_INSERT_ID();

INSERT INTO `S4`.`Store`
(`StoreName`)
VALUES
('Eastside');
select @EastSideStoreId := LAST_INSERT_ID();

INSERT INTO `S4`.`Store`
(`StoreName`)
VALUES
('Westside');
select @WestSideStoreId := LAST_INSERT_ID();

-- Insert Employee Store --
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@MarianEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@MarianEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@MarianEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@HowellEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@HowellEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@MaryEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@MaryEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@RadovanEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@ThiemoEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@ThiemoEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@ThiemoEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@AlbaEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@AlbaEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@EdinaEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@EdinaEmployeeId,
@WestSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@EdinaEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@ChristopherEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@ChristopherEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@WalaricEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@WalaricEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@BigEmployeeId,
@DowntownStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@BigEmployeeId,
@EastSideStoreId);
INSERT INTO `S4`.`employeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(@BigEmployeeId,
@WestSideStoreId);


-- Insert Availability --

-- Insert Availability --
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
0,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
1,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
2,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
3,
@MarianEmployeeId,
NULL);INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
4,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
5,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
6,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'20:00:00',
0,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'23:00:00',
1,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'22:00:00',
2,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'22:00:00',
3,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'22:00:00',
4,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:30:00',
'23:30:00',
5,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'22:30:00',
6,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('14:00:00',
'23:30:00',
0,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('15:00:00',
'23:30:00',
1,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'22:00:00',
2,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('14:00:00',
'22:00:00',
3,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('12:00:00',
'22:00:00',
4,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('12:30:00',
'23:30:00',
5,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('14:00:00',
'22:30:00',
6,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
0,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'23:00:00',
1,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:30:00',
2,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:00:00',
'23:30:00',
3,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'23:30:00',
4,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:30:00',
'23:30:00',
5,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'22:30:00',
6,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('15:00:00',
'23:00:00',
0,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('15:00:00',
'23:30:00',
1,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:00:00',
2,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:00:00',
'22:00:00',
3,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:00:00',
4,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:30:00',
'23:30:00',
5,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'20:30:00',
6,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('12:00:00',
'23:00:00',
0,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('15:00:00',
'23:30:00',
1,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:00:00',
2,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'23:00:00',
3,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'22:00:00',
4,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:30:00',
'21:30:00',
5,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'22:30:00',
6,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('11:00:00',
'23:30:00',
0,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'23:30:00',
1,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:00:00',
2,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
3,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'23:00:00',
4,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:30:00',
'23:30:00',
5,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:30:00',
6,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'23:30:00',
0,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'23:30:00',
1,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:00:00',
2,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'20:00:00',
3,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
4,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:30:00',
'23:30:00',
5,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'20:30:00',
6,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:30:00',
0,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:00:00',
'23:30:00',
1,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('19:00:00',
'23:00:00',
2,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('09:00:00',
'22:00:00',
3,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('10:00:00',
'23:30:00',
4,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('08:30:00',
'23:30:00',
5,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('07:00:00',
'23:30:00',
6,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('03:00:00',
'23:30:00',
0,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:00:00',
'23:30:00',
1,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:00:00',
'23:00:00',
2,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('02:00:00',
'22:00:00',
3,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('05:00:00',
'23:30:00',
4,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('06:30:00',
'23:30:00',
5,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
('05:00:00',
'23:30:00',
6,
@BigEmployeeId,
NULL);

-- Insert Desired Shift Hours --
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(5,
7,
35,
40,
@MarianEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
6,
30,
40,
@HowellEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(3,
5,
25,
35,
@MaryEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
7,
30,
40,
@RadovanEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(3,
5,
20,
35,
@ThiemoEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(5,
7,
35,
40,
@AlbaEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
6,
35,
40,
@EdinaEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(6,
7,
40,
40,
@ChristopherEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
7,
28,
40,
@WalaricEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
7,
30,
40,
@BigEmployeeId,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(4,
7,
30,
40,
@BigEmployeeId,
NULL);

-- Insert Schedule --

INSERT INTO `S4`.`SCHEDULE`
(
`StartDate`,
`EndDate`,
`ScheduleName`)
VALUES
(
'2024-05-19',
'2024-05-25',
'ExampleTemplate');
select @ExampleTemplateScheduleID := LAST_INSERT_ID();

-- Insert Shifts --
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-19',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);

INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-20',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-21',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-22',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-23',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-24',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'09:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'10:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'11:00:00',
'17:00:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@ManagerRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'17:00:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CashierRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@DriverRoleId);
INSERT INTO `S4`.`SHIFT`
(`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
('2024-05-25',
'14:30:00',
'22:30:00',
NULL,
@DowntownStoreId,
@ExampleTemplateScheduleID,
@CookRoleId);

-- For reference, here are all the variables created in this script
-- It is helpful for creating new inserts to have a reference to copy from
-- ROLE
--		@ManagerRoleId
--		@CookRoleId
--		@CashierRoleId
--		@DriverRoleId
-- Employees
--		@MarianEmployeeId
--		@HowellEmployeeId
--		@MaryEmployeeId
--		@RadovanEmployeeId
--		@ThiemoEmployeeId
--		@AlbaEmployeeId
--		@EdinaEmployeeId
--		@ChristopherEmployeeId
--		@WalaricEmployeeId
--		@BigEmployeeId
-- Store
--		@DowntownStoreId
--		@EastSideStoreId
--		@WestSideStoreId
-- Schedules
--		@ExampleTemplateScheduleID