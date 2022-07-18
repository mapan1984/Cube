import Cube from './cube.js'
import Axes from './axes.js'
import {degreesToRadians} from './math.js'

let width = 450
let height = 450
let canvas = document.querySelector('#map')
let context = canvas.getContext('2d')

let cube = new Cube(width, height, context)
let axes = new Axes(width, height, context)

let angleX = 0;
let angleY = 0;
let angleZ = 0;
let input = document.querySelector("#input")
// input.addEventListener("change", event => {
input.addEventListener("input", event => {
    let target = event.target

    let curAngleX = angleX;
    let curAngleY = angleY;
    let curAngleZ = angleZ;
    if (target.name == 'angleX') {
        curAngleX = degreesToRadians(target.value)
    } else if (target.name == 'angleY') {
        curAngleY = degreesToRadians(target.value)
    } else if (target.name == 'angleZ') {
        curAngleZ = degreesToRadians(target.value)
    } else {
        console.log('unkown input')
    }

    show(curAngleX - angleX, curAngleY - angleY, curAngleZ - angleZ)

    angleX = curAngleX
    angleY = curAngleY
    angleZ = curAngleZ
})


function show(angleX, angleY, angleZ) {
    axes.clean()
    axes.rotateX(angleX)
    axes.rotateY(angleY)
    axes.rotateZ(angleZ)
    axes.draw()

    // cube.clean()
    cube.rotateX(angleX)
    cube.rotateY(angleY)
    cube.rotateZ(angleZ)
    cube.draw()
}

show(0, 0, 0)
