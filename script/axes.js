import Base from './base.js'

class Axes extends Base {
    constructor(width, height, context) {
        super(width, height, context)
        this.points = [
            [ [-500], [   0], [   0] ],
            [ [ 500], [   0], [   0] ],
            [ [   0], [-500], [   0] ],
            [ [   0], [ 500], [   0] ],
            [ [   0], [   0], [-500] ],
            [ [   0], [   0], [ 500] ],
        ]
    }

    draw() {
        // draw every line
        this.line(0, 1, 'coral')
        this.line(2, 3, 'green')
        this.line(4, 5, 'gold')
    }
}

export default Axes
