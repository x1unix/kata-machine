interface Node<T> {
  value: T
  prev?: Node<T>
  next?: Node<T>
}

export default class DoublyLinkedList<T> {
  length = 0
  head?: Node<T>
  tail?: Node<T>

  constructor() {
  }

  prepend(item: T): void {
    this.length++
    if (!this.head) {
      this.head = this.tail = { value: item }
      return
    }

    const node = { value: item, next: this.head }
    this.head.prev = node
    this.head = node
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error(`Index ${idx} is out of bounds (len=${this.length})`)
    }

    switch (idx) {
      case 0:
        this.prepend(item)
        return
      case this.length:
        this.append(item)
        return
    }

    this.length++
    let curr = this.head
    for (let i = 0; curr && i < idx; i++) {
      curr = curr?.next
    }

    curr = curr as Node<T>
    const n: Node<T> = { value: item, next: curr, prev: curr.prev }
    curr.prev = n
    if (curr.prev) {
      curr.prev.next = n
    }
  }

  append(item: T): void {
    this.length++
    if (!this.tail) {
      const n = { value: item }
      this.head = this.tail = n
      return
    }

    const n: Node<T> = { value: item, prev: this.tail }
    this.tail.next = n
    this.tail = n
  }

  remove(item: T): T | undefined {
    let curr = this.head
    for (let i = 0; curr && i < this.length; i++) {
      if (curr.value === item) {
        break
      }

      curr = curr.next
    }

    if (!curr) {
      return
    }

    this.detachNode(curr)
    return curr.value
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value
  }

  removeAt(idx: number): T | undefined {
    const n = this.getAt(idx)
    if (!n) {
      return
    }

    this.detachNode(n)
    return n.value
  }

  private detachNode(n: Node<T>) {
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return
    }

    const { next, prev } = n
    if (prev) {
      prev.next = next
    }

    if (next) {
      next.prev = prev
    }

    if (this.head === n) {
      this.head = n.next
    }

    if (this.tail === n) {
      this.tail = n.prev
    }

    n.prev = n.next = undefined
    return n.value
  }

  private getAt(idx: number): Node<T> | undefined {
    if (idx > this.length) {
        return
    }

    let n = this.head
    for (let i = 0; n && i < idx; i++) {
      n = n.next
    }

    return n
  }
}
