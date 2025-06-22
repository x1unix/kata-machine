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

    path.push(n.value)
    visit(n.left, path)
    visit(n.right, path)
}

export default function pre_order_search(head: Node<number>): number[] {
    const p: number[] = []
    visit(head, p)
    return p
}
