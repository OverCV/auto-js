export default class Transition {
    constructor(start, end, chars) {
        this.start = start
        this.end = end
        this.chars = chars
    }

    setStart(start) {
        this.start = start
    }
    getStart() {
        return this.start
    }

    setEnd(end) {
        this.end = end
    }
    getEnd() {
        return this.end
    }

    newChars(data) {
        this.chars.push(data)
    }
    setChars(data) {
        this.chars = data
    }
    getChars() {
        return this.chars
    }

    toString() {
        return `(${this.start} → ${this.end} ⟨${this.chars} | ${this.pass}⟩)`
    }
}