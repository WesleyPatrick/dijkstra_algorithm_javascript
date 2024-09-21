const INF = Number.MAX_SAFE_INTEGER;

const graph = [

    [0,    5,    2,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   10,  0],  
    [5,    0,    19,  10,  5,   0,   2,   0,   0,   0,   0,   0,   0,   5,   0],  
    [2,    19,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],  
    [0,    10,   0,   0,   8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],  
    [0,    5,    0,   8,   0,   6,   5,   0,   0,   0,   0,   0,   0,   0,   0],  
    [0,    0,    0,   0,   6,   0,   10,  6,   0,   0,   0,   0,   0,   0,   0],  
    [0,    2,    0,   0,   5,   10,  0,   15,  0,   0,   0,   3,   7,   0,   0],  
    [0,    0,    0,   0,   0,   6,   15,  0,   6,   0,   0,   0,   0,   0,   0],  
    [0,    0,    0,   0,   0,   0,   0,   6,   0,   5,   0,   0,   0,   0,   0],  
    [0,    0,    0,   0,   0,   0,   0,   0,   5,   0,   4,   0,   0,   0,   0],  
    [0,    0,    0,   0,   0,   0,   0,   0,   0,   4,   0,   0,   0,   0,   20], 
    [0,    0,    0,   0,   0,   0,   3,   0,   0,   0,   0,   0,   9,   0,   0],  
    [0,    0,    0,   0,   0,   0,   7,   0,   0,   0,   0,   9,   0,   10,  0],  
    [10,   5,    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   10,  0,   0],  
    [0,    0,    0,   0,   0,   0,   0,   0,   0,   0,   20,  0,   0,   0,   0]   
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
    0: "RCA",   
    1: "TAI",   
    2: "MIR",   
    3: "LAU",   
    4: "AUR",   
    5: "IMB",   
    6: "RSL",   
    7: "VID",   
    8: "ROE",   
    9: "PU",    
    10: "STA",  
    11: "PET",  
    12: "CHAP", 
    13: "ITU",  
    14: "SAL"   
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