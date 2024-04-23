import React from "react";
import "../css/EmployeePage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
export default function EmployeePage() {
  return (
    <div className='EmployeePage_EmployeePage'>
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
				<span className='Employees'>Employees</span>
			</div>
			<div className='Logo'>
				<img className='Vector' src = {ImgAsset.EmployeePage_Vector} />
				<img className='Vector_1' src = {ImgAsset.EmployeePage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.EmployeePage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.EmployeePage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.EmployeePage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.EmployeePage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.EmployeePage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.EmployeePage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.EmployeePage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<span className='Employees_1'>Employees</span>
			<div className='EmployeeDisplay'>
				<div className='FilterArea'>
					<div className='FilterSelection'>
						<span className='Filters'>Filters:</span>
						<div className='DropdownMenu'>
							<div className='Stores'>
								<span className='Label'>Store</span>
								<div className='chevrondown'>
									<img className='Vector_9' src = {ImgAsset.EmployeePage_Vector_9} />
								</div>
							</div>
							<div className='Roles'>
								<span className='Label_1'>Role</span>
								<div className='chevrondown_1'>
									<img className='Vector_10' src = {ImgAsset.EmployeePage_Vector_10} />
								</div>
							</div>
							<div className='Schedules'>
								<span className='Label_2'>Schedule</span>
								<div className='chevrondown_2'>
									<img className='Vector_11' src = {ImgAsset.EmployeePage_Vector_11} />
								</div>
							</div>
							<div className='Shifts'>
								<span className='Label_3'>Shift</span>
								<div className='chevrondown_3'>
									<img className='Vector_12' src = {ImgAsset.EmployeePage_Vector_12} />
								</div>
							</div>
							<div className='Employees_2'>
								<span className='Label_4'>Employee</span>
								<div className='chevrondown_4'>
									<img className='Vector_13' src = {ImgAsset.EmployeePage_Vector_13} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<span className='Listings'>Listings</span>
			</div>
		</div>
  );
}
