import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../api/authenticationApi";
import "../css/SignIn.css";
import ImgAsset from "../public";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
	if(email.length === 0){
		alert("Email has been left blank!");
	}
	else if ([password].length === 0){
		alert("Password has been left blank!")
	}
	else{
		login({email, password});
	}
  }
  

  return (
    <div className='SignIn_SignIn'>
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
			<div className='Logo'>
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
			<div className='SignInDisplay'>
				<div className='SignInArea'>
					<div className='InputSpecifier'>
						<span className='Email'>Email:</span>
						<span className='Password'>Password:</span>
					</div>
					<div className='InputArea'>
						<input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
						<input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
				</div>
				<div className='ButtonArea'>
					<Link to='/landingpage'>
						<div className='BackButton'>
							<span className='Back'>Back</span>
						</div>
					</Link>
					<div className='SignInButton'>
						<input type="button" name="logIn" id="logIn" value="Sign In" onClick={handleSubmit}/>
					</div>
				</div>
			</div>
		</div>
  );
}
