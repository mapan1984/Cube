class Cube {
    constructor() {
        this.points = [
            // x, y, z
            [ [ 50], [ 50], [-50] ],
            [ [-50], [ 50], [-50] ],
            [ [-50], [-50], [-50] ],
            [ [ 50], [-50], [-50] ],
            [ [ 50], [ 50], [ 50] ],
            [ [-50], [ 50], [ 50] ],
            [ [-50], [-50], [ 50] ],
            [ [ 50], [-50], [ 50] ],
        ]
        this.width = 450
        this.height = 450
        this.context = document.querySelector('#map').getContext('2d')
        this.context.fillStyle = 'red'
    }

    draw() {
        // draw every point
        for (let point of this.points) {
            let [x, y] = this.pat(point)
            console.log(`x: ${x}, y: ${y}`)
            this.point(x, y)
        }

        // draw every line
        for (let i = 0; i < 4; i++) {
            this.line(i, (i+1) % 4)
            this.line(i, i+4)
            let y = i + 4 + 1
            if (y == 8) {
                y = 4
            }
            this.line(i+4, y)
        }
    }

    convert(point) {
        return [point[0][0] + this.width / 2, point[1][0] + this.height / 2]
    }

    point(x, y) {
        this.context.fillRect(x, y, 6, 6)
    }

    line(a, b) {
        let pa = this.points[a]
        let [pax, pay] = this.pat(pa)

        let pb = this.points[b]
        let [pbx, pby] = this.pat(pb)

        this.context.beginPath()
        this.context.strokeStyle = 'blue'
        this.context.moveTo(pax, pay)
        this.context.lineTo(pbx, pby)
        this.context.stroke()
    }

    pat(point) {
        let pat = [
            [1, 0, 0],
            [0, 1, 0],
            // [0, 0, 1]
        ]
        return this.convert(to(pat, point))
    }

    filpX() {
        for (let p in this.points) {
            let point = this.points[p]
            this.points[p] = to(fx, point)
        }
    }

    filpY() {
        for (let p in this.points) {
            let point = this.points[p]
            this.points[p] = to(fy, point)
        }
    }

    filpZ() {
        for (let p in this.points) {
            let point = this.points[p]
            this.points[p] = to(fz, point)
        }
    }

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
}


const angle = Math.PI / 6

const fx = [
    [1, 0, 0],
    [0, Math.cos(angle), Math.sin(angle)],
    [0, -Math.sin(angle), Math.cos(angle)],
]

const fy = [
    [Math.cos(angle), 0, -Math.sin(angle)],
    [0, 1, 0],
    [Math.sin(angle), 0, Math.cos(angle)],
]

const fz = [
    [Math.cos(angle), Math.sin(angle), 0],
    [-Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1],
]


// 2x3  3x1  = 2x1
function to(a, b) {
    let row = a.length
    let col = b[0].length

    let result = new Array(row)
    for (let r = 0; r < row; r++) {
        result[r] = new Array(col)
    }

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            result[r][c] = 0
            for (let i = 0; i < a[0].length; i++) {
                result[r][c] += a[r][i] * b[i][c]
            }
        }
    }
    return result
}

let cube = new Cube()

setInterval(() => {
    cube.clean()
    cube.draw()
    cube.filpX()
    cube.filpY()
    cube.filpZ()
}, 500)


