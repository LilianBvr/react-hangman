import React from 'react'
import PropTypes from 'prop-types'

import './Mask.css'

const Mask = ({ mask }) => (
	
	<div className='mask' >
		{
			mask.map(( letter, index ) => (
				<span 
					className={`letter ${ letter==='_' ? 'hidden' : '' }`} 
					key={index}
				>
					{letter}
				</span>
			))
		}	
	</div>
)

Mask.propTypes = {
	mask: PropTypes.array
}

export default Mask