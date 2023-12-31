import 'es6-promise/auto'
import Vue from "vue"
import mutations from "../../../../src/vuex/mutations"
import * as types from '../../../../src/vuex/mutation_types'

window.AudioContext = window.AudioContext || window.webkitAudioContext || function() {
    this.sampleRate = 44100;
    this.destination = {};
    this.createOscillator = function() { /* implement as needed for your tests */ };
    // add any other methods you need to mock
  };  

describe('mutations', () => {
    var state

    beforeEach(() => {
        state = {}
        Vue.noise = {
            start: () => { },
            stop: () => { },
            pause: () => { }
        }
        sinon.spy(Vue.noise, 'start')
        sinon.spy(Vue.noise, 'pause')
        sinon.spy(Vue.noise, 'stop')
    })

    afterEach(() => {
        Vue.noise.start.restore()
        Vue.noise.pause.restore()
        Vue.noise.stop.restore()
    })

    describe('START', () => {
        it('should set all the state properties correctly after start', () => {
            expect(state.started).to.be.undefined
            expect(state.stopped).to.be.undefined
            expect(state.paused).to.be.undefined
            expect(state.interval).to.be.undefined
            mutations[types.START](state)
            expect(state.started).to.be.true
            expect(state.paused).to.be.false
            expect(state.stopped).to.be.false
            expect(state.interval).not.to.be.undefined
        })

        it('should call Vue.noise.start method if both state.isWorking and state.soundEnabled are true', () => {
            state.isWorking = true
            state.soundEnabled = true
            mutations[types.START](state)
            expect(Vue.noise.start).to.have.been.called
        })

        it('should not call Vue.noise.start method if state.isWorking is not true', () => {
            state.isWorking = false
            state.soundEnabled = true
            mutations[types.START](state)
            expect(Vue.noise.start).to.not.have.been.called
        })

        it('should not call Vue.noise.start method if state.soundEnabled is not true', () => {
            state.isWorking = true
            state.soundEnabled = false
            mutations[types.START](state)
            expect(Vue.noise.start).to.not.have.been.called
        })
    })
})