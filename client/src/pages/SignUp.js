import React from "react";
import "../css/SignUpPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/authenticationApi";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [payRate, setPayRate] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const handleSubmit = async () => {
    if (firstName.length === 0) {
      alert("First name has been left blank!");
    } else if (lastName.length === 0) {
      alert("Last name has been left blank!");
    } else if (email.length === 0) {
      alert("Email has been left blank!");
    } else if (phoneNumber.length === 0) {
      alert("Phone number has been left blank!");
    } else if (hireDate.length === 0) {
      alert("Hire date has been left blank!");
    } else if (birthDate.length === 0) {
      alert("Date of birth has been left blank!");
    } else if (password.length === 0) {
      alert("Password has been left blank!");
    } else if (passwordConfirm.length === 0) {
      alert("Confirm password has been left blank!");
    } else if (password !== passwordConfirm) {
      alert("Passwords don't match!");
    } else {
      const signedup = await signup({
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        birthDate,
        payRate,
        password,
        passwordConfirm,
      });
      console.log(signedup);
      if (signedup.status === 201) {
        alert("Employee Added!");
        window.location.href = "/signin";
      } else {
        alert("failed to sign up");
      }
    }
  };

  return (
    <div className="SignUpPage_SignUpPage">
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
      <span className="Signup">Sign up</span>
      <div className="Logo">
        <img className="Vector" src={ImgAsset.SignUpPage_Vector} />
        <img className="Vector_1" src={ImgAsset.SignUpPage_Vector_1} />
        <img className="Vector_2" src={ImgAsset.SignUpPage_Vector_2} />
        <img className="Vector_3" src={ImgAsset.SignUpPage_Vector_3} />
        <img className="Vector_4" src={ImgAsset.SignUpPage_Vector_4} />
        <img className="Vector_5" src={ImgAsset.SignUpPage_Vector_5} />
        <img className="Vector_6" src={ImgAsset.SignUpPage_Vector_6} />
        <img className="Vector_7" src={ImgAsset.SignUpPage_Vector_7} />
        <img className="Vector_8" src={ImgAsset.SignUpPage_Vector_8} />
        <span className="S4">S4</span>
      </div>
      <Link to="/landingpage">
        <div className="BackButton">
          <span className="Back">Back</span>
        </div>
      </Link>
      <div className="SignUpDisplay">
        <div className="SignUpArea">
          <div className="SignUpDescriptor">
            <span className="FirstName">First Name:</span>
            <span className="LastName">Last Name:</span>
            <span className="Email">Email:</span>
            <span className="PhoneNumber">Phone Number:</span>
            <span className="HireDate">Hire Date:</span>
            <span className="DateofBirth">Date of Birth:</span>
            <span className="PayRate">Pay Rate:</span>
            <span className="Password">Password:</span>
            <span className="confirmPassword">Confirm Password:</span>
          </div>
          <div className="SignUpInput">
            <input
              type="text"
              name="fistName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="date"
              name="hireDate"
              id="hireDate"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
            />
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setbirthDate(e.target.value)}
            />
            <input
              type="number"
              name="payRate"
              id="payRate"
              value={payRate}
              onChange={(e) => setPayRate(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="SignUpButton">
          <input
            type="button"
            name="signUp"
            id="signUp"
            value="Sign Up"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
