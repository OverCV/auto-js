export default class Function {
    constructor(automata) {
        this.automata = automata
        this.string = ''
        this.index = 0
        this.actualState = this.getInitialState()
    }

    setString(string) {
        this.string = string
    }

    getInitialState() {
        let states = this.automata.states
        for (let i = 0; i < states.length; i++) {
            if (states[i].isStart) {
                return states[i]
            }
        }
    }

    activate(string) {
        this.actualState = this.automata.getStates()[0]
        let acceptable = false
        for (let i = 0; i < string.length; i++) {
            if (this.actualState.isEnd())
                acceptable = this.getNextState()
        }
    }

    getNextState() {
        if (this.index === this.string.length) {
            console.log('All string has been red.')
            return true
        }
        let flag = true

        let transitions = this.automata.getTransitions()
        transitions.forEach(transition => {
            if ((this.actualState.data === transition.start) && flag) {
                let chars = transition.chars
                chars.forEach(char => {
                    if (char === this.string[this.index] && flag) {
                        let alphabet = this.automata.getAlphabet()
                        if (alphabet.test(this.string[this.index])) {
                            this.actualState = this.automata.getState(transition.end)
                            console.log('Valid char, state to be:', this.actualState)
                            this.index++
                            flag = false
                        }
                    }
                })
            }
        })
    }

    setActualState(actualState) {
        this.actualState = actualState
    }
    getActualState() {
        return this.actualState
    }
}