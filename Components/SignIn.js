import React from 'react'
import './SignIn.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
import Property1Default from "./Property1Default"
export default function SignIn () {
	return (
		<div className='SignIn_SignIn'>
			<div className='Rectangle1'/>
			<div className='Rectangle2'/>
			<div className='Frame9'>
				<Link to='/landingpage'>
					<span className='Home'>Home</span>
				</Link>
				<span className='Announcements'>Announcements</span>
				<Link to='/schedulingpage'>
					<span className='Schedule'>Schedule</span>
				</Link>
				<Link to='/employeepage'>
					<span className='Employees'>Employees</span>
				</Link>
			</div>
			<div className='Screenshot20240326at35932PM2'>
				<img className='Vector' src = {ImgAsset.SignIn_Vector} />
				<img className='Vector_1' src = {ImgAsset.SignIn_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.SignIn_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.SignIn_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.SignIn_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.SignIn_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.SignIn_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.SignIn_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.SignIn_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<span className='SignIn_1'>Sign In</span>
			<div className='Frame1000007419'>
				<div className='Frame1000007417'>
					<div className='Frame1000007416'>
						<span className='Email'>Email:</span>
						<span className='Password'>Password:</span>
					</div>
					<div className='Frame1000007415'>
						<Property1Default className='Frame1'/>
						<Property1Default className='Frame10'/>
					</div>
				</div>
				<div className='Frame1000007418'>
					<Link to='/landingpage'>
						<div className='_00Button'>
							<span className='Back'>Back</span>
						</div>
					</Link>
					<div className='_00Button_1'>
						<span className='SignIn_2'>Sign In</span>
					</div>
				</div>
			</div>
		</div>
	)
}