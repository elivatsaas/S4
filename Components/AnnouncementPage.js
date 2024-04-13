import React from 'react'
import './AnnouncementPage.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
export default function AnnouncementPage () {
	return (
		<div className='AnnouncementPage_AnnouncementPage'>
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
				<img className='Vector' src = {ImgAsset.AnnouncementPage_Vector} />
				<img className='Vector_1' src = {ImgAsset.AnnouncementPage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.AnnouncementPage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.AnnouncementPage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.AnnouncementPage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.AnnouncementPage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.AnnouncementPage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.AnnouncementPage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.AnnouncementPage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<span className='Announcements_1'>Announcements</span>
			<div className='Frame1000007427'>
				<div className='Frame1000007424'>
					<div className='Frame1000007426'>
						<span className='Filters'>Filters:</span>
						<div className='Frame1000007425'>
							<div className='_04Dropdown'>
								<span className='Label'>Store</span>
								<div className='chevrondown'>
									<img className='Vector_9' src = {ImgAsset.AnnouncementPage_Vector_9} />
								</div>
							</div>
							<div className='_04Dropdown_1'>
								<span className='Label_1'>Role</span>
								<div className='chevrondown_1'>
									<img className='Vector_10' src = {ImgAsset.AnnouncementPage_Vector_10} />
								</div>
							</div>
							<div className='_04Dropdown_2'>
								<span className='Label_2'>Schedule</span>
								<div className='chevrondown_2'>
									<img className='Vector_11' src = {ImgAsset.AnnouncementPage_Vector_11} />
								</div>
							</div>
							<div className='_04Dropdown_3'>
								<span className='Label_3'>Shift</span>
								<div className='chevrondown_3'>
									<img className='Vector_12' src = {ImgAsset.AnnouncementPage_Vector_12} />
								</div>
							</div>
							<div className='_04Dropdown_4'>
								<span className='Label_4'>Employee</span>
								<div className='chevrondown_4'>
									<img className='Vector_13' src = {ImgAsset.AnnouncementPage_Vector_13} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<span className='MessageArea'>Message Area</span>
			</div>
		</div>
	)
}