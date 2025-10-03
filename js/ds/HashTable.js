 export class HashTable {
            constructor(size = 53) {
                this.keyMap = new Array(size);
            }
            
            _hash(key) {
                let total = 0;
                const PRIME = 31;
                for (let i = 0; i < Math.min(key.length, 100); i++) {
                    const char = key[i];
                    const value = char.charCodeAt(0) - 96;
                    total = (total * PRIME + value) % this.keyMap.length;
                }
                return total;
            }
            
            set(key, value) {
                const index = this._hash(key);
                if (!this.keyMap[index]) {
                    this.keyMap[index] = [];
                }
                this.keyMap[index].push([key, value]);
            }
            
            get(key) {
                const index = this._hash(key);
                if (this.keyMap[index]) {
                    for (let i = 0; i < this.keyMap[index].length; i++) {
                        if (this.keyMap[index][i][0] === key) {
                            return this.keyMap[index][i][1];
                        }
                    }
                }
                return undefined;
            }
            
            getAll() {
                const result = [];
                for (let i = 0; i < this.keyMap.length; i++) {
                    if (this.keyMap[i]) {
                        result.push(...this.keyMap[i]);
                    }
                }
                return result;
            }
        }