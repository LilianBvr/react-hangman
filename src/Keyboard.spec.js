import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Keyboard from './Keyboard'
import { LETTERS } from './App'

describe(' <Keyboard /> ', () => {

    const onClickMock = sinon.spy()
    const props = {
        letters: LETTERS,
        testedLetters: ['A','E'],
        onClick: () => {onClickMock()}
    }

    it('should render and match its reference snapshot', () => {
        expect(mount( <Keyboard {...props} />)).to.matchSnapshot()
    })

    describe('unit tests', () => {
        let wrapper

        beforeEach(() => {
            wrapper = shallow( <Keyboard {...props} />)
        })

        it('should call its onClick prop when clicking on a button', ()=>{

            wrapper.find('.letter').at(4).simulate('click')
            expect(onClickMock).to.have.been.called()
        })

        it('should show each letter', () => {
            
            LETTERS.forEach((letter, index) => {
                expect(wrapper.find('.letter').at(index).text()).to.equal(letter)
            })
        })

        it('should set "tested" class on tested letters', () => {

            LETTERS.forEach((letter, index) => {

                if(props.testedLetters.includes(letter))
                    expect(wrapper.find('.letter').at(index)).to.have.className('tested')
            })
        })
    
    })

})