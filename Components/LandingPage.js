import React from 'react'
import './LandingPage.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
export default function LandingPage () {
	return (
		<div className='LandingPage_LandingPage'>
			<div className='Rectangle1'/>
			<div className='Rectangle2'/>
			<div className='Frame9'>
				<span className='Home'>Home</span>
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
			<div className='Frame1000007411'>
			</div>
			<div className='Frame1000007412'>
			</div>
			<div className='Frame1000007413'>
				<div className='Frame1000007414'>
					<span className='ScheduleWithEase'>Schedule With Ease!</span>
					<span className='S4isaschedulingsoftwarethatallowsfortheeasycreationofschedulesforyouremployeesthroughanautogeneratingformulabasedoffofthedatayougiveus'> S4 is a scheduling software that allows for the easy creation of schedules for your employees through an auto generating formula, based off of the data you give us!</span>
					<span className='S4makesitschedulingandviewingscheduleseasytouseforallusersfromthosewhocreateschedulestothosewhoworkthem'>S4 makes it  scheduling, and viewing schedules easy to use for all users, from those who create schedules, to those who work them. </span>
				</div>
			</div>
			<div className='Frame12'>
				<div className='Frame10'>
					<span className='LogIn'>Log In</span>
				</div>
				<div className='Frame11'>
					<span className='SignUp'>Sign Up</span>
				</div>
			</div>
			<div className='Screenshot20240326at35932PM1'>
				<img className='Vector' src = {ImgAsset.LandingPage_Vector} />
				<img className='Vector_1' src = {ImgAsset.LandingPage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.LandingPage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.LandingPage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.LandingPage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.LandingPage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.LandingPage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.LandingPage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.LandingPage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
		</div>
	)
}