import React from "react";
import "../css/SignUpPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import Property1Default from "../components/Property1Default";
export default function SignUpPage() {
  return (
    <div className='SignUpPage_SignUpPage'>
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
			<span className='Signup'>Sign up</span>
			<div className='Logo'>
				<img className='Vector' src = {ImgAsset.SignUpPage_Vector} />
				<img className='Vector_1' src = {ImgAsset.SignUpPage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.SignUpPage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.SignUpPage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.SignUpPage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.SignUpPage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.SignUpPage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.SignUpPage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.SignUpPage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<Link to='/landingpage'>
				<div className='BackButton'>
					<span className='Back'>Back</span>
				</div>
			</Link>
			<div className='SignUpDisplay'>
				<div className='SignUpArea'>
					<div className='SignUpDescriptor'>
						<span className='FirstName'>First Name:</span>
						<span className='LastName'>Last Name:</span>
						<span className='Email'>Email:</span>
						<span className='PhoneNumber'>Phone Number:</span>
						<span className='HireDate'>Hire Date:</span>
						<span className='DateofBirth'>Date of Birth:</span>
						<span className='PayRate'>Pay Rate:</span>
						<span className='Password'>Password:</span>
					</div>
					<div className='SignUpInput'>
						<Property1Default className='FirstName_1'/>
						<Property1Default className='LastName_1'/>
						<Property1Default className='Email_1'/>
						<Property1Default className='PhoneNumber_1'/>
						<Property1Default className='HireDate_1'/>
						<Property1Default className='DateOfBirth'/>
						<Property1Default className='PayRate_1'/>
						<Property1Default className='Password_1'/>
					</div>
				</div>
				<div className='SignUpButton'>
					<span className='SignUp'>Sign Up</span>
				</div>
			</div>
		</div>
  );
}
