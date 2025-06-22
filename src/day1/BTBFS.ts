import Queue from './Queue'

type Maybe<T> = T | null | undefined

interface BinaryNode<T> {
    value: T
    left?: Maybe<BinaryNode<T>>
    right?: Maybe<BinaryNode<T>>
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number>>()
    q.enqueue(head)

    let n: Maybe<BinaryNode<number>>
    while (q.length > 0) {
        n = q.deque()
        if (!n) {
            return false
        }

        if (n.value === needle) {
            return true
        }

        if (n.left) q.enqueue(n.left)
        if (n.right) q.enqueue(n.right)
    }

    return false
}
