const bubsort = (arr: number[], end: number) => {
  for (let i = 0; i < end; i++) {
    let j = i + 1
    const v = arr[i]
    if (v > arr[j]) {
      arr[i] = arr[j]
      arr[j] = v
    }
  }
}

export default function bubble_sort(arr: number[]): void {
    for (let j = arr.length - 1; j > 0; j--) {
        bubsort(arr, j)
    }
}
