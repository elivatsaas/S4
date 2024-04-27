import React, { useState, useEffect } from "react";
import "../css/AddShiftPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import { getStores } from "../api/storesApi";
import { getRoles } from "../api/rolesApi";
import { getEmployees } from "../api/employeeApi";
import { getSchedules } from "../api/schedulesApi";
import StoreDropdown from "../components/dropdowns/StoreDropdown";
import RoleDropdown from "../components/dropdowns/RoleDropdown";
import EmployeeDropdown from "../components/dropdowns/EmployeeDropdown";
import ScheduleDropdown from "../components/dropdowns/ScheduleDropdown";
import { addShift } from "../api/shiftsApi";

export default function AddShiftPage() {

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const toggleStoreDropdown = () => setStoreDropdownOpen(!storeDropdownOpen);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const toggleRoleDropdown = () => setRoleDropdownOpen(!roleDropdownOpen);

  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const toggleEmployeeDropdown = () =>
    setEmployeeDropdownOpen(!employeeDropdownOpen);

  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const toggleScheduleDropdown = () =>
    setScheduleDropdownOpen(!scheduleDropdownOpen);

  const [selectedFilters, setSelectedFilters] = useState({
	storeIds: [],
	roleIds: [],
	employeeIds: [],
	scheduleIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);

        const rolesData = await getRoles();
        setRoles(rolesData);

        const employeesData = await getEmployees();
        setEmployees(employeesData);

        const schedulesData = await getSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: selectedValues });
  };

  const handleSubmit = () => {
	console.log(selectedFilters.employeeIds, selectedFilters.roleIds,
		selectedFilters.storeIds, selectedFilters.scheduleIds);
	var Employee_id = 0;
	var Schedule_id = 0;
	var Role_id = 0;
	var Store_id = 0;
	
	if (selectedFilters.employeeIds.length !== 0 && 
	    selectedFilters.employeeIds.length < 2 && 
	    selectedFilters.roleIds.length !== 0 && 
	    selectedFilters.roleIds.length < 2 && 
	    selectedFilters.storeIds.length !== 0 && 
	    selectedFilters.storeIds.length < 2 &&
		selectedFilters.scheduleIds.length !== 0 && 
	    selectedFilters.scheduleIds.length < 2) {
		
		Employee_id = selectedFilters.employeeIds[0].id;
		Schedule_id = selectedFilters.scheduleIds[0].id;
		Role_id = selectedFilters.roleIds[0].id;
		Store_id = selectedFilters.storeIds[0].id;
		console.log(Employee_id, Schedule_id, Role_id, Store_id);
		
		if (date.length === 0){
			alert("Date has been left blank!");
		}
		else if (startTime.length === 0){
			alert("Start time has been left blank!")
		}
		else if (endTime.length === 0){
			alert("End time has been left blank!");
		}
		else{
			addShift({date, startTime, endTime, Employee_id, Schedule_id,
					Role_id, Store_id});
			alert("Submitted!")
		}
	} else {
		if (selectedFilters.employeeIds.length === 0 || 
			selectedFilters.employeeIds.length > 1){
			alert("Employee not selected/Multiple Selected!");
		}
		else if (selectedFilters.roleIds.length === 0 || 
				 selectedFilters.roleIds.length > 1){
			alert("Role not selected/Multiple Selected!");
		}
		else if (selectedFilters.storeIds.length === 0 || 
				 selectedFilters.storeIds.length > 1){
			alert("Store not selected/Multiple Selected!");
		}
		else {
			alert("Schedule not selected/Multiple Selected!")
		}
	}
  }

  return (
    <div className='AddShiftPage_AddShiftPage'>
			<div className='TopBar'/>
			<div className='BottomBar'/>
			<div className='NavBar'>
				<Link to='/landingpage'>
					<span className='Home'>Home</span>
				</Link>
				<Link to='/announcementpage'>
					<span className='Announcements'>Announcements</span>
				</Link>
				<Link to='/schedulingpage'>
					<span className='Schedule'>Schedule</span>
				</Link>
				<Link to='/employeepage'>
					<span className='Employees'>Employees</span>
				</Link>
			</div>
			<span className='AddShift'>Add Shift</span>
			<div className='Logo'>
				<img className='Vector' src = {ImgAsset.AddShiftPage_Vector} />
				<img className='Vector_1' src = {ImgAsset.AddShiftPage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.AddShiftPage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.AddShiftPage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.AddShiftPage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.AddShiftPage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.AddShiftPage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.AddShiftPage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.AddShiftPage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<Link to='/schedulingpage'>
				<div className='BackButton'>
					<span className='Back'>Back</span>
				</div>
			</Link>
			<div className='AddDisplay'>
				<div className='InputDisplay'>
					<div className='InputIndicators'>
						<span className='Employee'>Employee:</span>
						<span className='Role'>Role:</span>
						<span className='Store'>Store:</span>
						<span className='Schedule'>Schedule:</span>
						<span className="Date">Date:</span>
						<span className='StartTime'>Start Time:</span>
						<span className='EndTime'>End Time:</span>
					</div>
					<div className='InputArea'>
						<div className='Dropdowns'>
							
							{employees && employees.length > 0 && (
                			<EmployeeDropdown
							employees={employees}
							isOpen={employeeDropdownOpen}
							toggleDropdown={toggleEmployeeDropdown}
							onSelectEmployee={(selectedEmployees) =>
							handleFilterChange("employeeIds", selectedEmployees)
                  			}
                  			selectedEmployees={selectedFilters.employeeIds}
                			/>
              				)}
              			
							{roles && roles.length > 0 && (
							<RoleDropdown
							roles={roles}
							isOpen={roleDropdownOpen}
							toggleDropdown={toggleRoleDropdown}
							onSelectRole={(selectedRoles) =>
                    		handleFilterChange("roleIds", selectedRoles)
							}
							selectedRoles={selectedFilters.roleIds}
                			/>
              				)}

							{stores && stores.length > 0 && (
							<StoreDropdown
							stores={stores}
							isOpen={storeDropdownOpen}
							toggleDropdown={toggleStoreDropdown}
							onSelectStore={(selectedStores) =>
							handleFilterChange("storeIds", selectedStores)
							}
							selectedStores={selectedFilters.storeIds}
							/>
							)}
              
			  				{schedules && schedules.length > 0 && (
                			<ScheduleDropdown
                  			schedules={schedules}
                  			isOpen={scheduleDropdownOpen}
							toggleDropdown={toggleScheduleDropdown}
							onSelectSchedule={(selectedSchedules) =>
                    		handleFilterChange("scheduleIds", selectedSchedules)
                  			}
                  			selectedSchedules={selectedFilters.scheduleIds}
                			/>
              				)}
						</div>
						<input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
						<input type="time" name="startTime" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
						<input type="time" name="endTime" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
					</div>
				</div>
				<div className='AddButton'>
					<input type="button" name="add" id="add" value="Add" onClick={handleSubmit}/>
				</div>
			</div>
		</div>
  );
}
