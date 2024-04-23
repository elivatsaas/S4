import React from "react";
import "../css/ShiftTradePage.css";
import ImgAsset from "../public";
import { Link } from "react-router-dom";
import Property1Default from "../components/Property1Default";
export default function ShiftTradePage() {
  return (
    <div className='ShiftTradePage_ShiftTradePage'>
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
			<span className='RequestShiftTrade'>Request Shift Trade</span>
			<div className='Logo'>
				<img className='Vector' src = {ImgAsset.ShiftTradePage_Vector} />
				<img className='Vector_1' src = {ImgAsset.ShiftTradePage_Vector_1} />
				<img className='Vector_2' src = {ImgAsset.ShiftTradePage_Vector_2} />
				<img className='Vector_3' src = {ImgAsset.ShiftTradePage_Vector_3} />
				<img className='Vector_4' src = {ImgAsset.ShiftTradePage_Vector_4} />
				<img className='Vector_5' src = {ImgAsset.ShiftTradePage_Vector_5} />
				<img className='Vector_6' src = {ImgAsset.ShiftTradePage_Vector_6} />
				<img className='Vector_7' src = {ImgAsset.ShiftTradePage_Vector_7} />
				<img className='Vector_8' src = {ImgAsset.ShiftTradePage_Vector_8} />
				<span className='S4'>S4</span>
			</div>
			<Link to='/schedulingpage'>
				<div className='BackButton'>
					<span className='Back'>Back</span>
				</div>
			</Link>
			<div className='TradeDisplay'>
				<div className='TradeArea'>
					<div className='TradeInputIndicators'>
						<span className='Day'>Day: </span>
						<span className='StartTime'>Start Time:</span>
						<span className='EndTime'>End Time:</span>
					</div>
					<div className='TradeInput'>
						<Property1Default className='Day_1'/>
						<Property1Default className='StartTime_1'/>
						<Property1Default className='EndTime_1'/>
					</div>
				</div>
				<div className='TradeButton'>
					<span className='Request'>Request</span>
				</div>
			</div>
		</div>
  );
}
