import React from 'react'
import './DemoTesting.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
export default function DemoTesting () {
	return (
		<div className='DemoTesting_DemoTesting'>
			<div className='FormField'>
				<div className='Property1Default'>
					<img className='Left' src = {ImgAsset.DemoTesting_Left} />
					<img className='Right' src = {ImgAsset.DemoTesting_Right} />
					<span className='DefaultLabel'>Default Label</span>
					<img className='TopLine' src = {ImgAsset.DemoTesting_TopLine} />
					<img className='BottomLine' src = {ImgAsset.DemoTesting_BottomLine} />
				</div>
				<div className='Property1Variant2'>
					<img className='Left_1' src = {ImgAsset.DemoTesting_Left_1} />
					<img className='Right_1' src = {ImgAsset.DemoTesting_Right_1} />
					<span className='DefaultLabel_1'>Default Label</span>
					<img className='TopLine_1' src = {ImgAsset.DemoTesting_TopLine_1} />
					<img className='BottomLine_1' src = {ImgAsset.DemoTesting_BottomLine_1} />
				</div>
			</div>
			<div className='_00Button'>
			</div>
			<div className='_04Dropdown'>
				<span className='Label'>Placeholder</span>
				<div className='chevrondown'>
					<img className='Vector' src = {ImgAsset.DemoTesting_Vector} />
				</div>
			</div>
			<div className='Field'>
				<span className='Label_1'>email@domain.com</span>
			</div>
			<div className='Frame1'>
				<div className='Property1Default_1'>
				</div>
				<div className='Property1Input'>
					<span className='Text'> </span>
				</div>
			</div>
			<div className='Checkbox'>
				<Link to='/checkedtrue'>
					<div className='CheckedFalse'>
						<div className='Rectangle'/>
					</div>
				</Link>
				<Link to='/checkedfalse'>
					<div className='CheckedTrue'>
						<img className='check' src = {ImgAsset.DemoTesting_check} />
					</div>
				</Link>
			</div>
		</div>
	)
}