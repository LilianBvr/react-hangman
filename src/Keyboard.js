import React from 'react'
import PropTypes from 'prop-types'

import './Keyboard.css'

const Keyboard = ({ letters, testedLetters, onClick}) => (

	<div className='keyboard'>
		{
			letters.map(( letter, index ) => (
				<button 
					className={`letter ${testedLetters.includes(letter) ? 'tested' : ''}`}
					key={index}
					onClick={() => onClick(letter)}
				>
					{letter}
				</button>
			))
		}
	</div>
)

Keyboard.propTypes = {
	letters: PropTypes.array,
	testedLetters: PropTypes.array
}

export default Keyboard