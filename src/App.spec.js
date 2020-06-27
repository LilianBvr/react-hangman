import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import App from './App'


describe('<App />', () => {
	
	it('should render and match its reference snapshot', () => {
		const mock = sinon
			.stub( App.prototype, 'getRandomWord')
			.returns(Array.from('TEST'))

		try{
			const wrapper = shallow(<App />)
			expect(wrapper).to.matchSnapshot()
		}
		finally{
			mock.restore()
		}
	})
})