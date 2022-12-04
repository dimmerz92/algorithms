function fibsRec (n, x = [0,1]) {
    if (n === 0) return "Must be greater than 0";
    if (n <= x.length) return n === 1 ? x.slice(0, 2) : x;
    x.push(x[x.length - 2] + x[x.length - 1]);
    return fibsRec(n, x);
};

console.log(fibsRec(0));