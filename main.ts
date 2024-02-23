namespace SpriteKind {
    export const stationary = SpriteKind.create()
}
function gear_ratios (gears: number, speed: number, spawning: boolean) {
    if (gears == 1 && speed < 46) {
        acceleration = 17.5
    } else if (gears == 2 && speed < 80) {
        acceleration = 10
    } else if (gears == 3 && speed < 114) {
        acceleration = 7
    } else if (gears == 4 && speed < 160) {
        acceleration = 5
    } else if (gears == 1 && speed > 46) {
        driver_speed = 46
        acceleration = 0
    } else if (gears == 2 && speed > 80) {
        driver_speed = 80
        acceleration = 0
    } else if (gears == 3 && speed > 114) {
        driver_speed = 114
        acceleration = 0
    } else if (gears == 4 && speed > 160) {
        driver_speed = 160
        acceleration = 0
    }
    if (spawning) {
        if (driver_speed > 114) {
            for (let index = 0; index < 2; index++) {
                obstacle = sprites.create(list._pickRandom(), SpriteKind.Enemy)
                if (Math.percentChance(50)) {
                    obstacle.setPosition(160, 95)
                } else {
                    obstacle.setPosition(161, 110)
                }
                obstacle.setVelocity(-1 * driver_speed, 0)
                pause(200)
            }
        } else {
            obstacle = sprites.create(list._pickRandom(), SpriteKind.Enemy)
            if (Math.percentChance(50)) {
                obstacle.setPosition(160, 94)
            } else {
                obstacle.setPosition(160, 111)
            }
            obstacle.setVelocity(-1 * driver_speed, 0)
        }
    }
    return acceleration
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gear > 1) {
        gear = gear - 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gear < 4) {
        gear = gear + 1
    }
})
let speed_display: TextSprite = null
let acceleration = 0
let driver_speed = 0
let gear = 0
let obstacle: Sprite = null
let list: Image[] = []
let pixel_distance = 0
let obstacles: number[] = []
list.push(img`
    . . . . . . . . . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . . 6 9 6 6 6 6 6 6 c 6 . . . 
    . . 6 c 9 6 6 6 6 6 6 c c 6 . . 
    . 6 c c 9 9 9 9 9 9 6 c c 9 6 d 
    . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6 
    . 6 6 8 b b 8 b b b 8 8 b 9 6 6 
    . 6 8 b b b 8 b b b b 8 6 6 6 6 
    . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6 
    . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d 
    . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d 
    . 8 8 8 8 8 8 f f f 8 8 8 8 8 8 
    . 8 f f f f 8 8 8 8 f f f 8 8 8 
    . . f f f f f 8 8 f f f f f 8 . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `)
list.push(img`
    ...cccccccccccccccccc...
    ..cbddddddddddddddddbc..
    .cddddddddddddddddddddc.
    .cddbbbbbbbbbbbbbbbbddc.
    .cdbbbbbbbbbbbbbbbbbbdc.
    .cdbbbbbbbbbbbbbbbbbbdc.
    cbbbccccccccccccccccbbbc
    cddcbddddddddddddddbcddc
    cddcddddddddddddddddcddc
    cddcddddddddddddddddcddc
    cddcddddddddddddddddcddc
    cbdcddddddddddddddddcdbc
    ccbbbbbbbbbbbbbbbbbbbbcc
    ccbbbbbbbbbbbbbbbbbbbbcc
    cccccccccccccccccccccccc
    ..cbbc............cbbc..
    `)
list.push(img`
    . . 4 4 4 . . . . 4 4 4 . . . . 
    . 4 5 5 5 e . . e 5 5 5 4 . . . 
    4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
    4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
    e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
    . e e 5 5 5 5 5 5 5 5 e e . . . 
    . . e 5 f 5 5 5 5 f 5 e . . . . 
    . . f 5 5 5 4 4 5 5 5 f . . f f 
    . . f 4 5 5 f f 5 5 6 f . f 5 f 
    . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
    . . . f 4 5 5 5 5 5 5 4 4 5 f . 
    . . . f 5 5 5 5 5 4 5 5 f f . . 
    . . . f 5 f f f 5 f f 5 f . . . 
    . . . f f . . f f . . f f . . . 
    `)
obstacle = sprites.create(list._pickRandom(), SpriteKind.Enemy)
sprites.destroy(obstacle)
gear = 1
let gear_display = textsprite.create(convertToText(gear))
gear_display.setPosition(10, 100)
driver_speed = 0
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`sky`)
scroller.setLayerImage(scroller.BackgroundLayer.Layer1, img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ......................................................................................................................fffffff...................................
    ..............................................................................fffffffffff.........................ffffffffffffffff..............................
    .........................................................................ffffffffffffffffffff................fffffffffffffffffffffffff..........................
    .......................................................................fffffffffffffffffffffffff...........ffffffffffffffffffffffffffffff.......................
    .....................................................................ffffffff11111111111fffffffff........ffffffffffff11111111111fffffffffff.....................
    ...................................................................fffffff111111111111111111ffffff.....ffffffffff111111111111111111ffffffff.....................
    ...................................................................ffffff1111111111111111111111fff....ffffff11111111111111111111111111fffffff...................
    ..................................................................ffffff111111111111111111111111fff...fff1111111111111111111111111111111ffffff..................
    .................................................................ffffff1111111111111111111111111fff..fff1111111111111111111111111111111111ffffff................
    ..............................................ffffffffff........fffff111111111111111111111111111ffffffff11111111111111111111111111111111111ffffff...............
    ..........................................fffffffffffffffff.....ffff11111111111111111111111111111ffffff11111111111111111111111111111111111111ffff...............
    .......................................fffffffff11111ffffffff..fffff11111111111111111111111111111ffffff11111111111111111111111111111111111111fffff..............
    .....................................ffffffff1111111111ffffffffffff1111111111111111111111111111111ffff1111111111111111111111111111111111111111ffff..............
    ....................................fffff1111111111111111fffffffff11111111111111111111111111111111ffff11111111111111111111111111111111111111111fff..............
    ..................................fffff11111111111111111111fffffff111111111111111111111111111111111ff111111111111111111111111111111111111111111ffff.............
    ................................ffffff1111111111111111111111fffff1111111111111111111111111111111111ff111111111111111111111111111111111111111111ffff.............
    ...............................fffff111111111111111111111111fffff1111111111111111111111111111111111111111111111111111111111111111111111111111111fff.............
    ..............................fffff11111111111111111111111111fff11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff............
    .............................fffff111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fff............
    ............................fffff1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fff............
    ............................ffff11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ffff.ffff......
    ..........................ffffffffffffffffff111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ffffffffff....
    .....................fffffffffffffffffffffffffff1111111111111111111111111111111111111111111111111111111111111111111ffffffff11111111111111111111111ffffffffffff..
    .................fffffffffffffffffffffffffffffffff11111111111111111111111111111111111111111111111111111111111111ffffffffffffff11111111111111111111ffff111ffffff.
    ..............fffffffffffffff1111111111111ffffffffff111111111111111111111111111111111111111111111111111111111ffffffffffffffffffff11111111111111111ffff11111ffff.
    ...........fffffffffffff111111111111111111111fffffffff11111111111111111111111111111111111111111111111111111ffffffff1111111fffffffff1111111111111111ff11111111fff
    .........fffffffffff111111111111111111111111111ffffffff11111111111111111111111111111111111111111111111111ffffff1111111111111fffffffff11111111111111ff11111111fff
    .......ffffffffff111111111111111111111111111111111ffffff111111111111111111111111111111111111111111111111fffff1111111111111111111fffffff111111111111ff111111111ff
    .....fffffffff11111111111111111111111111111111111111ffff111111111111111111111111111111111111111111111111fff111111111111111111111111fffff111111111111f1111111111f
    ...fffffffff11111111111111111111111111111111111111111ffff11111111111111111111111111111111111111111111111ff111111111111111111111111111ffff11111111111f1111111111f
    ..ffffffff111111111111111111111111111111111111111111111fff1111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111f1111111111f
    ..ffffff11111111111111111111111111111111111111111111111fff11111111111111111111111111111111111111111111111111111111111111111111111111111ffff111111111111111111111
    .fffff11111111111111111111111111111111111111111111111111ff111111111111111111111111111111111111111111111111111111111111111111111111111111fff111111111111111111111
    fffff1111111111111111111111111111111111111111111111111111f1111111111111111111111111111111111111111111111111111111111111111111111111111111fff11111111111111111111
    ffff1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fff11111111111111111111
    ffff11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fff1111111111111111111
    fff111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fff1111111111111111111
    fff1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ff1111111111111111111
    fff1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ff1111111111111111111
    ff111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111f1111111111111111111
    ff11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `)
scroller.setLayerImage(scroller.BackgroundLayer.Layer2, img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...........................................f.................................................................f..................................................
    ..........................................f1f...............................................................f2f.................................................
    .........................................f111ff............................................................f222ff...............................................
    .........................................f11111fffff.......................................................f22222fffff..........................................
    .........................................f1111111111ff.....................................................f2222222222ff........................................
    .........................................f111111111111f....................................................f222222222222f.......................................
    .........................................f1111111111111f...................................................f2222222222222f......................................
    .........................................f1111111111111f...................................................f2222222222222f......................................
    ..........................................f111111111111f....................................................f222222222222f......................................
    ..........................................fff1111111111f....................................................fff2222222222f......................................
    ..........................................fdff111111111f....................................................fdff222222222f......................................
    ..........................................fdf.ffff11111f....................................................fdf.ffff22222f......................................
    ..........................................fdf.....f1111f....................................................fdf.....f2222f......................................
    ..........................................fdf......ffff.....................................................fdf......ffff.......................................
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    fffffffffffffffffffffffffffffffffffffbbbbbfdfbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbfdfbbbbbffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddffbbbfdfbbbffdddddddddddddddddddddddddddddddddddddddddddddddddddddffbbbfdfbbbffdddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddfbbfdfbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbfdfbbfdddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddfbfdfbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbfdfbfddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddfbfdfbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbfdfbfddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddffdffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffdffdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbfbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbfbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    ffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfbbbfdddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbfffffffffffffffffffffffffffffffffffffffffffffffff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff555555555555555ffffff55555555555555555ffffff5555555555555555ffffff5555555555555555ffffff5555555555555555ffffff555555555555555ffffff55555555555555fffffff55555
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff555555555555555ffffff55555555555555555ffffff5555555555555555ffffff5555555555555555ffffff5555555555555555ffffff555555555555555ffffff55555555555555fffffff55555
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `)
let driver = sprites.create(assets.image`race car`, SpriteKind.Player)
driver.setPosition(80, 97)
controller.moveSprite(driver, 0, 80)
forever(function () {
    sprites.destroy(gear_display)
    gear_display = textsprite.create(convertToText(gear))
    gear_display.setPosition(10, 100)
    pause(100)
})
forever(function () {
    if (driver.y <= 92) {
        driver.setPosition(80, 93)
    } else if (driver.y >= 116) {
        driver.setPosition(80, 115)
    }
})
forever(function () {
    sprites.destroy(speed_display)
    speed_display = textsprite.create(convertToText(driver_speed))
    speed_display.setPosition(145, 100)
    pause(100)
})
forever(function () {
    if (controller.right.isPressed()) {
        pause(100)
        driver_speed = driver_speed + gear_ratios(gear, driver_speed, false)
    }
    if (controller.left.isPressed() && driver_speed > 0) {
        pause(100)
        driver_speed = driver_speed - 30
        if (driver_speed < 0) {
            driver_speed = 0
        }
    }
})
forever(function () {
    gear_ratios(gear, driver_speed, false)
    if (driver.overlapsWith(obstacle)) {
        game.gameOver(false)
    }
})
forever(function () {
    scroller.scrollBackgroundWithSpeed(-10 + (0 - driver_speed), 0, scroller.BackgroundLayer.Layer1)
    scroller.scrollBackgroundWithSpeed(0 - 3 * driver_speed, 0, scroller.BackgroundLayer.Layer2)
})
forever(function () {
    pause(100)
    pixel_distance = pixel_distance + driver_speed * 0.1
    info.setScore(pixel_distance)
})
forever(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    gear_ratios(gear, driver_speed, true)
    pause(3000)
})
