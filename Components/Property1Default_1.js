import React from 'react'
import './Property1Default_1.css'
import ImgAsset from '../public'
export default function Property1Default_1 (props) {
	return (
		<div className={`Property1Default_1_Property1Default ${props.className}`}>
			<img className='Left' src = {ImgAsset.Property1Default_1_Left} />
			<img className='Right' src = {ImgAsset.Property1Default_1_Right} />
			<span className='DefaultLabel'>Default Label</span>
			<img className='TopLine' src = {ImgAsset.Property1Default_1_TopLine} />
			<img className='BottomLine' src = {ImgAsset.Property1Default_1_BottomLine} />
		</div>
	)
}