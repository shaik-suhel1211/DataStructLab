
export function visualizeDS(type, ds) {
            const canvas = document.getElementById('canvas');
            canvas.innerHTML = '';
            
            switch(type) {
                case 'array':
                case 'stack':
                case 'queue':
                    const items = ds.getAll ? ds.getAll() : [];    //ternary operator (condition)? "if true" : "if false"
                    canvas.innerHTML = '<div class="array-container"></div>';
                    const container = canvas.querySelector('.array-container');
                    items.forEach((val, idx) => {
                        const div = document.createElement('div');
                        div.className = 'array-item';
                        div.textContent = val;
                        div.style.animationDelay = `${idx * 0.1}s`;
                        container.appendChild(div);
                    });
                    break;
                    
                case 'linkedlist':
                    const llItems = ds.toArray();
                    canvas.innerHTML = '<div class="array-container"></div>';
                    const llContainer = canvas.querySelector('.array-container');
                    llItems.forEach((val, idx) => {
                        const div = document.createElement('div');
                        div.className = 'array-item';
                        div.innerHTML = `${val}${idx < llItems.length - 1 ? ' →' : ''}`;
                        llContainer.appendChild(div);
                    });
                    break;
                    
                case 'bst':
                    if (ds.root) {
                        canvas.innerHTML = '<div class="tree-container"></div>';
                        const treeContainer = canvas.querySelector('.tree-container');
                        treeContainer.appendChild(renderTreeNode(ds.root));
                    } else {
                        canvas.innerHTML = '<p style="text-align:center;padding:40px;">Tree is empty</p>';
                    }
                    break;
                    
                case 'heap':
                    const heapItems = ds.getAll();
                    canvas.innerHTML = '<div class="array-container"></div>';
                    const heapContainer = canvas.querySelector('.array-container');
                    heapItems.forEach((val, idx) => {
                        const div = document.createElement('div');
                        div.className = 'array-item';
                        div.textContent = val;
                        div.title = `Index: ${idx}`;
                        heapContainer.appendChild(div);
                    });
                    break;
                    
                case 'graph':
            let graphHTML = '<div style="padding:20px;">';
             const vertices = Object.keys(ds.adjacencyList);
            if (vertices.length === 0) {
       
           graphHTML += '<p style="text-align:center;color:#999;">Graph is empty. Add vertices and edges to visualize.</p>';
            graphHTML += '<p style="text-align:center;margin-top:10px;"><strong>Quick start:</strong> Click "Sample Graph" button!</p>';
            } else {
           graphHTML += '<div style="background:#f0f0f0;padding:15px;border-radius:8px;margin-bottom:15px;">';
           graphHTML += `<strong>Vertices (${vertices.length}):</strong> ${vertices.join(', ')}`;
          graphHTML += '</div>';
          graphHTML += '<div style="background:#fff;padding:15px;border:2px solid #e0e0e0;border-radius:8px;">';
          graphHTML += '<strong style="display:block;margin-bottom:10px;color:#667eea;">Adjacency List:</strong>';
          vertices.forEach(vertex => {
            graphHTML += `<div style="margin:8px 0;padding:8px;background:#f8f9fa;border-left:3px solid #667eea;">`;
            graphHTML += `<strong>${vertex}</strong> → ${ds.adjacencyList[vertex].length > 0 ? ds.adjacencyList[vertex].join(', ') : '(no connections)'}`;
            graphHTML += `</div>`;
           });
           graphHTML += '</div>';
       
          graphHTML += '<div style="margin-top:15px;padding:10px;background:#e3f2fd;border-radius:8px;">';
          graphHTML += '<strong> Tip:</strong> Enter a vertex name (e.g., "A") in the input field, then click BFS or DFS to traverse!';
          graphHTML += '</div>';
      }
            graphHTML += '</div>';
              canvas.innerHTML = graphHTML;
                  break;
                    
                case 'hashtable':
                    const htItems = ds.getAll();
                    canvas.innerHTML = '<div class="array-container"></div>';
                    const htContainer = canvas.querySelector('.array-container');
                    htItems.forEach(([key, value]) => {
                        const div = document.createElement('div');
                        div.className = 'array-item';
                        div.innerHTML = `<small>${key}</small><br>${value}`;
                        div.style.height = '80px';
                        htContainer.appendChild(div);
                    });
                    break;
            }
        }

        function renderTreeNode(node) {
            if (!node) return null;
            
            const container = document.createElement('div');
            container.className = 'tree-node';
            
            const value = document.createElement('div');
            value.className = 'tree-node-value';
            value.textContent = node.val;
            container.appendChild(value);
            
            if (node.left || node.right) {
                const children = document.createElement('div');
                children.className = 'tree-children';
                
                if (node.left) {
                    children.appendChild(renderTreeNode(node.left));
                } else {
                    const empty = document.createElement('div');
                    empty.style.width = '50px';
                    children.appendChild(empty);
                }
                
                if (node.right) {
                    children.appendChild(renderTreeNode(node.right));
                } else {
                    const empty = document.createElement('div');
                    empty.style.width = '50px';
                    children.appendChild(empty);
                }
                
                container.appendChild(children);
            }
            
            return container;
        }