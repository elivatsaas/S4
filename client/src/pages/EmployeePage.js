import React, { useState, useEffect } from "react";
import "../css/EmployeePage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import {
  getEmployees,
  getEmployeeRoles,
  getEmployeeStores,
} from "../api/employeeApi";
import { getRoles } from "../api/rolesApi";
import { getStores } from "../api/storesApi";
import Navigation from "../components/NavBar";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [popupPosition, setPopupPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeRoles, setEmployeeRoles] = useState(
    Array(employees.length).fill([])
  );
  const [employeeStores, setEmployeeStores] = useState(
    Array(employees.length).fill([])
  );

  useEffect(() => {
    fetchEmployeesData();
    fetchEmployeeRoles();
    fetchEmployeeStores();
  }, []);

  const fetchEmployeesData = async () => {
    try {
      const employeesData = await getEmployees();
      const rolesData = await getRoles();
      const storeData = await getStores();
      setEmployees(employeesData);
      setRolesData(rolesData);
      setStoresData(storeData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees data:", error);
    }
  };

  const fetchEmployeeRoles = async () => {
    try {
      // Fetch roles for each employee
      const roles = await Promise.all(
        employees.map((employee) => getEmployeeRoles(employee.id))
      );
      setEmployeeRoles(roles);
    } catch (error) {
      console.error("Error fetching employee roles:", error);
    }
  };

  const fetchEmployeeStores = async () => {
    try {
      // Fetch stores for each employee
      const stores = await Promise.all(
        employees.map((employee) => getEmployeeStores(employee.id))
      );
      setEmployeeStores(stores);
    } catch (error) {
      console.error("Error fetching employee stores:", error);
    }
  };

  const handleEmployeeClick = async (employee, e) => {
    setSelectedEmployee(employee);
    try {
      // Fetch roles and stores for the selected employee
      const roles = await getEmployeeRoles(employee.id);
      const stores = await getEmployeeStores(employee.id);
      setEmployeeRoles([roles]);
      setEmployeeStores([stores]);
      setPopupPosition({
        top: e.clientY,
        left: e.clientX,
      });
      setIsModalOpen(true); // Open the modal when an employee box is clicked
    } catch (error) {
      console.error("Error fetching roles and stores for employee:", error);
    }
  };
  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false); // Close the modal when the close button is clicked
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="EmployeePage_EmployeePage">
      <div className="TopBar" />
      <div className="BottomBar" />
      <div>
        <Navigation />
        <span className="S4">S4</span>
      </div>
      <span className="Employees_1">Employees</span>
      <div className="EmployeeDisplay">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            className="EmployeeBox"
            onClick={(event) => handleEmployeeClick(employee, event)}
          >
            <p>{`${employee.firstName} ${employee.lastName}`}</p>
          </div>
        ))}
      </div>
      {isModalOpen && selectedEmployee && (
        <div
          className="popup"
          style={{
            position: "absolute",
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 2,
            background: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div className="popup-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>
              {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            </h2>
            <p>Email: {selectedEmployee.email}</p>
            <p>
              Phone: {selectedEmployee.phoneNumber.slice(0, 3)}-
              {selectedEmployee.phoneNumber.slice(3, 6)}-
              {selectedEmployee.phoneNumber.slice(6, 10)}
            </p>
            <p>Hire Date: {selectedEmployee.hireDate.slice(0, 10)}</p>
            <p>Age: {calculateAge(selectedEmployee.birthDate)}</p>

            <p>
              Roles:{" "}
              {employeeRoles
                .find(
                  (roles) =>
                    roles.length > 0 &&
                    roles[0].Employee_id === selectedEmployee.id
                )
                ?.map((role) => {
                  const foundRole = rolesData.find(
                    (data) => data.id === role.Role_id
                  );
                  return foundRole ? foundRole.roleName : "";
                })
                .join(", ")}
            </p>

            <p>
              Stores:{" "}
              {employeeStores
                .find(
                  (stores) =>
                    stores.length > 0 &&
                    stores[0].Employee_id === selectedEmployee.id
                )
                ?.map((store) => {
                  const foundStore = storesData.find(
                    (data) => data.id === store.Store_id
                  );
                  return foundStore ? foundStore.storeName : "";
                })
                .join(", ")}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
