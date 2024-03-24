import { useState } from "react";
import "../../../css/S4_EmployeeInput.css";

export default function EmployeeForm() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <link type="text/css" href="S4_EmployeeInput.css" rel="stylesheet" />
      <a href="/schedules">
        <Button color="primary">
          <Link href="/"> Back </Link>
        </Button>
      </a>
      <title>Employee Data Input</title>
      <h1>Please Enter Employee Data Below</h1>
      {/*Add in action when needing to send data somewhere with post method*/}
      <form>
        <fieldset>
          <legend>New Employee</legend>
          <label htmlFor="fname">First name:</label>
          <input type="text" id="fname" name="fname" required="" />
          <br />
          <label htmlFor="lname">Last name:</label>
          <input type="text" id="lname" name="lname" required="" />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <br />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required=""
          />
          <br />
          <small>Format: 123-456-789</small>
          <br />
          <br />
          <label htmlFor="hireDate">Hire Date:</label>
          <input type="date" id="hireDate" name="hireDate" />
          <br />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" />
          <br />
          <label htmlFor="payRate">Pay Rate:</label>
          <input type="number" id="payRate" name="payRate" />
          <br />
          <input type="submit" defaultValue="Add" />
        </fieldset>
      </form>
    </>
  );
}
