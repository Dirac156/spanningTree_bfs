function Graph(nbrVertices) {
    return {
        nbrVertices,
        graph: [],
        addEdge: function(source, destination, weight) {
            this.graph.push([source, destination, weight]);
        },
    
        find: function(parent, idx) {
            if (parent[idx] != idx) {
                parent[idx] = this.find(parent, parent[idx]);
            }
            return parent[idx];
        },
    
        union: function(parent, rank, x, y) {
            if (rank[x] < rank[y]) {
                parent[x] = y;
            } else if (rank[x] > rank[y]) {
                parent[y] = x;
            } else {
                parent[y] = x;
                rank[x] += 1;
            }
        }
    }
}

function KruskalMST (graph) {
    const result = [];
    let i = 0;
    let e = 0;
    
    // sort the graph by weight
    graph.graph.sort((a, b) => a[2] - b[2]);

    let parent = [],
        rank = [];
    for (let node = 0; node < graph.nbrVertices; node++) {
        parent.push(node);
        rank.push(0);
    }
    while (e < graph.nbrVertices - 1) {
        const source = graph.graph[i][0],
            destination = graph.graph[i][1],
            weight = graph.graph[i][2];
        i = i + 1;
        let x = graph.find(parent, source);
        let y = graph.find(parent, destination);
        if (x !== y) {
            e = e + 1;
            result.push([source, destination, weight]);
            graph.union(parent, rank, x, y);
        }
    }

    console.log("K algorithm")
    console.log("Minimum Spanning Tree");

    let minimumCost = result.reduce((previousValue, currentValue) => {
        let source = currentValue[0],
        destination = currentValue[1],
        weight = currentValue[2];
        console.log(`$source: ${graphnodes[source]} -- destination:${graphnodes[destination]} == weight:${weight}`);
        return [0, 0, previousValue[2] + weight];
    }, [0, 0, 0]);

    console.log("Cost Minimum Spanning Tree", minimumCost[2]);

    return result
}

function PrismMST (graph) {
    const result = [],
        visited = [],
        parent = [];

    for (let node = 0; node < graph.nbrVertices; node++) {
        parent.push(node);
    }

    const random_idx = Math.floor(Math.random() * 12); // select a numnber between 0 - 11
    let e = parent[4];

    console.log(random_idx)

    for (let i = 0; i < parent.length - 1; i++) {
        // randomly choose the first element
        visited.push(e);
        const proposedRoutes = []
        for (let j = 0; j < graph.graph.length; j++){
            const source = graph.graph[j][0],
                destination = graph.graph[j][1];

            if (source === e) {
                // prevent the tree to become a circle
                if ( visited.includes(destination)) continue;
                else proposedRoutes.push(graph.graph[j])
            } else if (destination === e) {
                if ( visited.includes(source)) continue;
                else proposedRoutes.push(graph.graph[j])
            }
        }
        if (proposedRoutes.length > 0) {
            // sort the proposed route list by weight 
            proposedRoutes.sort((a, b) => a[2] - b[2]);
            // look for the path not visited with the minimum
            for (let k = 0; k < proposedRoutes.length; k++) {
                // check solution not included in before
                if (!result.includes(proposedRoutes[k])) {
                    result.push(proposedRoutes[k]);
                    // assign e to the new element to visit
                    if (proposedRoutes[k][0] === e) e = proposedRoutes[k][1];
                    else e = proposedRoutes[k][0]
                    k = proposedRoutes.length;
                }
            }
        }
    }

    console.log("Prism algorithm")
    console.log("Minimum Spanning Tree");

    let minimumCost = result.reduce((previousValue, currentValue) => {
        let source = currentValue[0],
        destination = currentValue[1],
        weight = currentValue[2];
        console.log(`$source: ${graphnodes[source]} -- destination:${graphnodes[destination]} == weight:${weight}`);
        return [0, 0, previousValue[2] + weight];
    }, [0, 0, 0]);

    console.log("Cost Minimum Spanning Tree", minimumCost[2]);

    return result
}



const graph = Graph(12);

const  graphnodes = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l" ];

graph.addEdge(0, 5, 5);
graph.addEdge(0, 11, 14);
graph.addEdge(0, 2, 8);

graph.addEdge(5, 8, 8);
graph.addEdge(5, 10, 16);
graph.addEdge(5, 1, 20);
graph.addEdge(5, 3, 94);

graph.addEdge(10, 9, 5);
graph.addEdge(10, 1, 47);

graph.addEdge(9, 6, 5);
graph.addEdge(9, 7, 16);

graph.addEdge(7, 11, 15);
graph.addEdge(7, 4, 8);

graph.addEdge(4, 11, 15);
graph.addEdge(4, 8, 16);

graph.addEdge(8, 2, 10);

graph.addEdge(2, 6, 12);
graph.addEdge(2, 11, 8);

graph.addEdge(3, 2, 8);
graph.addEdge(3, 6, 22);

graph.addEdge(6, 11, 13);

KruskalMST(graph)
PrismMST(graph);