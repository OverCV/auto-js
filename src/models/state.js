export default class State {
    constructor(data) {
        this.data = data
        this.isInitial = false
        this.isFinal = false
        this.adjacent = {}
    }

    setData(data) {
        this.data = data
    }
    getData() {
        return this.data
    }

    getAdjacent() {
        return this.adjacent
    }
    setAdjacent(adjacent) {
        this.adjacent = adjacent
    }
    addAdjacent(state) {
        this.adjacent.push(state)
    }

    setIsInitial(isInitial) {
        this.isInitial = isInitial
    }
    getIsInitial() {
        return this.isInitial
    }
    setIsFinal(isFinal) {
        this.isFinal = isFinal
    }
    getIsFinal() {
        return this.isFinal
    }

    toString() {
        let brackets = this.adjacent.length ? `[ ${this.adjacent} ]` : '[ ]'
        let data = this.data + ' | ' + brackets
        return this.isFinal ? `((${data}))` : `(${data})`
    }
}