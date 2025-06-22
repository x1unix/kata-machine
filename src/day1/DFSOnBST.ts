export default function dfs(head: Maybe<BinaryNode<number>>, needle: number): boolean {
    if (!head) {
        return false
    }

    const { left, right, value } = head
    if (value === needle) {
        return true
    }

    const next = needle < value ? left : right
    return dfs(next, needle)
}
