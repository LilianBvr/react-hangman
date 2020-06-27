import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import App from './App'

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
				mock.restore()
			}
		})

	})

	describe('implementation tests', () => {

		let wrapper

		it('should update mask when click on a correct letter', () => {

			const mock = sinon
				.stub( App.prototype, 'getRandomWord')
				.returns(word)

			try{
				wrapper = mount(<App />)

				wrapper.find('.keyboard .letter').at(4).simulate('click')
				expect(wrapper.find('Mask').prop('mask')).to.deep.equal(Array.from('TE_T'))
			}
			finally{
				mock.restore()
			}
		})

		it('should NOT update the mask when clicking on a non-correct letter', () => {

			const mock = sinon
				.stub( App.prototype, 'getRandomWord')
				.returns(word)

			try{
				wrapper = mount(<App />)

				wrapper.find('.keyboard .letter').at(0).simulate('click')
				expect(wrapper.find('Mask').prop('mask')).to.deep.equal(Array.from('T__T'))
			}
			finally{
				mock.restore()
			}
		})

		it('should restart the game when click on the restart button', () => {
		
			wrapper = mount(<App />)
			wrapper.setState({ won: true })

			wrapper.find('.restart').simulate('click')
			expect(wrapper.find('Mask').prop('mask')).not.to.deep.equal(Array.from('T__T'))
			
		})

		it('should NOT update the mask when clicking on a tested letter', () => {

			wrapper = mount(<App />)
			wrapper.setState({
				word: Array.from('TEST'),
				mask: Array.from('TE_T'),
				testedLetters: ['T', 'E'],
				won: false
			})

			wrapper.find('.keyboard .letter').at(4).simulate('click')
			expect(wrapper.find('Mask').prop('mask')).to.deep.equal(Array.from('TE_T'))
		})
	})
})