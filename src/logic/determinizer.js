import Automata from "../models/automata"
import State from "../models/state"

export default class Determinizer {

    constructor(automata) {
        this.automata = automata
        this.actualState = null
        this.setStates = []
    }

    /**
     * Algorithm that given  an automata, return it's normalized version,
     * without lambda states or multiple equal transition characters, into an AFD from AFND.
     */
    determinize() {
        auto = new Automata()

        let set = realAdjacent()
        console.log(set)
    }

    realAdjacent() {
        visited = []

        console.log(`object`)
    }
}