class BST {
    constructor() {
        this.root = null;
    }
    insert(val) {
        var root = this.root;
        if (!root) {
            this.root = new Node(val);
            return;
        }
        var currentNode = root;
        var newNode = new Node(val);
        while (currentNode) {
            if (val < currentNode.value) {
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    break;
                }
                else {
                    currentNode = currentNode.left;
                }
            }
            else {
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    break;
                }
                else {
                    currentNode = currentNode.right;
                }
            }
        }
    }
}

function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

var first = new BST();
first.insert(30);
first.insert(20);
first.insert(50);
first.insert(60);
first.insert(45);
first.insert(55);
console.log(first);