import React, { useEffect, useState } from "react";
import "../css/AnnouncementMessage.css";
import { getEmployee } from "../api/employeeApi";
const AnnouncementMessage = ({ text, employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeData = await getEmployee(employeeId);
      setEmployee(employeeData);
    };

    fetchEmployee();
  }, [employeeId]);

  return (
    <div className="AnnouncementBox">
      <div className="AnnouncementMessage">
        <div>{text}</div>
        {employee && (
          <div>
            Sent by: {employee.firstName} {employee.lastName}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementMessage;
