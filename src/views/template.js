export default class Template {
    constructor() { }

    getDiagram() { }

    getNodeTemplate() {
        return myDiagram.nodeTemplate =
            $(go.Node, 'Auto',
                $(go.Shape, 'Circle', // Cambiar la forma del nodo a un círculo
                    {
                        fill: $(go.Brush, 'Linear', {  // Crear un gradiente de color
                            0: '#FC8181',  // Color de inicio
                            1: '#F6AD55'   // Color de fin
                        }),
                        strokeWidth: 2,  // Aumentar el grosor del borde del nodo
                        stroke: '#FEB2B2'  // Cambiar el color del borde
                    }),
                $(go.TextBlock, { margin: 8 },
                    new go.Binding('text', 'key'))
            )
    }

    getLinkTemplate() {
        return myDiagram.linkTemplate =
            $(go.Link,
                $(go.Shape, { strokeWidth: 2, stroke: '#CBD5E0' }), // Cambiar el grosor y color de la línea de la relación
                $(go.Shape, { toArrow: 'Standard', stroke: '#CBD5E0' }), // Cambiar el color y agregar la flecha de la relación
                $(go.TextBlock,
                    new go.Binding('text', 'key'))
            )
    }

}
// Obtener el botón de carga de archivos
    // Crear el diagrama
    // let $ = go.GraphObject.make  // Acceder al constructor de objetos GoJS
    // let myDiagram =
    //     $(go.Diagram, 'myDiagramDiv',
    //         {
        //             // Configurar el diagrama
//             'undoManager.isEnabled': true // Permite deshacer y rehacer cambios
//         })

// // Crear los nodos
// myDiagram.nodeTemplate =
//     $(go.Node, 'Auto',
//         $(go.Shape, 'Circle', // Cambiar la forma del nodo a un círculo
//             {
//                 fill: $(go.Brush, 'Linear', {  // Crear un gradiente de color
//                     0: '#FC8181',  // Color de inicio
//                     1: '#F6AD55'   // Color de fin
//                 }),
//                 strokeWidth: 2,  // Aumentar el grosor del borde del nodo
//                 stroke: '#FEB2B2'  // Cambiar el color del borde
//             }),
//         $(go.TextBlock, { margin: 8 },
//             new go.Binding('text', 'key'))
//     )

// // Crear las relaciones
// myDiagram.linkTemplate =
//     $(go.Link,
//         $(go.Shape, { strokeWidth: 2, stroke: '#CBD5E0' }), // Cambiar el grosor y color de la línea de la relación
//         $(go.Shape, { toArrow: 'Standard', stroke: '#CBD5E0' }), // Cambiar el color y agregar la flecha de la relación
//         $(go.TextBlock,
//             new go.Binding('text', 'key'))
//     )

// let model = $(go.GraphLinksModel)

// model.nodeDataArray = [
//     { key: 'Nodo 1' },
//     { key: 'Nodo 2' }
// ]

// model.linkDataArray = [
//     { from: 'Nodo 1', to: 'Nodo 2', key: 'Relación' }
// ]

// myDiagram.model = model
