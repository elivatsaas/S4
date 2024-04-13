import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../api/authenticationApi";
import "../css/SignIn.css";
import ImgAsset from "../public";
import Property1Default from "../components/Property1Default";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response);
      if (response.status === 200) {
        history.push("/schedulingpage");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='SignIn_SignIn'>
			<div className='TopBar'/>
			<div className='BottomBar'/>
			<div className='NavBar'>
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
						<Property1Default className='EmailInput'/>
						<Property1Default className='PasswordInput'/>
					</div>
				</div>
				<div className='ButtonArea'>
					<Link to='/landingpage'>
						<div className='BackButton'>
							<span className='Back'>Back</span>
						</div>
					</Link>
					<div className='SignInButton'>
						<span className='SignIn_2'>Sign In</span>
					</div>
				</div>
			</div>
		</div>
  );
}
