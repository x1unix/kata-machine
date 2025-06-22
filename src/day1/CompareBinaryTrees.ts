type Maybe<T> = T | null | undefined

interface BinaryNode<T> {
  value: T
  left?: Maybe<BinaryNode<T>>
  right?: Maybe<BinaryNode<T>>
}

function visitNode<T>(a: Maybe<BinaryNode<T>>, b: Maybe<BinaryNode<T>>): boolean {
  if (!a && !b) {
    return true
  }

  if (!a || !b) {
    return false
  }

  if (a?.value !== b?.value) {
    return false
  }

  if (!visitNode(a?.left, b?.left)) {
    return false
  }

  return visitNode(a?.right, b?.right)
}

export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    return visitNode(a, b)
}
