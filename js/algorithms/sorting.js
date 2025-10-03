export async function bubbleSort(arr, visualize) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await visualize(j, j + 1, 'comparing');
            if (arr[j] > arr[j + 1]) {
                await visualize(j, j + 1, 'swapping'); // visualize handles swap
            }
        }
    }
    return arr;
}

export async function selectionSort(arr, visualize) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            await visualize(minIdx, j, 'comparing');
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
            await visualize(i, minIdx, 'swapping'); // visualize handles swap
        }
    }
    return arr;
}

export async function insertionSort(arr, visualize) {
    for (let i = 1; i < arr.length; i++) {
        let keyIdx = i;
        for (let j = i - 1; j >= 0; j--) {
            await visualize(j, keyIdx, 'comparing');
            if (arr[j] > arr[keyIdx]) {
                await visualize(j, keyIdx, 'swapping'); // visualize handles swap
                keyIdx = j;
            } else break;
        }
    }
    return arr;
}

export async function mergeSort(arr, visualize, start = 0) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), visualize, start);
    const right = await mergeSort(arr.slice(mid), visualize, start + mid);

    return await merge(left, right, visualize, start);
}

async function merge(left, right, visualize, start) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        await visualize(start + i, start + left.length + j, 'comparing');
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

export async function quickSort(arr, visualize, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = await partition(arr, low, high, visualize);
        await quickSort(arr, visualize, low, pi - 1);
        await quickSort(arr, visualize, pi + 1, high);
    }
    return arr;
}

async function partition(arr, low, high, visualize) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        await visualize(j, high, 'comparing');
        if (arr[j] < pivot) {
            i++;
            await visualize(i, j, 'swapping'); // visualize handles swap
        }
    }

    await visualize(i + 1, high, 'swapping'); // place pivot
    return i + 1;
}

