import {ListNode} from "./ListNode.js";

export class LinkedList {
            constructor() {
                this.head = null;
                this.size = 0;
            }
            
            append(val) {
                const newNode = new ListNode(val);
                if (!this.head) {
                    this.head = newNode;
                } else {
                    let current = this.head;
                    while (current.next) {
                        current = current.next;
                    }
                    current.next = newNode;
                }
                this.size++;
            }
            
            prepend(val) {
                const newNode = new ListNode(val);
                newNode.next = this.head;
                this.head = newNode;
                this.size++;
            }
            
            delete(val) {
                if (!this.head) return;
                
                if (this.head.val === val) {
                    this.head = this.head.next;
                    this.size--;
                    return;
                }
                
                let current = this.head;
                while (current.next && current.next.val !== val) {
                    current = current.next;
                }
                
                if (current.next) {
                    current.next = current.next.next;
                    this.size--;
                }
            }
            
            toArray() {
                const arr = [];
                let current = this.head;
                while (current) {
                    arr.push(current.val);
                    current = current.next;
                }
                return arr;
            }
        }