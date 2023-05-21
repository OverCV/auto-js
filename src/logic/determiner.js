import Automata from "../models/automata.js"
import State from "../models/state.js"
import Transition from "../models/transition.js"

export default class Determiner {

    constructor() {
        this.automata = null
        this.actualState = null
        this.setStates = []
        this.adjacent = []
    }

    /**
     * Algorithm that given  an automata, return it's normalized version,
     * without lambda states or multiple equal transition characters, into an AFD from AFND.
     */
    determine() {

        this.adjacent = []
        this.adjacentStates(this.automata.getStates()[0], 'a', true)
        console.log('Final adjacent:', this.adjacent)
        return

        let language = this.automata.getLanguage()
        let charDict = this.createDictionary(language)

        // For each new state
        let states = this.automata.getStates()
        states.forEach(state => {
            let set = this.realAdjacent(charDict, state)
        });

        // Auto refactoring
        // let auto = this.automataFormat()
        // Auto assignment
        return auto
    }

    /**
     * Function that for all the states, given a transition character, shows where you can
     * arrive with it, works with an AFND.
     */
    realAdjacent(charSet, state) {
        let visited = []

        // console.log(charSet)

        // We have to get the list of reachable states, using the travel conditions
        for (const tChar in charSet) {
            if (Object.hasOwnProperty.call(charSet, tChar)) {
                let transitions = this.selectTrans(state)
                console.log(transitions)
                // console.log(tChar, charSet[tChar])
            }
        }

        return visited
    }

    selectTrans(state) {
        return this.automata
            .getTransitions()
            .filter(transition => transition.getStart() === state.getData());
    }


    adjacentStates(state, tChar, hasTChar, origin = state) {
        let visited = []

        console.log(origin.getData())
        // origin = state.getData()
        console.log('state:', state.toString(), '| hasTChar',
            hasTChar, '| visited:', visited, '| adjacent:', this.adjacent)
        let transitions = this.selectTrans(state)
        console.log('transTo:', transitions)
        // Exit condition I
        if (transitions.length === 0) {
            if (!this.adjacent.includes(state.getData())) {
                this.adjacent.push(state.getData())
            }
            console.log('ev:fstate')
            return
        }
        // Exit condition A
        if (visited.includes(state.getData())) {
            console.log('ev:rstate')
            return
        }
        transitions.forEach(tran => {
            // Recursive call A
            if (tran.getChars().includes('_')) {
                console.log('ev:lambda')
                //  If is lambda, then must travel to next state and re-evaluate.
                visited.push(state.getData())
                let nextState = this.automata.getState(tran.getEnd())
                // console.log('rc1:', nextState)
                this.adjacentStates(nextState, tChar, hasTChar)
            } else if (tran.getChars().includes(tChar)) {
                // Recursive call B
                if (hasTChar) {
                    console.log('ev:char, true')
                    let nextState = this.automata.getState(tran.getEnd())
                    // console.log('rc2:', nextState)
                    this.adjacentStates(nextState, tChar, false)
                } else {
                    // Exit condition B
                    console.log('ev:char, false')
                    if (!this.adjacent.includes(state.getData())) {
                        this.adjacent.push(state.getData())
                    }
                    return
                }
            } else {
                console.log('ev:¬char')
                if (!this.adjacent.includes(state.getData())) {
                    this.adjacent.push(state.getData())
                }
                return
            }
        })
        return
    }


    automataFormat(dict) {
        // let auto = new Automata()
        // Process
        return auto
    }

    setAutomata(automata) {
        this.automata = automata
    }
    getAutomata() {
        return this.automata
    }

    setActualState(actualState) {
        this.actualState = actualState
    }
    getActualState() {
        return this.actualState
    }

    setSetStates(setStates) {
        this.setStates = setStates
    }
    getSetStates() {
        return this.setStates
    }

    createDictionary(characters, list = []) {
        return characters.reduce((dictionary, char) => {
            dictionary[char] = list;
            return dictionary;
        }, {});
    }
}