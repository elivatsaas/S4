#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"
#include "scheduleGenerator.h"

TEST_CASE("Testing the checkForOverlap function")
{
    // Setting data
    Employee emp1, emp2, emp3, emp4, emp5, emp6, emp7;
    Shift sft1, sft2, sft3, sft4, sft5, sft6, sft7;
    emp1.shiftCount = 1;
    emp1.shiftList = new Shift[1];
    emp1.shiftList[0].day = 1;
    emp1.shiftList[0].month = 1;
    emp1.shiftList[0].year = 1;
    emp1.shiftList[0].startTime = 0;
    emp1.shiftList[0].endTime = 240;
    sft1.day = 1;
    sft1.month = 1;
    sft1.year = 1;
    sft1.startTime = 0;
    sft1.endTime = 100;
    emp2.shiftCount = 1;
    emp2.shiftList = new Shift[1];
    emp2.shiftList[0].day = 1;
    emp2.shiftList[0].month = 1;
    emp2.shiftList[0].year = 1;
    emp2.shiftList[0].startTime = 0;
    emp2.shiftList[0].endTime = 240;
    sft2.day = 1;
    sft2.month = 1;
    sft2.year = 1;
    sft2.startTime = 50;
    sft2.endTime = 100;
    emp3.shiftCount = 1;
    emp3.shiftList = new Shift[1];
    emp3.shiftList[0].day = 1;
    emp3.shiftList[0].month = 1;
    emp3.shiftList[0].year = 1;
    emp3.shiftList[0].startTime = 70;
    emp3.shiftList[0].endTime = 240;
    sft3.day = 1;
    sft3.month = 1;
    sft3.year = 1;
    sft3.startTime = 50;
    sft3.endTime = 100;
    emp4.shiftCount = 1;
    emp4.shiftList = new Shift[1];
    emp4.shiftList[0].day = 1;
    emp4.shiftList[0].month = 1;
    emp4.shiftList[0].year = 1;
    emp4.shiftList[0].startTime = 0;
    emp4.shiftList[0].endTime = 120;
    sft4.day = 1;
    sft4.month = 1;
    sft4.year = 1;
    sft4.startTime = 50;
    sft4.endTime = 150;
    emp5.shiftCount = 1;
    emp5.shiftList = new Shift[1];
    emp5.shiftList[0].day = 1;
    emp5.shiftList[0].month = 1;
    emp5.shiftList[0].year = 1;
    emp5.shiftList[0].startTime = 20;
    emp5.shiftList[0].endTime = 120;
    sft5.day = 1;
    sft5.month = 1;
    sft5.year = 1;
    sft5.startTime = 0;
    sft5.endTime = 150;
    emp6.shiftCount = 1;
    emp6.shiftList = new Shift[1];
    emp6.shiftList[0].day = 1;
    emp6.shiftList[0].month = 1;
    emp6.shiftList[0].year = 1;
    emp6.shiftList[0].startTime = 0;
    emp6.shiftList[0].endTime = 100;
    sft6.day = 1;
    sft6.month = 1;
    sft6.year = 1;
    sft6.startTime = 100;
    sft6.endTime = 250;
    emp7.shiftCount = 1;
    emp7.shiftList = new Shift[1];
    emp7.shiftList[0].day = 1;
    emp7.shiftList[0].month = 1;
    emp7.shiftList[0].year = 1;
    emp7.shiftList[0].startTime = 0;
    emp7.shiftList[0].endTime = 100;
    sft7.day = 2;
    sft7.month = 1;
    sft7.year = 1;
    sft7.startTime = 100;
    sft7.endTime = 250;

    // same start
    CHECK(checkForOverlap(emp1, sft1) == true);
    // in the middle
    CHECK(checkForOverlap(emp2, sft2) == true);
    // start before
    CHECK(checkForOverlap(emp3, sft3) == true);
    // start after
    CHECK(checkForOverlap(emp4, sft4) == true);
    // wraps
    CHECK(checkForOverlap(emp5, sft5) == true);
    // no overlap
    CHECK(checkForOverlap(emp6, sft6) == false);
    // different day
    CHECK(checkForOverlap(emp7, sft7) == false);

}

TEST_CASE("Testing the empInArray function")
{
    Employee *empArr = new Employee[5];
    empArr[0].id = 1;
    empArr[1].id = 2;
    empArr[2].id = 3;
    empArr[3].id = 4;
    empArr[4].id = 5;
    // in
    CHECK(empInArray(empArr, 5, 2) == true);
    // not in 
    CHECK(empInArray(empArr, 5, 0) == false);
}

TEST_CASE("Testing the employeeExists function")
{
    EmployeeType employees(5);
    employees.empArr[0].id = 1;
    employees.empArr[1].id = 2;
    employees.empArr[2].id = 3;
    employees.empArr[3].id = 4;
    employees.empArr[4].id = 5;
    employees.setArrSize(5);
    // in
    CHECK(employeeExists(&employees, 1) == 0);
    CHECK(employeeExists(&employees, 5) == 4);
    // not in
    CHECK(employeeExists(&employees, 0) == -1);

}

TEST_CASE("Testing the intInArray function")
{
    int *intArr;
    intArr = new int[5];
    intArr[0] = 0;
    intArr[1] = 1;
    intArr[2] = 2;
    intArr[3] = 3;
    intArr[4] = 4;
    // in
    CHECK(intInArray(intArr, 5, 0) == true);
    CHECK(intInArray(intArr, 5, 4) == true);
    // not in
    CHECK(intInArray(intArr, 5, 5) == false);
}

TEST_CASE("Testing the dayOfWeek function")
{
    CHECK(DayOfWeek(28, 4, 2024) == 6);
    CHECK(DayOfWeek(1, 1, 2000) == 5);
    CHECK(DayOfWeek(25, 3, 2024) == 0);
    CHECK(DayOfWeek(18, 7, 1973) == 2);
}

TEST_CASE("Testing the sameWeek function")
{
    Shift sft1, sft2, sft3, sft4, sft5, sft6;
    sft1.day = 28;
    sft1.month = 4;
    sft1.year = 2024;
    sft2.day = 29;
    sft2.month = 4;
    sft2.year = 2024;
    sft3.day = 31;
    sft3.month = 12;
    sft3.year = 2024;
    sft4.day = 1;
    sft4.month = 1;
    sft4.year = 2025;
    sft5.day = 29;
    sft5.month = 2;
    sft5.year = 2024;
    sft6.day = 1;
    sft6.month = 3;
    sft6.year = 2024;
    // sunday to monday
    CHECK(sameWeek(sft1, sft2) == false);
    // year to year
    CHECK(sameWeek(sft3, sft4) == true);
    // month to month (leap year)
    CHECK(sameWeek(sft5, sft6) == true);
}