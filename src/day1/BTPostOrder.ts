type Maybe<T> = T | null | undefined

interface Node<T> {
    value: T
    left?: Maybe<Node<T>>
    right?: Maybe<Node<T>>
}

function visit<T>(n: Maybe<Node<T>>, path: T[]) {
    if (!n) {
        return
    }

    visit(n.left, path)
    visit(n.right, path)
    path.push(n.value)
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const p: number[] = []
    visit(head, p)
    return p
}
