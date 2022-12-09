const gameBoard = (size = 8) => {
    const board = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board.push([i,j]);
        };
    };

    return {board, size};
};

const legalMoves = (src, board) => {
    const allowed = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    const legal = [];
    for (let move of allowed) {
        const x = src[0] + move[0];
        const y = src[1] + move[1];
        if (x >= 0 && x < board.size && y >= 0 && y < board.size) {
            legal.push([x,y]);
        };
    };
    return legal;
};

const buildGraph = (board) => {
    const graph = {};
    for (let coordinate of board.board) {
        graph[coordinate] = legalMoves(coordinate, board);
    };
    return graph;
};

const knightMoves = (src, dest, board) => {
    const graph = buildGraph(board);
    const visited = new Set([src]);
    const queue =[[src,[],0]];
    const paths = [];
    const returnString = (moves, array) => {
        let paths = "";
        array.forEach(item => {paths += `[${item}]\n`});
        return `You made it in ${moves}! Here's your path:\n${paths}`;
    }

    while (queue.length > 0) {
        const [node,path, dist] = queue.shift();

        if (node.toString() === dest.toString()) {paths.push(path.push(node)); return returnString(dist, path)};

        for (let neighbour of graph[node]) {
            if (!visited.has(neighbour)) {
                visited.add(neighbour);
                queue.push([neighbour,[...path, node], dist + 1]);
            };
        };
    };
};