import Automata from '../models/automata.js'
import Function from '../models/function.js'
import UInterface from '../views/uinterface.js'

export default class Control {
    constructor() {
        this.automats = []
        this.automata = null
        this.uInterface = new UInterface()
        this.automatsLoaded = 0 /* Variable to load the interface until all Json's are in */
        this.selector = []
        this.func = null

        this.jsonBtn = document.getElementById('fileInput')
        this.unionBtn = document.getElementById('unionBtn')
        this.nextBtn = document.getElementById('nextBtn')
        this.intersectionBtn = document.getElementById('intersectionBtn')
        this.inverseBtn = document.getElementById('inverseBtn')
        this.complementBtn = document.getElementById('complementBtn')
        this.clearBtn = document.getElementById('clearBtn')

        this.automataSel = document.getElementById('automataSel')
        this.inputStr = document.getElementById('inputStr');
        this.linkBtn = document.getElementById('reLink');

        this.jsonBtn.addEventListener('change', this.clickJson.bind(this))
        this.unionBtn.addEventListener('click', this.union.bind(this))
        this.nextBtn.addEventListener('click', this.nextState.bind(this))
        this.intersectionBtn.addEventListener('click', this.intersection.bind(this))
        this.inverseBtn.addEventListener('click', this.inverse.bind(this))
        this.complementBtn.addEventListener('click', this.complement.bind(this))
        this.clearBtn.addEventListener('click', this.clear.bind(this))

        this.automataSel.addEventListener('click', this.selectAutomata.bind(this))
        this.inputStr.addEventListener('keyup', this.inputLoad.bind(this))
        this.linkBtn.addEventListener('click', this.reLink.bind(this))
    }

    loadInterface() {
        this.inputStr.removeAttribute('disabled')

        if (this.automatsLoaded === this.jsonBtn.files.length) {
            this.setTransitionFunc()

            this.uInterface.run(this.automats)
        }
        // console.log(actualState)
        // this.uInterface.setActualState(this.automata)
    }

    union() {
        console.log('The union function was clicked.')
        console.log('AUTOS', this.automats)
    }

    union() {
        console.log('The union function was clicked.')
    }

    intersection() {
        console.log('The intersection function was clicked.')
    }

    inverse() {
        console.log('The inverse function was clicked.')
    }

    complement() {
        console.log('The complement function was clicked.')
    }

    clear() {
        console.log('The clear function was clicked.')
    }

    loadJson() { }


    clickJson(e) {
        this.automataSel.options[0].remove()

        let files = Array.from(e.target.files)
        files.forEach(file => {
            let reader = new FileReader()
            reader.onload = ((file) => {
                return (e) => {
                    let data = JSON.parse(e.target.result)
                    let automata = new Automata()

                    automata.setName(data.name)
                    automata.setAlphabet(data.alphabet)
                    automata.setStates(data.states)
                    automata.setTransitions(data.transitions)
                    files.length > 1 ?
                        this.showToast('New Automats from JSON!') :
                        this.showToast('New Automata from JSON!')

                    console.log('Json loaded as', automata)
                    this.automats.push(automata)
                    this.fillAutomata(data.name) /* To fill the selectable */
                    this.automatsLoaded++

                    this.automata = this.automats[0]
                    this.loadInterface()
                }
            })(file)
            reader.readAsText(file)
        })
    }

    fillAutomata(name) {
        let option = document.createElement(`option`)
        option.value = `${name}`
        option.textContent = `${name}`
        this.automataSel.appendChild(option)
    }

    selectAutomata() {
        let option = this.automataSel.value
        this.automats.forEach(auto => {
            if (option === auto.getName()) {
                this.automata = auto
            }
        })
    }


    setTransitionFunc() {
        this.func = new Function(this.automata)
        // After the user put the Json, the interface is loaded, this requires to know which actualState is, so is needed to arrive the transition function before the real Interface executes.
        this.uInterface.setActualState(this.func.getInitialState())
    }


    inputLoad(e) {
        if (e.key === 'Enter') {
            let str = this.inputStr.value
            console.log(this.automata.getAlphabet().test(str))
            if (this.automata.getAlphabet().test(str)) {

                this.inputStr.setAttribute('disabled', '')
                this.nextBtn.removeAttribute('disabled')

                this.func.setString(str)
                this.showToast('Input loaded!')
            } else {
                this.showToast(`Input not valid! Σ = ${this.automata.getAlphabet()}.`)
            }
        }
    }

    nextState() {
        if (this.func.getNextState()) {
            this.showToast(`All string has been red`)
            return
        }
        this.showToast(`You are on state ${this.func.getActualState().data}`)
        this.uInterface.setActualState(this.func.getActualState())
        this.uInterface.createAutomats()
    }

    reLink() {
        this.uInterface.sel = 1 - this.uInterface.sel
        this.uInterface.run(this.automats)
    }

    showToast(message) {
        const toastContainer = document.createElement('div')
        toastContainer.classList.add('toast-container')
        document.body.appendChild(toastContainer)

        const toast = document.createElement('div')
        toast.classList.add('toast')
        toast.textContent = message
        toastContainer.appendChild(toast)

        toast.style.opacity = 0
        toast.style.transform = 'translateX(100%)'

        setTimeout(() => {
            toast.style.opacity = 1
            toast.style.transform = 'translateX(0)'
        }, 10)

        setTimeout(() => {
            toast.style.opacity = 0
            toast.style.transform = 'translateX(-100%)'
            setTimeout(() => {
                toastContainer.remove()
            }, 500)
        }, 3000)
    }
}







