 export class MinHeap {
            constructor() {
                this.heap = [];
            }
            
            parent(i) { return Math.floor((i - 1) / 2); }
            leftChild(i) { return 2 * i + 1; }
            rightChild(i) { return 2 * i + 2; }
            
            insert(val) {
                this.heap.push(val);
                this.bubbleUp(this.heap.length - 1);
            }
            
            bubbleUp(i) {
                while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
                    [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
                    i = this.parent(i);
                }
            }
            
            extractMin() {
                if (this.heap.length === 0) return null;
                if (this.heap.length === 1) return this.heap.pop();
                
                const min = this.heap[0];
                this.heap[0] = this.heap.pop();
                this.bubbleDown(0);
                return min;
            }
            
            bubbleDown(i) {
                let minIndex = i;
                const l = this.leftChild(i);
                const r = this.rightChild(i);
                
                if (l < this.heap.length && this.heap[l] < this.heap[minIndex]) {
                    minIndex = l;
                }
                if (r < this.heap.length && this.heap[r] < this.heap[minIndex]) {
                    minIndex = r;
                }
                if (i !== minIndex) {
                    [this.heap[i], this.heap[minIndex]] = [this.heap[minIndex], this.heap[i]];
                    this.bubbleDown(minIndex);
                }
            }
            
            getAll() {
                return [...this.heap];
            }
        }