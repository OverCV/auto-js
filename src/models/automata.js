import State from './state.js'
import Transition from './transition.js'
/* TODO: Maybe FunctionTrans class??? */

export default class Automata {
    constructor() {
        this.name = ''
        this.states = []
        this.transitions = []
        this.regEx = ''
        this.language = []
    }

    setName(name) {
        this.name = name
    }
    getName() {
        return this.name
    }

    runTransitionFunction() {
        this.transitionFunction()
    }

    setStates(states) {
        this.states = states
    }
    getStates() {
        return this.states
    }
    /**
    * This function works to get an Automata State with only its "data", that has to be unique.
    * @param {list} list is the list of elements where the specific automata object would be searched.
    * @param {object} obj is the graph object, a State.
    * @returns the object if exists, if doesn't will return a null datatype.
    */
    getState(data) {
        return this.states.find(state => state.data.includes(data))
    }
    addAdjacent(data, adjacent) {
        let state = this.getState(data)
        state.setAdjacent(adjacent)
    }

    setTransitions(transitions) {
        this.transitions = transitions
    }
    getTransitions() {
        return this.transitions
    }

    getAlphabet() {
        return this.regEx
    }

    existObj(list, obj) {
        return list.some(item => JSON.stringify(item) === JSON.stringify(obj))
    }

    existState(data) {
        return this.states.some(state => state.data.includes(data));
    }

    getInitialState() {
        let initialState
        this.states.forEach(state => {
            if (state.getIsInitial()) { initialState = state; return }
        })
        return initialState
    }

    newState(data, isFinal) {
        let newState = new State(data)
        if (isFinal) {
            newState.isFinal = true
        }
        if (this.existObj(this.states, newState)) {
            console.log('State already exists.')
            return
        }

        this.states.push(newState)
        console.log('New state added.')
    }

    newTransition(starts, ends, data) {
        let newTransition = new Transition(starts, ends, data)

        if (this.existObj(this.transitions, newTransition)) {
            // console.log('Transition already exists.')
            return
        }

        if (data.contains('_')) { data = ['_'] }

        if (this.existState(starts) && this.existState(ends)) {
            // if (this.alphabet.test(data)) {
            // }
            let starterState = this.getState(starts)
            starterState.addAdjacent(ends)
            // getAdjacent().push(ends)
            this.transitions.push(newTransition)

            console.log('New transition added.')
            return
        }
        console.log('No transition added.')
    }

    setAlphabet(symbols) {
        this.regEx = new RegExp(`^[${symbols}]+$`)
    }

    getLanguage() {
        this.transitions.forEach(tran => {
            tran.getChars().forEach(char => {
                if (char == '_') {
                    return
                }
                if (!this.language.includes(char)) {
                    this.language.push(char)
                }
            })
        })
        return this.language
    }

    seeStates(str = '') {
        this.states.forEach(state => {
            str += state.toString() + ' '
        })
        return str
    }

    seeTransitions() {
        let str = ''
        this.transitions.forEach(transition => {
            str += transition.toString() + ' '
        })
        return str
    }

    toString() {
        return `States: ${this.seeStates()}
                Transitions: ${this.seeTransitions()}
                Alphabet: ${this.regEx}`
    }
}