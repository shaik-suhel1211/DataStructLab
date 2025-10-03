import { log, sleep } from './utils.js';
import {linearSearch,binarySearch} from '../algorithms/search.js';
import {bubbleSort,selectionSort,insertionSort,mergeSort,quickSort} from '../algorithms/sorting.js';

let algoArray = [];
let isAnimating = false;


        export function generateRandomArray() {
            algoArray = [];
            for (let i = 0; i < 12; i++) {
                algoArray.push(Math.floor(Math.random() * 100) + 1);
            }
            displayArray();
            log('Generated random array');
        }

       export function resetArray() {
            displayArray();
            document.getElementById('logArea').innerHTML = '';
            log('Array reset');
        }

       export function displayArray(highlightIndices = [], state = '') {
            const canvas = document.getElementById('algoCanvas');
            canvas.innerHTML = '';
            
            algoArray.forEach((val, idx) => {
                const div = document.createElement('div');
                div.className = 'array-item';
                
                if (highlightIndices.includes(idx)) {
                    if (state === 'comparing') div.classList.add('comparing');
                    else if (state === 'found') div.classList.add('sorted');
                    else div.classList.add('highlight');
                }
                
                div.textContent = val;
                canvas.appendChild(div);
            });
        }
    

export async function runAlgorithm(currentAlgo) {
    if (isAnimating) return;
    isAnimating = true;

    const type = currentAlgo;

    log(`Starting ${type} algorithm...`);

    const visualize = async (idx1, idx2, state) => {
        const indices = idx2 !== undefined && idx2 >= 0 ? [idx1, idx2] : [idx1];

        // Swap if needed
        if (state === 'swapping') {
            [algoArray[idx1], algoArray[idx2]] = [algoArray[idx2], algoArray[idx1]];
        }

        displayArray(indices, state);
        await sleep(300);
    };

    try {
        switch(type) {
            case 'bubble':
                await bubbleSort(algoArray, visualize);
                log('Bubble sort completed!');
                break;

            case 'selection':
                await selectionSort(algoArray, visualize);
                log('Selection sort completed!');
                break;

            case 'insertion':
                await insertionSort(algoArray, visualize);
                log('Insertion sort completed!');
                break;

            case 'merge':
                algoArray = await mergeSort(algoArray, visualize);
                log('Merge sort completed!');
                break;

            case 'quick':
                await quickSort(algoArray, visualize);
                log('Quick sort completed!');
                break;

            case 'linear':
                const target1 = parseInt(document.getElementById('targetValue').value);
                const result1 = await linearSearch(algoArray, target1, visualize);
                log(`Linear search: ${result1 >= 0 ? 'Found at index ' + result1 : 'Not found'}`);
                break;

            case 'binary':
                algoArray.sort((a,b) => a-b);
                displayArray();
                await sleep(300);
                const target2 = parseInt(document.getElementById('targetValue').value);
                const result2 = await binarySearch(algoArray, target2, visualize);
                log(`Binary search: ${result2 >= 0 ? 'Found at index ' + result2 : 'Not found'}`);
                break;
        }
        
       if (['bubble','selection','insertion','merge','quick','linear','binary'].includes(type)) {
    displayArray(algoArray.map((_, i) => i), 'found');
}

    } catch(e) {
        log(`Error: ${e.message}`);
    }

    isAnimating = false;
}