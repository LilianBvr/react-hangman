import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import Mask from './Mask'

describe('<Mask />', () => {

    it('should render and match its reference snapshot', () => {
        expect(shallow(<Mask mask={Array.from('T__T')} />)).to.matchSnapshot()
    })
})