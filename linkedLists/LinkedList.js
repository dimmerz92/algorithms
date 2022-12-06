const Node = (input) => {
    return {
        value: input || null,
        next: null
    };
};

const LinkedList = () => {
    let HEAD = null;
    let SIZE = 0;

    const append = (input) => {
        const newNode = Node(input);
        SIZE++;

        if (!HEAD) {return (HEAD = newNode)};

        let pointer = HEAD;
        while (pointer.next !== null) {
            pointer = pointer.next;
        };
        return (pointer.next = newNode);
    };

    const prepend = (input) => {
        const BODY = HEAD;
        HEAD = Node(input);
        HEAD.next = BODY;
        SIZE++;
    };

    const size = () => {
        return SIZE;
    };

    const head = () => {
        if (!HEAD) {return null};
        return HEAD.value;
    };

    const tail = () => {
        let pointer = HEAD;
        while (pointer.next !== null) {
            pointer = pointer.next;
        };
        return pointer.value;
    };

    const at = (index) => {
        if (index >= SIZE) {return "Index out of bounds"};

        let pointer = HEAD;
        for (let i = 0; i < index; i++) {
            pointer = pointer.next;
        };

        return pointer.value;
    };

    const pop = () => {
        if (!HEAD) {
            return "Nothing to pop"
        } else if (!HEAD.next) {
            SIZE--;
            return (HEAD = null)
        };

        let pointer = HEAD;
        while (pointer.next !== null) {
            if (!pointer.next.next) {
                SIZE--;
                return (pointer.next = null);
            };
            pointer = pointer.next;
        };
    };

    const contains = (input) => {
        if (SIZE === 0) {
            return "Can't check list of size 0";
        };
        
        let pointer = HEAD;
        for (let i = 0; i < SIZE; i++) {
            if (pointer.value === input) {
                return true;
            };
            pointer = pointer.next;
        };
        return false;
    };

    const find = (input) => {
        if (!HEAD) {
            return null;
        };

        let pointer = HEAD;
        for (let i = 0; i < SIZE; i++) {
            if (pointer.value === input) {
                return i;
            };
            pointer = pointer.next;
        };
        return null;
    };

    const toString = () => {
        let listString = "";
        if (!HEAD) {
            return listString;
        };

        let pointer = HEAD;
        for (let i = 0; i <= SIZE; i++) {
            if (pointer !== null){
                listString += `( ${pointer.value} ) -> `;
            } else {
                return (listString += 'null');
            };
            pointer = pointer.next;
        };
        return listString;
    };

    const insertAt = (input, index) => {
        const newNode = Node(input);
        SIZE++;

        if (index === 0) {
            return (prepend(input));
        };
        if (index === SIZE - 1) {
            return (append(input));
        };
        if (index >= SIZE) {
            return "Index out of bounds";
        };

        let before = null;
        let pointer = HEAD;
        for (let i = 0; i <= index; i++) {
            if (i === index - 1) {
                before = pointer;
            }
            if (i === index) {
                newNode.next = pointer;
                return (before.next = newNode);
            };
            pointer = pointer.next;
        };
    };

    const removeAt = (index) => {
        let pointer = HEAD;
        for (let i = 0; i < index; i++) {
            if (i === index - 1) {
                return (pointer.next = pointer.next.next);
            };
            pointer = pointer.next;
        };
    };

    return {append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt};
};