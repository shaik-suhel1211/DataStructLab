export class Graph {
            constructor() {
                this.adjacencyList = {};
            }
            
            addVertex(v) {
                if (!this.adjacencyList[v]) {
                    this.adjacencyList[v] = [];
                }
            }
            
            addEdge(v1, v2) {
                this.addVertex(v1);
                this.addVertex(v2);
                this.adjacencyList[v1].push(v2);
                this.adjacencyList[v2].push(v1);
            }
            
            bfs(start) {
                const queue = [start];
                const result = [];
                const visited = {};
                visited[start] = true;
                
                while (queue.length) {
                    const vertex = queue.shift();
                    result.push(vertex);
                    
                    this.adjacencyList[vertex].forEach(neighbor => {
                        if (!visited[neighbor]) {
                            visited[neighbor] = true;
                            queue.push(neighbor);
                        }
                    });
                }
                return result;
            }
            
            dfs(start) {
                const result = [];
                const visited = {};
                
                const dfsHelper = (vertex) => {
                    visited[vertex] = true;
                    result.push(vertex);
                    this.adjacencyList[vertex].forEach(neighbor => {
                        if (!visited[neighbor]) {
                            dfsHelper(neighbor);
                        }
                    });
                };
                
                dfsHelper(start);
                return result;
            }
        }