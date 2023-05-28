import Automata from "../models/automata.js"
import State from "../models/state.js"
import Transition from "../models/transition.js"

export default class Determiner {

    constructor() {
        this.automata = null
        // this.actualState = null
        this.automataTable = null
        // this.setStates = []
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
        this.setRealAdjacent(states)

        // Use the table to create the new automata
        // let newAutomata = this.formatAutomata(adjacent)
        // let rowStates = [this.automata.getState('C'), this.automata.getState('H'), this.automata.getState('F')]

        // let initialState = this.automata.getInitialState()
        // let table = this.setAdjacentTable([initialState])
        this.automataTable = this.tableCreation()
        // console.log(table)

        // Auto refactoring
        return this.formatAutomata();
    }

    // --------------------------------------------------------------------------------------------------------

    setRealAdjacent(states) {
        // let adjacentTable = []
        let language = this.automata.getLanguage()

        // For each new state
        states.forEach(state => {
            this.stateTuples(state, language)
            // adjacentTable.push(tuples)
        })

        // return adjacentTable
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
        // let row = {}
        // row[state.getData()] = tCharSet
        console.log(tCharSet)
        this.automata.addAdjacent(state.getData(), tCharSet)
        // return row
    }

    adjacentByChar(state, tChar, hasTChar) {
        // let visited = []
        let lamWay = false
        // console.log('state:', state.toString(), '| hasTChar', hasTChar, '| visited:', visited, '| adjacent:', this.adjacent)
        let transitions = this.selectTrans(state)
        // console.log('transTo:', transitions)
        // Exit condition I

        // If the actual state has no transitions, must be added to the list
        if (transitions.length === 0) {
            if (!this.adjacent.includes(state.getData())) {
                this.adjacent.push(state.getData())
            }
            // console.log('ev:fstate')
            return
        }

        // Exit condition A
        // if (visited.includes(state.getData())) {
        //     console.log('ev:rstate')
        //     return
        // }
        transitions.forEach(tran => {
            if (tran.getChars().includes('_')) {
                lamWay = true
            }
        })
        let hadOneTChar = false
        transitions.forEach(tran => {
            if (tran.getChars().includes(tChar)) {
                hadOneTChar = true
            }
        })
        transitions.forEach(tran => {
            // Recursive call A
            if (tran.getChars().includes('_')) {
                // console.log('ev:lambda')
                //  If is lambda, then must travel to next state and re-evaluate.
                // visited.push(state.getData())
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
                    // console.log('rc3:', visited, state.getData())
                    if (!this.adjacent.includes(state.getData())) { /* If don't exist, push it */
                        this.adjacent.push(state.getData())
                    }
                    // if (visited.includes(state.getData())) {
                    //     return
                    // }
                    return
                }
            } else {
                // if (tran.getChars().length != 0) {
                //     console.log('ev:¬char')
                // }
                if (lamWay) {
                    return
                }

                if (!this.adjacent.includes(state.getData())) { /* If don't exist, push it */
                    this.adjacent.push(state.getData())
                }
                return
            }
        })
        return
    }

    /* DONE */
    selectTrans(state) {
        return this.automata
            .getTransitions()
            .filter(transition => transition.getStart() === state.getData())
    }

    // --------------------------------------------------------------------------------------------------------

    tableCreation() {
        let autoTable = []
        let newRows = []

        // Set the initial state, the ankle
        let initialState = [this.automata.getInitialState()]
        let row = this.newRowTable(initialState)

        // Initialize the first rows
        autoTable.push(row)
        newRows = this.colToRow(autoTable)

        // Table is initialized into the initial state as ankle for the next columns
        // and the newRows list has information, that would be reassigned after every
        // row of the full table has been reviewed (process of rowCreation).
        while (newRows.length != 0) {
            // Generate the new rows from the table actual states.
            newRows = this.colToRow(autoTable)

            // Previous rows are unique, should be added for the next iteration.
            newRows.forEach(row => {
                autoTable.push(row)
            })
        }
        // console.table(autoTable)
        // console.log(autoTable)
        return this.uniqueElements(autoTable)
    }

    /**
     * Given the columns, this function generates and push the new row into the table.
     */
    newRowTable(states) {
        let statesData = states.map(state => {
            return state.getData()
        })
        let row = {}
        row['origin'] = statesData
        row['destiny'] = this.mergeSubsets(states)
        return row
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

    /**
     * If the table has one column that isn't evaluated, a new row must be created and
     * returned into an array of values.
     * Format: { origin: [states], destiny: { char: [states], ..., char: [states] } }.
     */
    colToRow(table) {
        let newRows = []

        // Select the list of destiny states
        table.forEach(outRow => {
            for (let tChar in outRow['destiny']) {
                let exists = false
                let destinies = outRow['destiny'][tChar]

                table.forEach(inRow => {
                    let origins = inRow['origin']

                    // Compare the list with the origin states
                    // console.log('origin', origins, '| destiny', destinies)

                    let existingState = this.sameElements(origins, destinies)
                    if (existingState) {
                        exists = true
                        // console.log('exist:', destinies)
                    }
                })
                // If one list of destiny states isn't on the origin, add as newRow.
                if (!exists) {
                    destinies = destinies.map(stateData => {
                        return this.automata.getState(stateData)
                    })
                    // console.log('destiny', destinies)
                    newRows.push(this.newRowTable(destinies))
                }
            }
        })

        // console.log('newRows', newRows)
        return newRows
    }

    sameElements(list1, list2) {
        if (list1.length !== list2.length) {
            return false
        }
        const set1 = new Set(list1)
        const set2 = new Set(list2)
        if (set1.size !== set2.size) {
            return false
        }
        for (const element of set1) {
            if (!set2.has(element)) {
                return false
            }
        }
        return true
    }

    // Function than given a list, it give it back without repetitions.
    uniqueElements(list) {
        return Array.from(
            new Set(list.map(JSON.stringify))
        ).map(JSON.parse)
    }

    // --------------------------------------------------------------------------------------------------------

    formatAutomata() {
        let newAutomata = new Automata()
        newAutomata.setName('AFD')

        let aTable = this.automataTable
        let register = {}

        // States and registers creation
        for (let i = 0; i < aTable.length; i++) {
            let index = `Q${i}`
            register[index] = aTable[i]
            let stateData = aTable[i]['origin']
            // console.log('stateData', stateData)
            let stateAtt = this.getStatesAtt(stateData)

            newAutomata.newState(index, stateAtt['isInitial'], stateAtt['isFinal'])
        }

        console.log(register)
        // Transitions creation
        for (let originData in register) {

            // let destinyData = this.registerByStates(register[originData]['origin'], register)

            for (let tChar in register[originData]['destiny']) {
                let destiny = register[originData]['destiny'][tChar]
                // console.log('destiny', destiny)
                let destinyData = this.registerByStates(destiny, register)
                // console.log('destiny', destinyData)

                // let newTransition = new Transition(originData,)
                newAutomata.newTransition(originData, destinyData, [tChar])
                //
                console.log(
                    // 'originData', originData, '| destiny', destinyData, '| tChar', tChar
                )
            }
        }
        // console.log(newAutomata)
        return newAutomata
    }

    getStatesAtt(statesData) {
        let stateAtt = {}
        stateAtt['isInitial'] = true
        stateAtt['isFinal'] = false
        let states = statesData.map(state => {
            return this.automata.getState(state)
        })
        states.forEach(state => {
            if (!state.getIsInitial()) {
                stateAtt['isInitial'] = false
            }
            if (state.getIsFinal()) {
                stateAtt['isFinal'] = true
            }
        })
        return stateAtt
    }

    registerByStates(states, register) {
        let dataState = null
        for (let row in register) {
            let element = register[row]
            // console.log('element:', element, '| states:', states)
            if (this.sameElements(element['origin'], states)) {
                // console.log('data:', states, '| row:', row)
                dataState = row
            }
        }
        return dataState
    }

    // --------------------------------------------------------------------------------------------------------

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
}