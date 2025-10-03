
export class DynamicArray {
            constructor() {
                this.data = [];
                this.size = 0;
            }
            
            add(val) {
                this.data[this.size] = val;
                this.size++;
            }
            
            remove() {
                if (this.size === 0) return undefined;
                const val = this.data[this.size - 1];
                delete this.data[this.size - 1];
                this.size--;
                return val;
            }
            
            get(index) {
                return this.data[index];
            }
            
            set(index, val) {
                this.data[index] = val;
            }
            
            getAll() {
                return Object.values(this.data);
            }
        }