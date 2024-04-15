import React from 'react'
import './Property1Variant2.css'
import ImgAsset from '../public'
export default function Property1Variant2 (props) {
	return (
		<div className={`Property1Variant2_Property1Variant2 ${props.className}`}>
			<img className='Left' src = {ImgAsset.Property1Variant2_Left} />
			<img className='Right' src = {ImgAsset.Property1Variant2_Right} />
			<span className='DefaultLabel'>Default Label</span>
			<img className='TopLine' src = {ImgAsset.Property1Variant2_TopLine} />
			<img className='BottomLine' src = {ImgAsset.Property1Variant2_BottomLine} />
		</div>
	)
}