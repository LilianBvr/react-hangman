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
        testedLetters: [],
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

        //TODO : verifier que les lettres testées sont en .hidden
    
    })

})