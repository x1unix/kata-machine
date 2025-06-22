interface Node<T> {
  next?: Node<T>
  value: T
}

export default class Stack<T> {
  public length: number = 0;
  private head?: Node<T>

  push(item: T): void {
    this.length++
    const node: Node<T> = { value: item }
    if (!this.head) {
      this.head = node
      return
    }

    node.next = this.head
    this.head = node
  }

  pop(): T | undefined {
    if (!this.head) {
      return
    }

    this.length--
    const v = this.head
    this.head = v.next
    return v.value
  }
  peek(): T | undefined {
    return this.head?.value
  }
}
