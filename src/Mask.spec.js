import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import Mask from './Mask'

describe('<Mask />', () => {

    const testMask = Array.from('T__T');

    it('should render and match its reference snapshot', () => {
        expect(shallow(<Mask mask={testMask} />)).to.matchSnapshot()
    })

    describe('unit tests', () => {

        let wrapper

        beforeEach(() => {
            wrapper = shallow(<Mask mask={testMask} />)
        })

        it('should show each letter', () => {
            
            testMask.forEach((letter, index) => {
                expect(wrapper.find('.letter').at(index).text()).to.equal(letter)
            })
        })

        it('should set the hidden class on "_" letters', () => {

            testMask.forEach((letter, index) => {
                if(letter === '_')
                    expect(wrapper.find('.letter').at(index)).to.have.className('hidden')
            })
        })
    })

})