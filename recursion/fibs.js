function fibs(n) {
    const fibsArray = [0,1];
    if (n === 0) return "Must be greater than 0";
    if (n < fibsArray.length) return n === 1 ? fibsArray[n] : fibsArray;
    for (let i = 2; i < n; i++) {
        fibsArray.push(fibsArray[fibsArray.length - 2] + fibsArray[fibsArray.length - 1]);
    };
    return fibsArray;
};

//console.log(fibs(8));