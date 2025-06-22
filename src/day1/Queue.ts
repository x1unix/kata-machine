interface Node<T> {
  value: T
  next?: Node<T>
}

export default class Queue<T> {
  public length: number = 0;
  private head?: Node<T>
  private tail?: Node<T>

  enqueue(item: T): void {
    const node = {value: item}
    this.length++
    if (!this.head || !this.tail) {
        this.head = this.tail = node
        return
    }

    this.tail.next = node
    this.tail = node
  }

  deque(): T | undefined {
    if (!this.head) {
        return
    }

    const v = this.head
    this.length--
    this.head = v.next
    if (!this.head) {
        this.tail = undefined
    }

    return v.value
  }

  peek(): T | undefined {
    return this.head?.value
  }
}
