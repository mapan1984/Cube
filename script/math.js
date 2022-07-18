// 矩阵乘法
// 2x3  3x1  = 2x1
function multiply(matrixA, matrixB) {
    let rowA = matrixA.length
    let colA = matrixA[0].length
    let rowB = matrixB.length
    let colB = matrixB[0].length

    if (colA !== rowB) {
        throw new Error('Dimension does not match for operation:muitiply')
    }

    let result = new Array(rowA)
    for (let r = 0; r < rowA; r++) {
        result[r] = new Array(colB)
    }

    for (let r = 0; r < rowA; r++) {
        for (let c = 0; c < colB; c++) {
            result[r][c] = 0
            for (let i = 0; i < colA; i++) {
                result[r][c] += matrixA[r][i] * matrixB[i][c]
            }
        }
    }
    return result
}


function degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
}

export { multiply, degreesToRadians }

