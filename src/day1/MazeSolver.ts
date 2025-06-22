const dirs: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

interface Point {
    x: number
    y: number
}

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // 1. out of bounds
    const { x, y } = curr
    if (x < 0 || x >= maze[0].length ||
        y < 0 || y >= maze.length) {
        return false
    }

    // 2. wall
    const char = maze[y][x]
    if (char === wall) {
        return false
    }

    // 3. end
    if (x === end.x && y === end.y) {
        path.push(curr)
        return true
    }

    // 4. already visited
    if (seen[y]?.[x]) {
        return false
    }

    seen[y][x] = true
    path.push(curr)
    for (let i = 0; i < dirs.length; i++) {
        const [dx, dy] = dirs[i]
        let next = { x: x + dx, y: y + dy }
        if (walk(maze, wall, next, end, seen, path)) {
            // exit on end
            return true
        }
    }

    path.pop()

    return false
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = []
    const seen: boolean[][] = []

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false))
    }

    walk(maze, wall, start, end, seen, path)

    return path
}
