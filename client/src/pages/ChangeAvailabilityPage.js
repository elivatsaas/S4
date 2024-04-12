import React from "react";
import "../css/ChangeAvailabilityPage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import Property1Default from "../components/Property1Default";
export default function ChangeAvailabilityPage() {
  return (
    <div className='ChangeAvailabilityPage_ChangeAvailabilityPage'>
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
			<span className='ChangeAvailability'>Change Availability</span>
			<div className='Logo'>
				<img className='Vector' src = {ImgAsset.ChangeAvailabilityPage_Vector} />
				<img className='Vector_1' src = {ImgAsset.ChangeAvailabilityPage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.ChangeAvailabilityPage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.ChangeAvailabilityPage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.ChangeAvailabilityPage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.ChangeAvailabilityPage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.ChangeAvailabilityPage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.ChangeAvailabilityPage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.ChangeAvailabilityPage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<Link to='/schedulingpage'>
				<div className='BackButton'>
					<span className='Back'>Back</span>
				</div>
			</Link>
			<div className='ChangeDisplay'>
				<div className='InputDisplay'>
					<div className='InputIndicators'>
						<span className='Employee'>Employee:</span>
						<span className='Day'>Day:</span>
						<span className='StartTime'>Start Time:</span>
						<span className='EndTime'>End Time:</span>
					</div>
					<div className='InputArea'>
						<div className='EmployeeDropdown'>
							<span className='Label'>Placeholder</span>
							<div className='chevrondown'>
								<img className='Vector_9' src = {ImgAsset.ChangeAvailabilityPage_Vector_9} />
							</div>
						</div>
						<Property1Default className='Day_1'/>
						<Property1Default className='StartTime_1'/>
						<Property1Default className='EndTime_1'/>
					</div>
				</div>
				<div className='ChangeButton'>
					<span className='Change'>Change</span>
				</div>
			</div>
		</div>
  );
}
