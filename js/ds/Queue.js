export class Queue {
            constructor() {
                this.items = [];
            }
            
            enqueue(val) {
                this.items.push(val);
            }
            
            dequeue() {
                return this.items.shift();
            }
            
            front() {
                return this.items[0];
            }
            
            isEmpty() {
                return this.items.length === 0;
            }
            
            size() {
                return this.items.length;
            }
            
            getAll() {
                return [...this.items];
            }
        }