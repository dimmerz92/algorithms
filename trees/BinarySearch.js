class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor(array) {
        this.root = this.#buildTree([...new Set(array)].sort((a, b) => a - b));
    };

    #compare(data, root) {
        if ((data < root.value && !root.left) || (data > root.value && !root.right)) {return root};
        if ((data < root.value && root.left.value === data) || (data > root.value && root.right.value === data)) {return root};
        if (data < root.value) {return (this.#compare(data, root.left))};
        if (data > root.value) {return (this.#compare(data, root.right))};
    };

    #findLeft(node) {
        if (!node.left) {return node};
        return (this.#findLeft(node.left));
    };

    #buildTree(array) {
        if (!array.length) {return null};
        
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);
        root.left = this.#buildTree(array.slice(0, mid));
        root.right = this.#buildTree(array.slice(mid + 1));

        return root;
    };

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        };
      };

      insert(value) {
        const node = this.#compare(value, this.root);
        value < node.value ? node.left = new Node(value) : node.right = new Node(value);
      };

      delete(value, root = this.root) {
        const node = this.#compare(value, root);
        console.log(node);

        // no children
        if (value < node.value && !node.left.left && !node.left.right) {return (node.left = null)};
        if (value > node.value && !node.right.left && !node.right.right) {return (node.right = null)};

        // one child
        if (value < node.value && (!node.left.left || !node.left.right)) {
            return (!node.left.left ? node.left = node.left.right : node.left = node.left.left);
        };
        if (value > node.value && (!node.right.left || !node.right.right)) {
            return (!node.right.left ? node.right = node.right.right : node.right = node.right.left);
        };
        
        // two children
        if (value < node.value && !!node.left.left && node.left.right) {
            const nextNode = this.#findLeft(node.left.right);
            node.left.value = nextNode.value;
            this.delete(node.left.value, node.left.right);
        };
    };

    find(value) {
        const root = this.#compare(value, this.root);
        return (value < root.value ? root.left : root.right);
    };

    levelOrder(func) {
        const queue = [this.root];
        const array = [this.root.value];

        while (queue.length > 0) {
            if (queue[0].left !== null) {queue.push(queue[0].left); array.push(queue[0].left.value)};
            if (queue[0].right !== null) {queue.push(queue[0].right); array.push(queue[0].right.value)};
            !func ? null : func(queue[0]);
            queue.shift();
        };
        if (!func) {return array};
    };

    preOrder(func, root = this.root) {
        const array = [];
        if (!func) {
            array.push(root.value);
            if (root.left !== null) {array.push(this.preOrder(func, root.left))};
            if (root.right !== null) {array.push(this.preOrder(func, root.right))};
            return array.flat(Infinity);
        } else {
            if (root.value !== null) {func(root.value)};
            if (root.left !== null) {this.preOrder(func, root.left)};
            if (root.right !== null) {this.preOrder(func, root.right)};
        };
    };

    inOrder(func, root = this.root) {
        const array = [];
        if (!func) {
            if (root.left !== null) {array.push(this.inOrder(func, root.left))};
            array.push(root.value);
            if (root.right !== null) {array.push(this.inOrder(func, root.right))};
            return array.flat(Infinity);
        } else {
            if (root.left !== null) {this.inOrder(func, root.left)};
            if (root.value !== null) {func(root.value)};
            if (root.right !== null) {this.inOrder(func, root.right)};
        };
    };

    postOrder(func, root = this.root) {
        const array = [];
        if (!func) {
            if (root.left !== null) {array.push(this.postOrder(func, root.left))};
            if (root.right !== null) {array.push(this.postOrder(func, root.right))};
            array.push(root.value);
            return array.flat(Infinity);
        } else {
            if (root.left !== null) {this.postOrder(func, root.left)};
            if (root.value !== null) {func(root.value)};
            if (root.right !== null) {this.postOrder(func, root.right)};
        };
    };

    height(node, height = 0) {
        let left = 0;
        let right = 0;
        if (!node.left && !node.right) {return height};
        if (node.left !== null) {left =  this.height(node.left, height + 1)};
        if (node.right !== null) {right =  this.height(node.right, height + 1)};
        return (left > right ? left : right);
    };

    depth(node, root = this.root, depth = 0) {
        if (node.value === root.value) {return depth};
        if (node.value < root.value) {return this.depth(node, root.left, depth + 1)};
        if (node.value > root.value) {return this.depth(node, root.right, depth + 1)};
    };

    isBalanced() {
        const left = this.depth(this.#findLeft(this.root.left));
        const right = this.depth(this.#findLeft(this.root.right));
        const delta = left - right;
        return (delta > 1 ? false : true);
    };

    rebalance() {
        const balanceArray = this.preOrder().sort((a, b) => a - b);
        return (this.root = this.#buildTree(balanceArray));
    };
};