export default class State {
    constructor(data) {
        this.data = data
        this.isStart = false
        this.isEnd = false
        this.adjacent = []
        // this.alphabet = ["A","B","C"]
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
    setIsStart(start) {
        this.isStart = start
    }
    getIsStart() {
        return this.isStart
    }
    setIsEnd(end) {
        this.isEnd = end
    }
    getIsEnd() {
        return this.isEnd
    }

    toString() {
        let brackets = this.adjacent.length ? `[ ${this.adjacent} ]` : '[ ]'
        let data = this.data + ' | ' + brackets
        return this.isEnd ? `((${data}))` : `(${data})`
    }
}