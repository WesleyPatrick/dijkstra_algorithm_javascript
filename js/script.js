const INF = Number.MAX_SAFE_INTEGER;

const graph = [

    [0,    6,    30.8, 0,    0,    0,    45,   0,    0,    0,    0,    0,    0,    0,    0],  
    [6,    0,    0,    13.2, 26.4, 0,    0,    0,    0,    15,   0,    0,    0,    0,    0],  
    [30.8, 0,    0,    45,   0,    0,    30,   0,    0,    15,   0,    0,    0,    0,    0],  
    [0,    13.2, 0,    0,    30,   0,    0,    40,   0,    0,    0,    0,    0,    0,    0],  
    [0,    26.4, 0,    30,   0,    30,   0,    0,    30,   0,    0,    0,    0,    0,    0],  
    [0,    0,    0,    0,    30,   0,    59.4, 0,    0,    0,    0,    0,    0,    0,    0],  
    [45,   0,    30,   0,    0,    59.4, 0,    0,    0,    0,    0,    0,    0,    0,    0],  
    [0,    0,    0,    40,   0,    0,    0,    0,    10,   16,   0,    85.5, 0,    0,    0],  
    [0,    0,    0,    0,    30,   0,    0,    10,   0,    3,    22,   0,    60,   17.6, 0],  
    [0,    15,   15,   0,    0,    0,    0,    16,   3,    0,    9,    10,   0,    0,    0],  
    [0,    0,    0,    0,    0,    0,    0,    0,    22,   9,    0,    0,    0,    0,    0],  
    [0,    0,    0,    0,    0,    0,    0,    85.5, 0,    10,   0,    0,    0,    0,    0],  
    [0,    0,    0,    0,    0,    0,    0,    0,    60,   0,    0,    0,    0,    2,    0],  
    [0,    0,    0,    0,    0,    0,    0,    0,    17.6, 0,    0,    0,    2,    0,    1],  
    [0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    1,    0]   
];

function minDistance(distance, visited) {
    let minVex = INF;
    let minIndexVex = -1;

    for (let index = 0; index < distance.length; index++) {
        if (distance[index] <= minVex && !visited[index]) {
            minVex = distance[index];
            minIndexVex = index;
        }
    }
    return minIndexVex;
}

function dijkstra(graph, source) {
    const distance = [];
    const visited = [];
    const passedby = []; 

    const { length } = graph;

    for (let i = 0; i < length; i++) {
        distance.push(INF);
        visited.push(false);
        passedby.push(null); 
    }

    distance[source] = 0;

    for (let Vex = 0; Vex < length - 1; Vex++) {
        const currentVex = minDistance(distance, visited);
        visited[currentVex] = true;

        for (let neighbor = 0; neighbor < length; neighbor++) {
            if (!visited[neighbor] 
                && graph[currentVex][neighbor] !== 0 
                && distance[currentVex] !== INF 
                && distance[currentVex] + graph[currentVex][neighbor] < distance[neighbor]) {
                distance[neighbor] = distance[currentVex] + graph[currentVex][neighbor];
                passedby[neighbor] = currentVex; 
            }
        }
    }
    return { distance, passedby }; 
}

function reconstructPath(predecessors, target) {
    let path = [];
    for (let at = target; at !== null; at = predecessors[at]) {
        path.push(at);
    }
    return path.reverse(); 
}

const vexNames = {
    0: "RSL",
    1: "AUR",
    2: "ITU",
    3: "IMB",
    4: "VID",
    5: "PET",
    6: "CHAP",
    7: "LAU",
    8: "ROE",
    9: "TAI",
    10: "SAL",
    11: "RCA",
    12: "STA",
    13: "PU",
    14: "MIR"
};

const sourceIndex = 4;
const result = dijkstra(graph, sourceIndex);

result.distance.forEach((dist, index) => {
    const outputDist = dist === INF ? "Sem conexão" : dist;
    const path = reconstructPath(result.passedby, index).map(i => vexNames[i]).join(" -> ");
    console.log(`${vexNames[sourceIndex]} -> ${vexNames[index]}: ${outputDist} (Caminho: ${path})`);
});


document.getElementById('dijkstraForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cidadeInicial = document.getElementById('cidadeInicial').value;
    const cidadeDestino = document.getElementById('cidadeDestino').value;

    const result = dijkstra(graph, parseInt(cidadeInicial));
    const distanciaFinal = result.distance[parseInt(cidadeDestino)];

    const caminho = reconstructPath(result.passedby, parseInt(cidadeDestino))
        .map(i => vexNames[i])
        .join(" -> ");

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Caminho:</strong> ${caminho}</p>
        <p><strong>Distância Total:</strong> ${distanciaFinal === INF ? 'Sem conexão' : distanciaFinal}</p>
    `;
});