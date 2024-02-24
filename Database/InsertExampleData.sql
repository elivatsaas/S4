USE S4;

ALTER TABLE Employee MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE Role MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE Store MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE Availability MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE Schedule MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE DesiredShiftHours MODIFY COLUMN version INT NOT NULL DEFAULT 0;
ALTER TABLE Shift MODIFY COLUMN version INT NOT NULL DEFAULT 0;

-- Insert Roles --
/*
INSERT INTO `S4`.`ROLES`
(`RoleName`)
VALUES
('Manager');
INSERT INTO `S4`.`ROLES`
(`RoleName`)
VALUES
('Cook');
INSERT INTO `S4`.`ROLES`
(`RoleName`)
VALUES
('Cashier');
INSERT INTO `S4`.`ROLES`
(`RoleName`)
VALUES
('Driver');
*/


-- Insert Employees --
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Marian',
'Ostberg',
'MOstberg@example.com',
'7201234567',
'2022-10-18',
'1992-02-19',
16);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Howell',
'Rosenberg',
'howellR@example.com',
'9285637283',
'2020-11-23',
'2003-06-12',
18);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Mary',
'Carpenter',
'MaryCarpenter@example.com',
'9285638273',
'2023-04-20',
'2000-12-10',
17);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Radovan',
'Klerkx',
'radovan@example.com',
'2739284938',
'2015-10-17',
'1996-03-17',
20);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Thiemo',
'Maria',
'thiemo@example.com',
'8738949384',
'2018-09-25',
'2001-04-21',
16);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Alba',
'Winship',
'albawinship@example.com',
'9279302845',
'2019-10-22',
'2000-02-29',
16);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Edina',
'Carlson',
'edinacarlson@example.com',
'1029482940',
'2021-11-22',
'2003-06-28',
19);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Christopher',
'Komatka',
'ChristopherK@example.com',
'0389203928',
'2023-09-01',
'1994-06-20',
20);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Walaric',
'Winston',
'thewalaric@example.com',
'8273890482',
'2012-12-31',
'1994-07-27',
20);
INSERT INTO `S4`.`EMPLOYEE`
(`ID`,
`FirstName`,
`LastName`,
`Email`,
`PhoneNumber`,
`HireDate`,
`BirthDate`,
`PayRate`)
VALUES
(0,
'Big',
'Show',
'BigSHow@example.com',
'9283920394',
'2010-01-02',
'1972-02-08',
25);

-- Insert employee roles --

INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(2,
2);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(3,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(4,
3);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(5,
1);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(6,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(6,
2);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(7,
3);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(7,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(8,
1);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(8,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(8,
3);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(9,
2);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(9,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(10,
1);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(10,
2);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(10,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(10,
3);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(11,
4);
INSERT INTO `S4`.`EmployeeRoles`
(`EMPLOYEE_ID`,
`Role_ID`)
VALUES
(11,
3);

-- Insert Stores --
/*
INSERT INTO `S4`.`STORES`
(`StoreName`)
VALUES
('Downtown');
INSERT INTO `S4`.`STORES`
(`StoreName`)
VALUES
('Eastside');
INSERT INTO `S4`.`STORES`
(`StoreName`)
VALUES
('Westside');
*/
-- Insert Employee Stores --

INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(2,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(2,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(3,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(3,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(4,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(5,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(5,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(5,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(6,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(6,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(7,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(7,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(7,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(8,
2);

INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(8,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(9,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(9,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(10,
1);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(10,
2);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(10,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(11,
3);
INSERT INTO `S4`.`EmployeeStores`
(`EMPLOYEE_ID`,
`Store_id`)
VALUES
(11,
2);

-- Insert Availability --
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
0,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
1,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
2,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
3,
1,
NULL);INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
4,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
5,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
6,
1,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'20:00:00',
0,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'23:00:00',
1,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'22:00:00',
2,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'22:00:00',
3,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'22:00:00',
4,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:30:00',
'23:30:00',
5,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'22:30:00',
6,
2,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'14:00:00',
'23:30:00',
0,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'15:00:00',
'23:30:00',
1,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'22:00:00',
2,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'14:00:00',
'22:00:00',
3,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'12:00:00',
'22:00:00',
4,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'12:30:00',
'23:30:00',
5,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'14:00:00',
'22:30:00',
6,
3,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
0,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'23:00:00',
1,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:30:00',
2,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'23:30:00',
3,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'23:30:00',
4,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:30:00',
'23:30:00',
5,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'22:30:00',
6,
4,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'15:00:00',
'23:00:00',
0,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'15:00:00',
'23:30:00',
1,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:00:00',
2,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'22:00:00',
3,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:00:00',
4,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:30:00',
'23:30:00',
5,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'20:30:00',
6,
5,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'12:00:00',
'23:00:00',
0,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'15:00:00',
'23:30:00',
1,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:00:00',
2,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'23:00:00',
3,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'22:00:00',
4,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:30:00',
'21:30:00',
5,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'22:30:00',
6,
6,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'11:00:00',
'23:30:00',
0,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'23:30:00',
1,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:00:00',
2,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
3,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'23:00:00',
4,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:30:00',
'23:30:00',
5,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:30:00',
6,
7,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'23:30:00',
0,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'23:30:00',
1,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:00:00',
2,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'20:00:00',
3,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
4,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:30:00',
'23:30:00',
5,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'20:30:00',
6,
8,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:30:00',
0,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:00:00',
'23:30:00',
1,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'19:00:00',
'23:00:00',
2,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'09:00:00',
'22:00:00',
3,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'10:00:00',
'23:30:00',
4,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'08:30:00',
'23:30:00',
5,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'07:00:00',
'23:30:00',
6,
9,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'03:00:00',
'23:30:00',
0,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'23:30:00',
1,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'23:00:00',
2,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'02:00:00',
'22:00:00',
3,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'05:00:00',
'23:30:00',
4,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:30:00',
'23:30:00',
5,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'05:00:00',
'23:30:00',
6,
10,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'03:00:00',
'23:30:00',
0,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'23:30:00',
1,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:00:00',
'23:00:00',
2,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'02:00:00',
'22:00:00',
3,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'05:00:00',
'23:30:00',
4,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'06:30:00',
'23:30:00',
5,
11,
NULL);
INSERT INTO `S4`.`AVAILABILITY`
(`ID`,
`StartTime`,
`EndTime`,
`DayOfWeek`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
'05:00:00',
'23:30:00',
6,
11,
NULL);

-- Insert Desired Shift Hours --
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
5,
7,
35,
40,
1,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
6,
30,
40,
2,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
3,
5,
25,
35,
3,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
7,
30,
40,
4,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
3,
5,
20,
35,
5,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
5,
7,
35,
40,
6,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
6,
35,
40,
7,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
6,
7,
40,
40,
8,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
7,
28,
40,
9,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
7,
30,
40,
10,
NULL);
INSERT INTO `S4`.`DESIREDSHIFTHOURS`
(`ID`,
`DesiredShifts`,
`MaxShifts`,
`DesiredHours`,
`MaxHours`,
`EMPLOYEE_ID`,
`SCHEDULE_ID`)
VALUES
(0,
4,
7,
30,
40,
10,
NULL);

-- Insert Schedule --

INSERT INTO `S4`.`SCHEDULE`
(`ID`,
`StartDate`,
`EndDate`,
`ScheduleName`)
VALUES
(0,
'2024-05-19',
'2024-05-25',
'ExampleTemplate');

-- Insert Shifts --

INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'10:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'11:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-19',
'14:30:00',
'22:30:00',
NULL,
2,
1,
3);

INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'10:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-20',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'10:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-21',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'10:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-22',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'10:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-23',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'09:00:00',
'17:00:00',
NULL,
2, 
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'10:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-24',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'09:00:00',
'17:00:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'10:00:00',
'17:00:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'11:00:00',
'17:00:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'11:00:00',
'17:00:00',
NULL,
2,
1,
4);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'17:00:00',
'22:30:00',
NULL,
2,
1,
1);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'17:00:00',
'22:30:00',
NULL,
2,
1,
3);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'14:30:00',
'22:30:00',
NULL,
2,
1,
2);
INSERT INTO `S4`.`SHIFT`
(`ID`,
`Date`,
`StartTime`,
`EndTIme`,
`EMPLOYEE_ID`,
`Store_id`,
`SCHEDULE_ID`,
`Role_ID`)
VALUES
(0,
'2024-05-25',
'14:30:00',
'22:30:00',
NULL,
2,
1,
4);


