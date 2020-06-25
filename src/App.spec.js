import React from 'react'
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App'

afterEach(cleanup)

describe('<App />', () => {

	it('should render without crashing', () => {
		const wrapper = shallow(<App />)
	})


})