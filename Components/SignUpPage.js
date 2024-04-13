import React from 'react'
import './SignUpPage.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
import Property1Default from "./Property1Default"
export default function SignUpPage () {
	return (
		<div className='SignUpPage_SignUpPage'>
			<div className='Rectangle1'/>
			<div className='Rectangle2'/>
			<div className='Frame9'>
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
			<div className='Screenshot20240326at35932PM3'>
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
				<div className='_00Button'>
					<span className='Back'>Back</span>
				</div>
			</Link>
			<div className='Frame1000007423'>
				<div className='Frame1000007404'>
					<div className='Frame15'>
						<span className='FirstName'>First Name:</span>
						<span className='LastName'>Last Name:</span>
						<span className='Email'>Email:</span>
						<span className='PhoneNumber'>Phone Number:</span>
						<span className='HireDate'>Hire Date:</span>
						<span className='DateofBirth'>Date of Birth:</span>
						<span className='PayRate'>Pay Rate:</span>
						<span className='Password'>Password:</span>
					</div>
					<div className='Frame1000007403'>
						<Property1Default className='Frame1'/>
						<Property1Default className='Frame1_1'/>
						<Property1Default className='Frame1_2'/>
						<Property1Default className='Frame1_3'/>
						<Property1Default className='Frame1_4'/>
						<Property1Default className='Frame1_5'/>
						<Property1Default className='Frame1_6'/>
						<Property1Default className='Frame10'/>
					</div>
				</div>
				<div className='_00Button_1'>
					<span className='SignUp'>Sign Up</span>
				</div>
			</div>
		</div>
	)
}