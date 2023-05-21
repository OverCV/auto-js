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
        let states = this.automata.getStates()

        // Check if the automata can be Normalized
        // this.isLooped()

        // Get all the real transitions for every transition
        const adjacent = this.realAdjacent(states)

        // Use the table to create the new automata
        // let newAutomata = this.formatAutomata(adjacent)
        let rowStates = [this.automata.getState('C'), this.automata.getState('H'), this.automata.getState('F')]
        let mSets = this.mergeSubsets(rowStates)
        console.log(mSets)

        // Auto refactoring
        // let auto = this.automataFormat()
        // Auto assignment
        // return auto
    }

    formatAutomata(adjacentTable) {


        let initial = this.automata.getInitialState()

        let visited = []
        let evaluated = adjacentTable[initial.getData()]

        let repeated = false

        while (!repeated) {
            for (const tchar of charSet) {
                let adjacent = initial.getAdjacent()

                if (adjacent[tchar]) {
                    let state = adjacent[tchar]
                    if (visited.includes(state)) {
                        repeated = true
                    }
                    visited.push(state)
                }
            }
        }
        this.automata.getStates().forEach(state => {

        })

        return new Automata()
    }

    /**
     * Function that given the adjacent list of a states, merge the subsets of it's adjacent elements
     * @param {states} states is a list of given states
     * @returns a new State and a transition, which can be used later on.
     */
    mergeSubsets(states) {
        let fullCharSet = {}

        states.forEach(state => {
            let charSet = state.getAdjacent()

            for (let tChar in charSet) {
                let unionSet = new Set([
                    ...(fullCharSet[tChar] || []),
                    ...charSet[tChar]
                ])
                fullCharSet[tChar] = Array.from(unionSet)
            }
        })

        return fullCharSet
    }

    realAdjacent(states) {
        let adjacentTable = []
        let language = this.automata.getLanguage()

        // For each new state
        states.forEach(state => {
            let tuples = this.stateTuples(state, language)
            adjacentTable.push(tuples)
        })

        return adjacentTable
    }

    /**
     * Function that for all the states, given a transition character, shows where you can
     * arrive with it, works with an AFND.
     */
    stateTuples(state, language) {
        let tCharSet = {}
        for (let symbol of language) {
            // List is being reset to don't overlap results for the columns, adjacent it's global.
            this.adjacent = []
            this.adjacentByChar(state, symbol, true)

            tCharSet[symbol] = this.adjacent
            // console.log('char:', sym, '| adj:', this.adjacent)
        }
        let row = {}
        row[state.getData()] = tCharSet
        this.automata.addAdjacent(state.getData(), tCharSet)
        return row
    }

    selectTrans(state) {
        return this.automata
            .getTransitions()
            .filter(transition => transition.getStart() === state.getData())
    }


    adjacentByChar(state, tChar, hasTChar) {
        let visited = []

        // console.log('state:', state.toString(), '| hasTChar', hasTChar, '| visited:', visited, '| adjacent:', this.adjacent)
        let transitions = this.selectTrans(state)
        // console.log('transTo:', transitions)
        // Exit condition I
        if (transitions.length === 0) {
            if (!this.adjacent.includes(state.getData())) {
                this.adjacent.push(state.getData())
            }
            // console.log('ev:fstate')
            return
        }
        // Exit condition A
        if (visited.includes(state.getData())) {
            // console.log('ev:rstate')
            return
        }
        transitions.forEach(tran => {
            // Recursive call A
            if (tran.getChars().includes('_')) {
                // console.log('ev:lambda')
                //  If is lambda, then must travel to next state and re-evaluate.
                visited.push(state.getData())
                let nextState = this.automata.getState(tran.getEnd())
                // console.log('rc1:', nextState)
                this.adjacentByChar(nextState, tChar, hasTChar)
            } else if (tran.getChars().includes(tChar)) {
                // Recursive call B
                if (hasTChar) {
                    // console.log('ev:char, true')
                    let nextState = this.automata.getState(tran.getEnd())
                    // console.log('rc2:', nextState)
                    this.adjacentByChar(nextState, tChar, false)
                } else {
                    // Exit condition B
                    // console.log('ev:char, false')
                    if (!this.adjacent.includes(state.getData())) {
                        this.adjacent.push(state.getData())
                    }
                    return
                }
            } else {
                // console.log('ev:¬char')
                if (!this.adjacent.includes(state.getData())) {
                    this.adjacent.push(state.getData())
                }
                return
            }
        })
        return
    }

    /**
     * A Loop is formed whenever a chain of lambdas is formed, with that logic, if you travel in lambda transitions and you
     * get back to origin, you're in a loop.
     * @param {*} state 
     * @param {*} visited 
     */
    isLooped(transition = null, visited = []) {

        console.log(['a', 'b'] == ['a', 'b'])

        realTrans.forEach(tran => {
            // visited.push(tran.getStart().getData())
            if (tran.getChars().includes('_')) {
                console.log('ev:lambda')
                if (visited.contains(tran.getEnd().getData())) {
                    return true
                }
                //  If is lambda, then must travel to next state and re-evaluate.
                visited.push(tran.getEnd().getData())
                let nextState = this.automata.getState(tran.getEnd())
                // console.log('rc1:', nextState)
                this.adjacentByChar(nextState, tChar, hasTChar)
            }
            // let states = this.automata.getStates()
        })


        // states.forEach(state => {
        //     let realTrans = this.selectTrans(state)

        // })
    }

    automataFormat(dict) {
        // let auto = new Automata()
        // Process
        // return auto
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

    createDictionary(list) {
        let dictionary = {}

        list.forEach(item => {
            if (!(item in dictionary)) {
                dictionary[item] = []
            }
        })

        return dictionary
    }
}