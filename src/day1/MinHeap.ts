const swap = (arr: number[], i: number, j: number) => {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

export default class MinHeap {
  public length = 0
  private data: number[] = []

  insert(value: number): void {
    this.data[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }

  delete(): number {
    if (!this.length) {
      return -1
    }

    const r = this.data[0]
    this.length--
    if (!this.length) {
      this.data = []
      return r
    }

    this.data[0] = this.data[this.length]
    this.heapifyDown(0)
    return r
  }

  private heapifyDown(idx: number) {
    let i = idx
    while (i <= this.length) {
      let li = this.getLeftChild(i)
      let ri = this.getRightChild(i)

      if (li >= this.length) {
        return
      }

      const lv = this.data[li]
      const rv = this.data[ri]
      const v = this.data[i]

      if (lv === rv && v > rv) {
        swap(this.data, i, ri)
        i = ri
      } else if (lv < rv && v > lv) {
        swap(this.data, i, li)
        i = li
      } else if (rv < lv && v > rv) {
        swap(this.data, i, ri)
        i = ri
      } else {
        // Shouldn't happen
        return
      }
    }
  }

  private heapifyUp(idx: number) {
    let i = idx
    while (i >= 0) {
      const v = this.data[i] 
      const j = this.getParent(i)
      const pv = this.data[j]

      if (v < pv) {
        swap(this.data, i, j)
        i = j
        continue
      }

      return
    }
  }

  private getParent(i: number): number {
    return Math.floor((i - 1) / 2)
  }

  private getLeftChild(i: number) {
    return 2 * i + 1
  }

  private getRightChild(i: number) {
    return 2 * i + 2
  }
}
