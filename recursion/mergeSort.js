function mergeSort(array) {
    if (array.length === 0) return "Array must be greater than length 0";
    if (array.length === 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle, array.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(leftArray, rightArray) {
    const mergedArray = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            mergedArray.push(leftArray[leftIndex]);
            leftIndex++;
        } else {
            mergedArray.push(rightArray[rightIndex]);
            rightIndex++;
        };
    };

    while (leftIndex < leftArray.length) {
        mergedArray.push(leftArray[leftIndex]);
        leftIndex++;
    };

    while (rightIndex < rightArray.length) {
        mergedArray.push(rightArray[rightIndex]);
        rightIndex++;
    };

    return mergedArray;
};

console.log(mergeSort([3,4,2,1,12,6,10,5,8,11,9,7]));