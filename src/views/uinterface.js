// import Template from './template.js'

export default class UInterface {
    constructor() {
        this.go = window.go
        this.$ = this.go.GraphObject.make  // Accessor to the constructor object of GoJS

        this.automats = []
        this.automata = null
        this.actualState = null

        this.diagram = null
        this.sel = 0

        this.nodes = null
        this.links = null
        // this.template = new Template()
        this.myDiv = document.getElementById('myDiagramDiv')
    }

    /**
     * Run initializes the view of the automats we're working with.
     * @param {automats} automats is the global list that has the Automats objects. Also, when is given * should be global in the constructor, so interface can create and edit each one as needed.
     */
    run(automats) {
        console.log('Interface activated')
        this.automats = automats
        this.createDiagram()

        this.createAutomats()
    }

    createDiagram() {
        if (this.diagram) {
            this.myDiv.innerHTML = ''
            this.diagram.div = null
            this.diagram = null
        }

        /* TODO: Change whenever is needed to see an dynamic or static view */
        if (this.sel === 0) {
            this.diagram =
                this.$(go.Diagram, this.myDiv,
                    {
                        initialContentAlignment: go.Spot.Center,
                        layout: this.$(go.LayeredDigraphLayout),
                        "layout.layerSpacing": 30,
                        "layout.columnSpacing": 30,
                    }
                )
        } else {
            this.diagram =
                this.diagram =
                this.$(go.Diagram, this.myDiv,
                    { initialContentAlignment: go.Spot.Center }
                )
        }
    }

    createAutomats() {
        this.nodes = []
        this.links = []
        this.automats.forEach(automata => {
            this.createNodes(automata.getStates())
            this.createLinks(automata.getTransitions())
        })
        this.diagram.model = new go.GraphLinksModel(this.nodes, this.links)
    }

    createNodes(states) {
        states.forEach(state => {
            let colors = ['#48BBF2', '#1D8FE1']
            if (state.isStart) { colors = ['#00D1B2', '#2DD4BF'] }
            if (state.isEnd) { colors = ['#FF5E5B', '#FFC145'] }
            if (state.isStart && state.isEnd) { colors = ['#2DD4BF', '#FF5E5B'] }

            let forma = state.data == this.actualState.data ? 'Diamond' : 'Circle'

            this.nodes.push({
                key: state.data, size: 50,
                gradient: colors, shape: forma
            })
        })
        this.diagram.nodeTemplate = this.getNodeTemplate()
    }

    createLinks(transitions) {
        transitions.forEach(transition => {
            let characters = ''
            transition.chars.forEach(char => {
                characters += char + ', '
            })
            this.links.push({
                from: transition.start, to: transition.end,
                color: '#CBD5E0', text: characters
            })
        })
        this.diagram.linkTemplate = this.getLinkTemplate()
    }

    getNodeTemplate() {
        return this.$(go.Node, 'Auto',
            this.$(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 2 },
                new go.Binding('figure', 'shape'),
                new go.Binding('fill', 'gradient', (gradient) => {
                    return this.$(go.Brush, 'Linear', { 0: gradient[0], 1: gradient[1], start: go.Spot.Left, end: go.Spot.Right })
                })),
            this.$(go.TextBlock, { margin: 10, editable: true },
                new go.Binding('text', 'key'))
        )
    }

    getGradientBrush(node) {
        // Obtener los valores de gradientStart y gradientEnd del nodo
        let gStart = node.gradientStart
        let gEnd = node.gradientEnd
        // Crear un gradiente de color con los valores del nodo
        return new go.Brush('Linear', { 0: gStart, 1: gEnd })
    }

    getLinkTemplate() {
        return this.$(go.Link,
            { curve: go.Link.Bezier },
            this.$(go.Shape, { strokeWidth: 2, stroke: '#CBD5E0' },
                new go.Binding('stroke', 'color')),
            this.$(go.Shape, { toArrow: 'Standard', stroke: '#CBD5E0' },
                new go.Binding('fill', 'color')),
            this.$(go.TextBlock, { segmentOffset: new go.Point(0, -10), segmentOrientation: go.Link.OrientAlong, margin: 10 },
                new go.Binding('text', 'text'))
        );

    }

    setActualState(state) {
        this.actualState = state
    }

}