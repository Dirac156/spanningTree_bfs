function bfs(nodes, m, edges, s) {
    let graph = {};
    for (let i = 1; i <= nodes; i++) {
        graph[i] = [];
    }
    for (let i = 0; i < m; i++) {
        graph[edges[i][0]].push(edges[i][1]);
        graph[edges[i][1]].push(edges[i][0]);
    }
    let visited = [s];
    let queue = [s];
    let level = [null];
    for (let i = 0; i < nodes; i++) {
        level[i] = null;
    }
    level[s-1] = 0;
    while (queue.length) {
        let devertex = queue.shift();
        for (let i = 0; i < graph[devertex].length; i++) {
            let neighbours = graph[devertex][i];
            if (visited.indexOf(neighbours) == -1) {
                level[neighbours-1] = level[devertex-1] + 6;
                visited.push(neighbours);
                queue.push(neighbours);
            }
        }
    }
    let res = [];
    for (let i = 0; i < level.length; i++) {
        if (level[i] == null) {
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