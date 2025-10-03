
import {DynamicArray} from './js/ds/DynamicArray.js';
import {Stack} from './js/ds/Stack.js';
import {Queue} from './js/ds/Queue.js';
import {LinkedList} from './js/ds/LinkedList.js';
import {BST} from './js/ds/BST.js';
import {MinHeap} from './js/ds/MinHeap.js';
import {Graph} from './js/ds/Graph.js';
import {HashTable} from './js/ds/HashTable.js';
import { visualizeDS } from './js/ui/dsVisualization.js';
import { generateRandomArray, resetArray, runAlgorithm} from './js/ui/algoVisualization.js';
import { log } from './js/ui/utils.js';

export let currentDS = null;
export let currentAlgo = null;
export let algoGraph = null;

window.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.menu-item[data-ds]')   //selects all elements which has both classes menu-item and data-ds
.forEach(item => {
    const type = item.dataset.ds;                    //reading the data-ds value this is for attributes data-*. js provides dataset for accessing values
    item.addEventListener('click', (event) => selectDS(type, event));
});

document.querySelectorAll('.menu-item[data-algo]').forEach(item => {
    const type = item.dataset.algo;
    item.addEventListener('click', (event) => selectAlgo(type, event));
});
});

// ---------- Select Data Structure ----------
export function selectDS(type, event) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));    //removing active from all menu item and 
    event.target.classList.add('active');                                                         //only adding active to the current menu item(target=current menu item)
    currentDS = type;
    currentAlgo = null;
    renderDS(type);
}

// ---------- Select Algorithm ----------
export function selectAlgo(type, event) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    currentAlgo = type;
    currentDS = null;
    renderAlgo(type);
}

// ---------- Render Data Structure ----------
function renderDS(type) {
    const vizArea = document.getElementById('vizArea');

    const complexities = {
        array: { name: 'Array', access: 'O(1)', search: 'O(n)', insertion: 'O(n)', deletion: 'O(n)', space: 'O(n)' },
        stack: { name: 'Stack', push: 'O(1)', pop: 'O(1)', peek: 'O(1)', search: 'O(n)', space: 'O(n)' },
        queue: { name: 'Queue', enqueue: 'O(1)', dequeue: 'O(1)', front: 'O(1)', search: 'O(n)', space: 'O(n)' },
        linkedlist: { name: 'Linked List', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', space: 'O(n)' },
        bst: { name: 'Binary Search Tree', search: 'O(log n) avg', insertion: 'O(log n) avg', deletion: 'O(log n) avg', worst: 'O(n)', space: 'O(n)' },
        heap: { name: 'Min Heap', insert: 'O(log n)', extractMin: 'O(log n)', getMin: 'O(1)', search: 'O(n)', space: 'O(n)' },
        graph: { name: 'Graph (Adjacency List)', addVertex: 'O(1)', addEdge: 'O(1)', bfs: 'O(V + E)', dfs: 'O(V + E)', space: 'O(V + E)' },
        hashtable: { name: 'Hash Table', search: 'O(1) avg', insertion: 'O(1) avg', deletion: 'O(1) avg', worst: 'O(n)', space: 'O(n)', note: 'V = vertices, E = edges' }
    };

    const comp = complexities[type];

    let html = `<h2>${comp.name}</h2>
        <div class="complexity-box">
            <h3>⏱ Time & Space Complexity</h3>
            <div class="complexity-grid">`;

    Object.keys(comp).forEach(key => {
        if (key !== 'name') {
            html += `<div class="complexity-item">
                        <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                        ${comp[key]}
                    </div>`;  //first char of key is uppercase and strong and value at the key(comp[key])
        }
    });

    html += `</div></div>
        <div class="controls">
            <div class="control-group">
                <label>Value:</label>
                <input type="text" id="inputValue" placeholder="Enter value">
            </div>
            <div class="button-group" id="buttonGroup"></div>
        </div>
        <div class="canvas-container" id="canvas"></div>
        <div class="log-area" id="logArea"></div>`;

    vizArea.innerHTML = html;
    setupDSControls(type);
}

// ---------- Setup DS Controls ----------
function setupDSControls(type) {
    const buttonGroup = document.getElementById('buttonGroup');
    const ds = initializeDS(type);          //returns obj of type(for array-Dynamic array obj,for stack-stack obj)

    const buttons = {
        array: ['Add', 'Remove', 'Get', 'Random Fill'],
        stack: ['Push', 'Pop', 'Peek', 'Clear'],
        queue: ['Enqueue', 'Dequeue', 'Front', 'Clear'],
        linkedlist: ['Append', 'Prepend', 'Delete', 'Random Fill'],
        bst: ['Insert', 'Search', 'Inorder', 'Random Fill'],
        heap: ['Insert', 'Extract Min', 'Random Fill'],
        graph: ['Add Vertex', 'Add Edge','Sample Graph', 'BFS', 'DFS'],
        hashtable: ['Set Key-Value', 'Get', 'Show All']
    };

    buttons[type].forEach(btnText => {  //for each element of array
        const btn = document.createElement('button');
        btn.textContent = btnText;
        btn.onclick = () => handleDSAction(type, btnText.toLowerCase().replace(/\s+/g, ''), ds); //removes space's from string
        buttonGroup.appendChild(btn);
    });

    visualizeDS(type, ds);
}

// ---------- Initialize DS ----------
function initializeDS(type) {
    switch(type) {
        case 'array': return new DynamicArray();
        case 'stack': return new Stack();
        case 'queue': return new Queue();
        case 'linkedlist': return new LinkedList();
        case 'bst': return new BST();
        case 'heap': return new MinHeap();
        case 'graph': return new Graph();
        case 'hashtable': return new HashTable();
    }
}

// ---------- Handle DS Action ----------
function handleDSAction(type, action, ds) {
    const input = document.getElementById('inputValue').value;

    try {
        switch(type) {
            case 'array':
                if (action === 'add') { ds.add(parseInt(input)); log(`Added ${input} to array`); }
                else if (action === 'remove') { const val = ds.remove(); log(`Removed ${val} from array`); }
                else if (action === 'get') { const val = ds.get(parseInt(input)); log(`Value at index ${input}: ${val}`); }
                else if (action === 'randomfill') { for (let i = 0; i < 8; i++) ds.add(Math.floor(Math.random() * 100)); log('Filled array with random values'); }
                break;

            case 'stack':
                if (action === 'push') { ds.push(parseInt(input)); log(`Pushed ${input} to stack`); }
                else if (action === 'pop') { const val = ds.pop(); log(`Popped ${val} from stack`); }
                else if (action === 'peek') { const val = ds.peek(); log(`Top element: ${val}`); }
                else if (action === 'clear') { while (!ds.isEmpty()) ds.pop(); log('Stack cleared'); }
                break;

            case 'queue':
                if (action === 'enqueue') { ds.enqueue(parseInt(input)); log(`Enqueued ${input} to queue`); }
                else if (action === 'dequeue') { const val = ds.dequeue(); log(`Dequeued ${val} from queue`); }
                else if (action === 'front') { const val = ds.front(); log(`Front element: ${val}`); }
                else if (action === 'clear') { while (!ds.isEmpty()) ds.dequeue(); log('Queue cleared'); }
                break;

            case 'linkedlist':
                if (action === 'append') { ds.append(parseInt(input)); log(`Appended ${input} to list`); }
                else if (action === 'prepend') { ds.prepend(parseInt(input)); log(`Prepended ${input} to list`); }
                else if (action === 'delete') { ds.delete(parseInt(input)); log(`Deleted ${input} from list`); }
                else if (action === 'randomfill') { for (let i = 0; i < 6; i++) ds.append(Math.floor(Math.random() * 100)); log('Filled list with random values'); }
                break;

            case 'bst':
                if (action === 'insert') { ds.insert(parseInt(input)); log(`Inserted ${input} into BST`); }
                else if (action === 'search') { const found = ds.search(parseInt(input)); log(`Search ${input}: ${found ? 'Found' : 'Not found'}`); }
                else if (action === 'inorder') { const result = ds.inorder(); log(`Inorder traversal: ${result.join(', ')}`); }
                else if (action === 'randomfill') { [50,30,70,20,40,60,80].forEach(v=>ds.insert(v)); log('Filled BST with sample values'); }
                break;

            case 'heap':
                if (action === 'insert') { ds.insert(parseInt(input)); log(`Inserted ${input} into heap`); }
                else if (action === 'extractmin') { const min = ds.extractMin(); log(`Extracted minimum: ${min}`); }
                else if (action === 'randomfill') { for (let i = 0; i < 8; i++) ds.insert(Math.floor(Math.random() * 100)); log('Filled heap with random values'); }
                break;

            case 'graph':
    if (action === 'addvertex') {
        ds.addVertex(input);
        log(`Added vertex: ${input}`);
    } else if (action === 'addedge') {
        const [v1, v2] = input.split(',').map(s => s.trim());
        if (v1 && v2) {  // validation
            ds.addEdge(v1, v2);
            log(`Added edge: ${v1} - ${v2}`);
        } else {
            log('Error: Enter two vertices separated by comma (e.g., A,B)');
        }
    } else if (action === 'bfs') {
        //error checking
        if (Object.keys(ds.adjacencyList).length === 0) {
            log('Error: Graph is empty! Add vertices and edges first.');
        } else if (!input) {
            log('Error: Enter a starting vertex');
        } else if (!ds.adjacencyList[input]) {
            log(`Error: Vertex ${input} not found in graph`);
        } else {
            const result = ds.bfs(input);
            log(`BFS from ${input}: ${result.join(' -> ')}`);
        }
    } else if (action === 'dfs') {
        // error checking
        if (Object.keys(ds.adjacencyList).length === 0) {
            log('Error: Graph is empty! Add vertices and edges first.');
        } else if (!input) {
            log('Error: Enter a starting vertex');
        } else if (!ds.adjacencyList[input]) {
            log(`Error: Vertex ${input} not found in graph`);
        } else {
            const result = ds.dfs(input);
            log(`DFS from ${input}: ${result.join(' -> ')}`);
        }
    } else if (action === 'samplegraph') {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => ds.addVertex(v));
        ds.addEdge('A', 'B');
        ds.addEdge('A', 'C');
        ds.addEdge('B', 'D');
        ds.addEdge('C', 'E');
        ds.addEdge('D', 'E');
        ds.addEdge('D', 'F');
        ds.addEdge('E', 'F');
        log('Created sample graph with vertices A-F');
    }
    break;

            case 'hashtable':
                if (action === 'setkey-value') { const [key,value] = input.split(',').map(s=>s.trim()); ds.set(key,value); log(`Set ${key} = ${value}`); }
                else if (action === 'get') { const value = ds.get(input); log(`Get ${input}: ${value}`); }
                else if (action === 'showall') { const all = ds.getAll(); log(`All entries: ${JSON.stringify(all)}`); }
                break;
        }

        visualizeDS(type, ds);
    } catch(e) {
        log(`Error: ${e.message}`);
    }
}

// ---------- Render Algorithm ----------
function renderAlgo(type) {
    const vizArea = document.getElementById('vizArea');
    const complexities = {
        bubble: { name:'Bubble Sort', best:'O(n)', average:'O(n²)', worst:'O(n²)', space:'O(1)' },
        selection: { name:'Selection Sort', best:'O(n²)', average:'O(n²)', worst:'O(n²)', space:'O(1)' },
        insertion: { name:'Insertion Sort', best:'O(n)', average:'O(n²)', worst:'O(n²)', space:'O(1)' },
        merge: { name:'Merge Sort', best:'O(n log n)', average:'O(n log n)', worst:'O(n log n)', space:'O(n)' },
        quick: { name:'Quick Sort', best:'O(n log n)', average:'O(n log n)', worst:'O(n²)', space:'O(log n)' },
        linear: { name:'Linear Search', best:'O(1)', average:'O(n)', worst:'O(n)', space:'O(1)' },
        binary: { name:'Binary Search', best:'O(1)', average:'O(log n)', worst:'O(log n)', space:'O(1)' }
    };

    const comp = complexities[type];
    let html = `<h2>${comp.name}</h2>
        <div class="complexity-box">
            <h3>⏱ Time & Space Complexity</h3>
            <div class="complexity-grid">`;

    Object.keys(comp).forEach(key => {
        if(key!=='name') html += `<div class="complexity-item">
        <strong>${key.charAt(0).toUpperCase()+key.slice(1)}:</strong>
        ${comp[key]}</div>`;
    });

    html += `</div></div><div class="controls">`;

    if(['linear','binary'].includes(type)) {
        html += `<div class="control-group"><label>Target Value:</label><input type="number" id="targetValue" placeholder="Enter target"></div>`;
    }
     html += `<div class="button-group">
                <button id="runAlgoBtn">Run ${comp.name}</button>
                <button id="generateBtn">Generate Random Array</button>
                <button id="resetBtn">Reset</button>
            </div></div>
            <div class="canvas-container">
                <div class="array-container" id="algoCanvas"></div>
            </div>
            <div class="log-area" id="logArea"></div>`;

    vizArea.innerHTML = html;

    // Bind buttons
    document.getElementById('runAlgoBtn').onclick = () => runAlgorithm(type);
    document.getElementById('generateBtn').onclick = generateRandomArray;
    document.getElementById('resetBtn').onclick = resetArray;

    generateRandomArray();
}
