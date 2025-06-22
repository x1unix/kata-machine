const swap = (arr: number[], i: number, j: number) => {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

const part = (arr: number[], lo: number, hi: number): number => {
    const p = arr[hi]
    let j = lo - 1

    for (let i = lo; i < hi; i++) {
        if (arr[i] > p) {
            continue
        }

        j++
        swap(arr, i, j)
    }

    // move pivot to correct place.
    // items behind pivot are LTE than pivot.
    j++
    swap(arr, hi, j)
    return j
}

const qs = (arr: number[], lo: number, hi: number) => {
    if (lo >= hi) {
        return
    }

    const p = part(arr, lo, hi)
    qs(arr, lo, p - 1)
    qs(arr, p + 1, hi)
}


export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1)
}
