import {multiply} from './math.js'

class Base {
    constructor(width, height, context) {
        // 顶点的三维坐标(x, y, z)
        this.points = [
            [ [ 50], [ 50], [-50] ],
            [ [-50], [ 50], [-50] ],
            [ [-50], [-50], [-50] ],
            [ [ 50], [-50], [-50] ],
            [ [ 50], [ 50], [ 50] ],
            [ [-50], [ 50], [ 50] ],
            [ [-50], [-50], [ 50] ],
            [ [ 50], [-50], [ 50] ],
        ]
        this.width = width
        this.height = height
        this.context = context
    }

    // 将 2 维坐标 [ [x] [y] ] 转换维 canvas 坐标 [x, y]
    // canvas x,y 坐标原点在左上角，这里等效于将坐标原点置中
    convert(point) {
        return [
            point[0][0] + this.width / 2,
            - point[1][0] + this.height / 2
        ]
    }

    // 将 3 维坐标 [x, y, z] 转换为 2 维坐标 [ [x] [y] ]
    pat(point) {
        let pat = [
            [1, 0, 0],
            [0, 1, 0],
            // [0, 0, 1]
        ]
        // 2x3  3x1 = 2x1  
        return this.convert(multiply(pat, point))
    }

    transform(matrix) {
        for (let p in this.points) {
            let point = this.points[p]
            this.points[p] = multiply(matrix, point)
        }
    }

    rotateX(angleX) {
        const fx = [
            [1, 0, 0],
            [0, Math.cos(angleX), Math.sin(angleX)],
            [0, -Math.sin(angleX), Math.cos(angleX)],
        ]
        this.transform(fx)
    }

    rotateY(angleY) {
        const fy = [
            [Math.cos(angleY), 0, -Math.sin(angleY)],
            [0, 1, 0],
            [Math.sin(angleY), 0, Math.cos(angleY)],
        ]
        this.transform(fy)
    }

    rotateZ(angleZ) {
        const fz = [
            [Math.cos(angleZ), Math.sin(angleZ), 0],
            [-Math.sin(angleZ), Math.cos(angleZ), 0],
            [0, 0, 1],
        ]
        this.transform(fz)
    }

    // 在 x, y 坐标画点
    point(x, y, color='red') {
        this.context.fillStyle = color
        this.context.fillRect(x, y, 6, 6)
    }

    // 在第 a 个顶点到 b 个顶点之间画线
    line(a, b, color='blue') {
        let pa = this.points[a]
        let [pax, pay] = this.pat(pa)

        let pb = this.points[b]
        let [pbx, pby] = this.pat(pb)

        this._line(pax, pay, pbx, pby, color)
    }

    _line(x1, y1, x2, y2, color='blue') {
        this.context.beginPath()
        this.context.strokeStyle = color
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
    }

    draw() {
        // draw every point
        for (let point of this.points) {
            let [x, y] = this.pat(point)
            // console.log(`x: ${x}, y: ${y}`)
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

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
}

export default Base
