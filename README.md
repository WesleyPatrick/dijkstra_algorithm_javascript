# 🚗🌍 Algoritmo de Dijkstra para Cidades
## Índice

- Descrição
- Instalação
- Uso
- Estrutura de Funções
  - 1. Constantes e Variáveis Iniciais
  - 2. Matriz de Adjacência do Grafo
  - 3. Função minDistance()
  - 4. Função dijkstra()
  - 5. Função reconstructPath()
  - 6. Objeto vexNames
  - 7. Lógica de Execução e Exibição de Resultados
  - 8. Lógica de Execução e Exibição de Resultados (HTML)

## Descrição

Este projeto implementa o **Algoritmo de Dijkstra** (aquele que encontra o caminho mais curto entre os vértices de um grafo) usando JavaScript. Imagine que você tem um mapa de cidades e quer saber o jeito mais rápido (ou menos cansativo) de ir de uma cidade para outra. Este código faz exatamente isso! 💡

## Instalação

Nenhuma instalação necessária. Basta abrir o arquivo HTML no seu navegador para rodar o algoritmo.

## Uso

1. Defina a matriz `graph` no arquivo JavaScript. Cada posição `[i][j]` representa a distância entre a cidade `i` e a cidade `j`.
2. Execute o código e veja os caminhos mais curtos e suas respectivas distâncias sendo exibidos no console.
3. O projeto está estruturado para que o código seja facilmente integrável a um formulário HTML, ou por meio do uso do console, onde o usuário poderia escolher a cidade de origem e de destino.

## Estrutura de Funções

### 1. Constantes e Variáveis Iniciais

```javascript
const INF = Number.MAX_SAFE_INTEGER;
```

**Descrição:** `INF` representa um valor "infinito", indicando que não há conexão direta entre duas cidades. Ele é usado para simular a ausência de uma conexão.

---

### 2. Matriz de Adjacência do Grafo

```javascript
const graph = [
    [0, 6, 30.8, 0, 0],
    [6, 0, 10, 0, 0],
    ...
];
```

**Descrição:** A matriz de adjacência `graph` representa o mapa das cidades e as distâncias entre elas. Um valor `0` significa que não há conexão direta entre duas cidades.

---

### 3. Função minDistance()

```javascript
function minDistance(distance, visited) { ... }
```

**Objetivo:** Identifica o vértice (cidade) com a menor distância a partir da cidade inicial, que ainda não foi visitado.

**Parâmetros:**
- `distance`: Array que armazena as distâncias mínimas de cada cidade a partir da cidade de origem.
- `visited`: Array booleano que indica se a cidade já foi visitada.

---

### 4. Função dijkstra()

```javascript
function dijkstra(graph, source) { ... }
```

**Objetivo:** Calcula o caminho mais curto da cidade de origem para todas as outras cidades utilizando o algoritmo de Dijkstra.

**Parâmetros:**
- `graph`: Matriz de adjacência que representa o grafo.
- `source`: Índice da cidade de origem.

**Funcionamento:**
- Inicializa os arrays `distance`, `visited` e `passedby`.
- Encontra a cidade com a menor distância ainda não visitada.
- Atualiza as distâncias para os vizinhos da cidade atual.

---

### 5. Função reconstructPath()

```javascript
function reconstructPath(predecessors, target) { ... }
```

**Objetivo:** Reconstrói o caminho mais curto da cidade de origem até a cidade de destino.

**Parâmetros:**
- `predecessors`: Array que contém o predecessor de cada cidade.
- `target`: Índice da cidade de destino.

**Funcionamento:** A partir da cidade de destino, percorre o array de predecessores até chegar à cidade de origem.

---

### 6. Objeto vexNames

```javascript
const vexNames = {
    0: "RSL",
    1: "AUR",
    2: "ITU",
    ...
};
```

**Objetivo:** Mapeia os índices das cidades para seus nomes, facilitando a exibição dos resultados.

---

### 7. Lógica de Execução e Exibição de Resultados (NO CONSOLE)

Para isso, deve-se comentar o código que faz a integração com o formulario html

```javascript
const sourceIndex = 1;
const result = dijkstra(graph, sourceIndex);

result.distance.forEach((dist, index) => {
    const path = reconstructPath(result.passedby, index)
        .map(i => vexNames[i])
        .join(" -> ");
    console.log(`${vexNames[sourceIndex]} -> ${vexNames[index]}: ${dist} (Caminho: ${path})`);
});
```

**Objetivo:** Executa o algoritmo de Dijkstra a partir da cidade de origem, calcula e exibe a menor distância e o caminho para todas as cidades.



#### Exemplo de Saída

```plaintext
AUR -> RSL: 6 (Caminho: AUR -> RSL)
AUR -> ITU: 16 (Caminho: AUR -> RSL -> ITU)
...
```

---

### 8. Lógica de Execução e Exibição de Resultados (HTML)

Esta seção permite que o usuário interaja com o algoritmo de Dijkstra diretamente a partir de um formulário HTML. O formulário coleta a cidade de origem e de destino, e exibe o caminho mais curto e a distância diretamente na página.

```javascript
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
