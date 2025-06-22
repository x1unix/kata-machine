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
    path.push(n.value)
    visit(n.right, path)
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    let p: number[] = []
    visit(head, p)
    return p
}
