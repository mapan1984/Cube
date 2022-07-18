import Base from './base.js'

class Cube extends Base {
    constructor(width, height, context) {
        super(width, height, context)
        // 立方体 8 个顶点的三维坐标(x, y, z)
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
            this.line(i, (i+1) % 4, 'blue')
            this.line(i, i+4, 'blue')
            let y = i + 4 + 1
            if (y == 8) {
                y = 4
            }
            this.line(i+4, y)
        }
    }
}

export default Cube
