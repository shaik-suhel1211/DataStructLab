import {TreeNode} from './TreeNode.js';

export class BST {
            constructor() {
                this.root = null;
            }
            
            insert(val) {
                const newNode = new TreeNode(val);
                if (!this.root) {
                    this.root = newNode;
                    return;
                }
                
                let current = this.root;
                while (true) {
                    if (val < current.val) {
                        if (!current.left) {
                            current.left = newNode;
                            break;
                        }
                        current = current.left;
                    } else {
                        if (!current.right) {
                            current.right = newNode;
                            break;
                        }
                        current = current.right;
                    }
                }
            }
            
            search(val) {
                let current = this.root;
                while (current) {
                    if (val === current.val) return true;
                    if (val < current.val) current = current.left;
                    else current = current.right;
                }
                return false;
            }
            
            inorder(node = this.root, result = []) {
                if (node) {
                    this.inorder(node.left, result);
                    result.push(node.val);
                    this.inorder(node.right, result);
                }
                return result;
            }
        }