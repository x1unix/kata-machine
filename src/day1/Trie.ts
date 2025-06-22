import Stack from './Stack'

class TrieNode {
  public children = new Map<number, TrieNode>()

  constructor(public isWord = false) { }

  get isEmpty() {
    return this.children.size === 0
  }
}

function dfsTrie(n: TrieNode, path: string, results: string[]): string[] {
  if (n.isWord) {
    results.push(path)
  }

  n.children.forEach((val, key) => {
    const p = path + String.fromCharCode(key)
    dfsTrie(val, p, results)
  })

  return results
}

export default class Trie {
  private readonly root: TrieNode = new TrieNode()

  insert(item: string): void {
    let n = this.root
    const end = item.length - 1
    for (let i = 0; i < item.length; i++) {
      const c = item.charCodeAt(i)
      let node = n.children.get(c)
      if (!node) {
        node = new TrieNode()
        n.children.set(c, node)
      }

      if (i == end) {
        node.isWord = true
      }

      n = node
    }
  }

  delete(item: string): void {
    if (!item.length || this.root.isEmpty) return
    let n = this.root
    const s = new Stack<[TrieNode, number]>() // parent + child char
    for (let i = 0; i < item.length; i++) {
      const c = item.charCodeAt(i)
      const next = n.children.get(c)
      if (!next) return
      s.push([n, c])
      n = next
    }

    if (!n.isWord) return
    n.isWord = false

    while (s.length > 0) {
      const v = s.pop()
      if (!v) break
      const [parent, childCode] = v
      const child = parent.children.get(childCode)
      if (!child) throw new Error('Invariant: unexpected empty child in queue')
      if (child.isWord || !child.isEmpty) return
      parent.children.delete(childCode)
    }
  }

  find(partial: string): string[] {
    let n = this.root
    for (let i = 0; i < partial.length; i++) {
        const c = partial.charCodeAt(i)
        let node = n.children.get(c)
        if (!node) {
            return []
        }

        n = node
    }

    return dfsTrie(n, partial, [])
  }
}
