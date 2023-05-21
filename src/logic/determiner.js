import Automata from "../models/automata.js"
import State from "../models/state.js"
import Transition from "../models/transition.js"

export default class Determiner {

    constructor() {
        this.automata = null
        this.actualState = null
        this.setStates = []
    }

    /**
     * Algorithm that given  an automata, return it's normalized version,
     * without lambda states or multiple equal transition characters, into an AFD from AFND.
     */
    determine() {

        let dict = {}

        // For each new state
        let states = this.automata.getStates()
        states.forEach(state => {
            let set = this.realAdjacent(state)
        });

        // Auto refactoring
        let auto = this.automataFormat()
        // Auto assignment
        return auto
    }

    /**
     * Function that for all the states, given a transition character, shows where you can
     * arrive with it, works with an AFND.
     */
    realAdjacent(char, state) {
        let visited = []

        let transitions = this.automata.getTransitions()
        let stateTrans = []
        transitions.forEach(tran => {
            if (tran.getStart() == state.getData()) {
                stateTrans.push(tran)
            }
        });
        console.log(stateTrans)

        return visited
    }

    visit() {
        if (condition) {

        }
    }

    automataFormat(dict) {
        let auto = new Automata()
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

}