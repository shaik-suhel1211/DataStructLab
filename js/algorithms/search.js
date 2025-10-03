export async function linearSearch(arr, target, visualize) {
    for (let i = 0; i < arr.length; i++) {
        await visualize(i, -1, 'checking');
        if (arr[i] === target) {
            await visualize(i, -1, 'found');
            return i;
        }
    }
    return -1;
}

export async function binarySearch(arr, target, visualize) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        await visualize(mid, -1, 'checking');
        if (arr[mid] === target) {
            await visualize(mid, -1, 'found');
            return mid;
        }
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
