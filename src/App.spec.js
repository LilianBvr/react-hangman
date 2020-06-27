import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import App from './App'
import Restart from './App'
import { on } from 'events'

describe('<App />', () => {

	const word = Array.from('TEST')
	
	it('should render and match its reference snapshot', () => {
		const mock = sinon
			.stub( App.prototype, 'getRandomWord')
			.returns(word)

		try{
			const wrapper = shallow(<App />)
			expect(wrapper).to.matchSnapshot()
		}
		finally{
			mock.restore()
		}
	})

	describe('unit tests', () => {

		let wrapper

		beforeEach(() => {
			wrapper = shallow(<App />)
		})

		it('should show the Mask component', () => {
			expect(wrapper.find('Mask').exists()).to.be.true
		})

		it('should show the Keyboard component', () => {
			expect(wrapper.find('Keyboard').exists()).to.be.true
		})

		it('should show the restart button when the game is over', () => {

			const mock = sinon
				.stub(App.prototype, 'getInitialMask')
				.returns(word)

			try{
				//On remonte le composant pour que le stub prenne effet :
				wrapper = shallow(<App />)

				expect(wrapper.find('Restart').exists()).to.be.true
				expect(wrapper.find('Keyboard').exists()).to.be.false
			}
			finally{
				mock.restore
			}
		})

	})
})