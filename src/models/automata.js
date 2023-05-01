import State from './state.js'
import Transition from './transition.js'
/* TODO: Maybe FunctionTrans class??? */

export default class Automata {
    constructor() {
        this.name = ''
        this.states = []
        this.transitions = []
        this.alphabet = ''
        // this.transitionFunction = transition
        // this.Function = algorithm
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

    setTransitions(transitions) {
        this.transitions = transitions
    }
    getTransitions() {
        return this.transitions
    }

    getAlphabet() {
        return this.alphabet
    }

    existObj(list, obj) {
        return list.some(item => JSON.stringify(item) === JSON.stringify(obj))
    }

    existState(data) {
        return this.states.some(state => state.data.includes(data));
    }

    newState(data, final) {
        let newState = new State(data)
        if (final) newState.isEnd = true
        if (this.existObj(this.states, newState)) {
            console.log('State already exists.')
            return
        }

        this.states.push(newState)
        console.log('New state added.')
    }

    newTransition(start, end, data) {
        let newTransition = new Transition(start, end, data)

        if (this.existObj(this.transitions, newTransition)) {
            console.log('Transition already exists.')
            return
        }

        if (this.existState(start) && this.existState(end)) {
            if (this.alphabet.test(data)) {
                let state = this.getState(start)
                state.getAdjacent().push(end)
                this.transitions.push(newTransition)

                console.log('New transition added.')
                return
            }
        }
        console.log('No transition added.')
    }

    setAlphabet(symbols) {
        this.alphabet = new RegExp(`^[${symbols}]+$`)
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

    /*  */

    // readString(string) {
    //     // read each character of the string
    //     for (let i = 0; i < string.length; i++) {
    //         console.log(string[i])
    //     }
    // }

    toString() {
        return `States: ${this.seeStates()}
                Transitions: ${this.seeTransitions()}
                Alphabet: ${this.alphabet}`
    }
}