import React, { useState, useEffect } from "react";
import "../css/ShiftTradePage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import Property1Default from "../components/Property1Default";
import { getEmployees, getEmployee } from "../api/employeeApi";
import { getShifts, tradeShift, giveShift } from "../api/shiftsApi";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ShiftDropDown from "../components/dropdowns/ShiftDropdown";

export default function ShiftTradePage() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [shiftsOne, setShiftsOne] = useState([]);
  const [shiftsTwo, setShiftsTwo] = useState([]);
  const [firstShiftId, setFirstShiftId] = useState();
  const [secondShiftId, setSecondShiftId] = useState();

  const [employeeDropdownOneOpen, setEmployeeDropdownOneOpen] = useState(false);
  const [employeeDropdownTwoOpen, setEmployeeDropdownTwoOpen] = useState(false);

  const toggleEmployeeOneDropdown = () =>
    setEmployeeDropdownOneOpen(!employeeDropdownOneOpen);

  const toggleEmployeeTwoDropdown = () =>
    setEmployeeDropdownTwoOpen(!employeeDropdownTwoOpen);
  const [shiftDropdownOneOpen, setShiftDropdownOneOpen] = useState(false);
  const [shiftDropdownTwoOpen, setShiftDropdownTwoOpen] = useState(false);

  const toggleShiftOneDropdown = () =>
    setShiftDropdownOneOpen(!shiftDropdownOneOpen);
  const toggleShiftTwoDropdown = () =>
    setShiftDropdownTwoOpen(!shiftDropdownTwoOpen);

  const [selectedFilters, setSelectedFilters] = useState({
    employeeId1: [],
    shiftId1: [],
    employeeId2: [],
    shiftId2: [],
  });

  function isEmpty(array) {
    return Array.isArray(array) && array.length === 0;
  }

  useEffect(() => {
    // Fetch data once at the beginning
    const fetchData = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);

        const shiftsData = await getShifts();
        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchShiftsOne = (employeeId, shifts) => {
      const employeeOneId = employeeId[0].id;
      const employeeOneShifts = shifts.filter(
        (shift) => shift.Employee_id === employeeOneId
      );
      setShiftsOne(employeeOneShifts);
    };

    if (!isEmpty(selectedFilters.employeeId1)) {
      fetchShiftsOne(selectedFilters.employeeId1, shifts);
    }
  }, [selectedFilters.employeeId1, shifts]);

  useEffect(() => {
    const fetchShiftsTwo = (employeeId, shifts) => {
      const employeeTwoId = employeeId[0].id;
      const employeeTwoShifts = shifts.filter(
        (shift) => shift.Employee_id === employeeTwoId
      );
      setShiftsTwo(employeeTwoShifts);
    };

    if (!isEmpty(selectedFilters.employeeId2)) {
      fetchShiftsTwo(selectedFilters.employeeId2, shifts);
    }
  }, [selectedFilters.employeeId2, shifts]);

  // Function to handle filter changes
  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const handleSubmit = async (firstShiftId, secondShiftId) => {
    const shiftTraded = await tradeShift({ firstShiftId, secondShiftId });
    if (shiftTraded.status === "success") {
      alert("Shifts Traded!");
      window.location.href = "/shifttradepage";
    } else alert("Shifts Failed to Trade");
  };
  console.log(firstShiftId);
  console.log(secondShiftId);

  if (
    !isEmpty(selectedFilters.shiftId1) &&
    !isEmpty(selectedFilters.shiftId2) &&
    !firstShiftId &&
    !secondShiftId
  ) {
    let firstShiftId = selectedFilters.shiftId1[0].id;
    let secondShiftId = selectedFilters.shiftId2[0].id;
    setFirstShiftId(firstShiftId);
    setSecondShiftId(secondShiftId);
  }

  return (
    <div className="ShiftTradePage_ShiftTradePage">
      <div className="TopBar" />
      <div className="BottomBar" />
      <div className="NavBar">
        <Link to="/landingpage">
          <span className="Home">Home</span>
        </Link>
        <Link to="/announcementpage">
          <span className="Announcements">Announcements</span>
        </Link>
        <Link to="/schedulingpage">
          <span className="Schedule">Schedule</span>
        </Link>
        <Link to="/employeepage">
          <span className="Employees">Employees</span>
        </Link>
      </div>
      <span className="RequestShiftTrade">Request Shift Trade</span>
      <div className="Logo">
        <img
          className="Vector"
          src={ImgAsset.ShiftTradePage_Vector}
          alt="Vector"
        />
        <img
          className="Vector_1"
          src={ImgAsset.ShiftTradePage_Vector_1}
          alt="Vector_1"
        />
        <img
          className="Vector_2"
          src={ImgAsset.ShiftTradePage_Vector_2}
          alt="Vector_2"
        />
        <img
          className="Vector_3"
          src={ImgAsset.ShiftTradePage_Vector_3}
          alt="Vector_3"
        />
        <img
          className="Vector_4"
          src={ImgAsset.ShiftTradePage_Vector_4}
          alt="Vector_4"
        />
        <img
          className="Vector_5"
          src={ImgAsset.ShiftTradePage_Vector_5}
          alt="Vector_5"
        />
        <img
          className="Vector_6"
          src={ImgAsset.ShiftTradePage_Vector_6}
          alt="Vector_6"
        />
        <img
          className="Vector_7"
          src={ImgAsset.ShiftTradePage_Vector_7}
          alt="Vector_7"
        />
        <img
          className="Vector_8"
          src={ImgAsset.ShiftTradePage_Vector_8}
          alt="Vector_8"
        />
        <span className="S4">S4</span>
      </div>
      <Link to="/schedulingpage">
        <div className="BackButton">
          <span className="Back">Back</span>
        </div>
      </Link>
      <div className="TradeDisplay">
        {employees &&
          employees.length > 0 &&
          isEmpty(selectedFilters.shiftId1) && (
            <>
              <div className="TradeArea">
                <div className="TradeInputIndicators">
                  <span className="Employee1Title">First Employee: </span>
                  <div className="TradeInput1">
                    <EmployeeDropdown
                      employees={employees}
                      isOpen={employeeDropdownOneOpen}
                      toggleDropdown={toggleEmployeeOneDropdown}
                      onSelectEmployee={(selectedEmployees) =>
                        handleFilterChange("employeeId1", selectedEmployees)
                      }
                      selectedEmployees={selectedFilters.employeeId1}
                    />{" "}
                    <div />
                    <div />
                    <div />
                    {!isEmpty(selectedFilters.employeeId1) &&
                      isEmpty(selectedFilters.shiftId1) &&
                      !isEmpty(shiftsOne) && (
                        <>
                          <div className="TradeArea">
                            <div className="TradeInputIndicators">
                              <span className="Shift1Title">Shift:</span>
                              <div className="TradeInput1Shift">
                                {shiftsOne && shiftsOne.length > 0 && (
                                  <ShiftDropDown
                                    shifts={shiftsOne}
                                    isOpen={shiftDropdownOneOpen}
                                    toggleDropdown={toggleShiftOneDropdown}
                                    onSelectShift={(selectedShifts) =>
                                      handleFilterChange(
                                        "shiftId1",
                                        selectedShifts
                                      )
                                    }
                                    selectedShifts={selectedFilters.shiftId1}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}
        <div>
          {employees &&
            employees.length > 0 &&
            !isEmpty(selectedFilters.employeeId1) &&
            !isEmpty(selectedFilters.shiftId1) && (
              <>
                <div className="TradeArea">
                  <div className="TradeInputIndicators">
                    <span className="Employee2Title">Second Employee:</span>
                    <div className="TradeInput2">
                      <EmployeeDropdown
                        employees={employees}
                        isOpen={employeeDropdownTwoOpen}
                        toggleDropdown={toggleEmployeeTwoDropdown}
                        onSelectEmployee={(selectedEmployees) =>
                          handleFilterChange("employeeId2", selectedEmployees)
                        }
                        selectedEmployees={selectedFilters.employeeId2}
                      />
                    </div>
                  </div>
                </div>

                {!isEmpty(selectedFilters.employeeId2) &&
                  isEmpty(selectedFilters.shiftId2) &&
                  !isEmpty(shiftsTwo) && (
                    <>
                      <div className="TradeArea">
                        <div className="TradeInputIndicators">
                          <span className="Shift2Title">Shift:</span>
                          <div className="TradeInput2Shift">
                            {shiftsTwo && shiftsTwo.length > 0 && (
                              <ShiftDropDown
                                shifts={shiftsTwo}
                                isOpen={shiftDropdownTwoOpen}
                                toggleDropdown={toggleShiftTwoDropdown}
                                onSelectShift={(selectedShifts) =>
                                  handleFilterChange("shiftId2", selectedShifts)
                                }
                                selectedShifts={selectedFilters.shiftId2}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
              </>
            )}
        </div>
      </div>
      {!isEmpty(selectedFilters.employeeId1) &&
        !isEmpty(selectedFilters.shiftId1) &&
        !isEmpty(selectedFilters.employeeId2) &&
        !isEmpty(selectedFilters.shiftId2) && (
          <div className="TradeDisplay">
            <div className="TradeButton">
              <input
                type="button"
                name="request"
                id="request"
                value="Request"
                onClick={() => handleSubmit(firstShiftId, secondShiftId)}
              />
            </div>
          </div>
        )}
    </div>
  );
}
