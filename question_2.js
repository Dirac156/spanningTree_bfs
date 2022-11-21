/**
 * find depth of a node starting from a point V
 * @param {*} nodes: number of nodes
 * @param {*} m: number of edges
 * @param {*} edges: edges
 * @param {*} s: starting point
 * @returns 
 */
function bfs(nodes, m, edges, s) {
    // initialize graph
    let graph = {};
    for (let i = 1; i <= nodes; i++) {
        graph[i] = [];
    }
    // create tree
    for (let i = 0; i < m; i++) {
        graph[edges[i][0]].push(edges[i][1]);
        graph[edges[i][1]].push(edges[i][0]);
    }
    // initialize params
    let visited = [s];
    let queue = [s];
    let level = [null];
    for (let i = 0; i < nodes; i++) {
        level[i] = null;
    }
    level[s-1] = 0;
    while (queue.length) {
        // remove s, ...
        let devertex = queue.shift();
        for (let i = 0; i < graph[devertex].length; i++) {
            let neighbours = graph[devertex][i];
            if (visited.indexOf(neighbours) == -1) {
                // get depth of a branch and multiple by 6 (weight)
                level[neighbours-1] = level[devertex-1] + 6;
                // keep track of visited branches
                visited.push(neighbours);
                queue.push(neighbours);
            }
        }
    }
    // get result path of each node
    let res = [];
    for (let i = 0; i < level.length; i++) {
        if (level[i] == null) {
            // when the node does not have a branch
            res.push(-1);
        } else {
            if (level[i] != 0) {
                res.push(level[i]);
            }
        }
    }
    return res;
}

console.log(bfs(5, 3, [[1, 2], [1, 3], [3, 4], [5, 5]], 1));