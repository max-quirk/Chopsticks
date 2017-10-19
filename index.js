var x = 1
var L1 = 1
var R1 = 1
var L2 = 1
var R2 = 1
var original_R1 = 0
var original_L1 = 0
var turn = 'left'
var hit = new Audio('hit.mov')
var split = new Audio('split.mov')
var win = new Audio('win.mov')
var wrong = new Audio('wrong.mov')
var kill = new Audio('kill.mov')


function doFirst() {
    var one = document.getElementById('leftbox1');
    one.addEventListener("dragstart", startDrag_L1, false);
    leftbox1 = document.getElementById('leftbox1');
    leftbox1.addEventListener("dragenter", function (e) { e.preventDefault(); }, false);
    leftbox1.addEventListener("dragover", function (e) { e.preventDefault(); }, false);
    leftbox1.addEventListener("drop", dropped_L1, false);

    var two = document.getElementById('rightbox1');
    two.addEventListener("dragstart", startDrag_R1, false);
    rightbox1 = document.getElementById('rightbox1');
    rightbox1.addEventListener("dragenter", function (e) { e.preventDefault(); }, false);
    rightbox1.addEventListener("dragover", function (e) { e.preventDefault(); }, false);
    rightbox1.addEventListener("drop", dropped_R1, false);

    var three = document.getElementById('leftbox2');
    three.addEventListener("dragstart", startDrag_L2, false);
    leftbox2 = document.getElementById('leftbox2');
    leftbox2.addEventListener("dragenter", function (e) { e.preventDefault(); }, false);
    leftbox2.addEventListener("dragover", function (e) { e.preventDefault(); }, false);
    leftbox2.addEventListener("drop", dropped_L2, false);

    var four = document.getElementById('rightbox2');
    four.addEventListener("dragstart", startDrag_R2, false);
    rightbox2 = document.getElementById('rightbox2');
    rightbox2.addEventListener("dragenter", function (e) { e.preventDefault(); }, false);
    rightbox2.addEventListener("dragover", function (e) { e.preventDefault(); }, false);
    rightbox2.addEventListener("drop", dropped_R2, false);

    var button_left1 = document.getElementById('button_left1')
    button_left1.setAttribute('style', 'display:none;')
    var button_left2 = document.getElementById('button_left2')
    button_left2.setAttribute('style', 'display:none;')
    var done_left = document.getElementById('done_left')
    done_left.setAttribute('style', 'display:none;')
    var done_right = document.getElementById('done_right')
    done_right.setAttribute('style', 'display:none;')
    var button_right1 = document.getElementById('button_right1')
    button_right1.setAttribute('style', 'display:none;')
    var button_right2 = document.getElementById('button_right2')
    button_right2.setAttribute('style', 'display:none;')

    var leftTurn = document.getElementById('leftTurn')
    var rightTurn = document.getElementById('rightTurn')
    rightTurn.setAttribute('style', 'display:none;')
}

function startDrag_L1(e) {
    image = leftbox1.innerHTML
    from = 'L1'
    x = parseInt(image.charAt(9));
}

function startDrag_R1(e) {
    image = rightbox1.innerHTML
    from = 'R1'
    x = parseInt(image.charAt(9));
}

function startDrag_L2(e) {
    image = leftbox2.innerHTML
    from = 'L2'
    x = parseInt(image.charAt(9));
}

function startDrag_R2(e) {
    image = rightbox2.innerHTML
    from = 'R2'
    x = parseInt(image.charAt(9));
}

function dropped_L1(e) {
    e.preventDefault();
    console.log(turn)
    if (turn == 'right' && L1 !== 0 && x !== 0) {
        if (from === 'R2' || from === 'R1') {
            L1 += x
            if (L1 < 5) {
                hit.play()
            }
            if (L1 > 5) {
                L1 -= 5
                hit.play()
            }

            if (L1 == 5 && (L1 !== 0 || L2 !== 0)) {
                kill.play()
                L1 = 0
            }
            leftbox1.innerHTML = `<img id="${L1}_A" src="A${L1}.png">`;
            left_Turn()
        }
    }
    if (turn == 'left') {
        if (from === 'L2') {
            counter_left(e)
            original_L1 = L1
            split.play()
        }
    }

    console.log(L1)
    console.log(L2)
    if (L1 === 0 && L2 === 0) {
        console.log('right wins')
        rightWin()
        win.play()
    }
}

function dropped_R1(e) {
    e.preventDefault();
    console.log(turn)
    if (turn == 'left' && R1 !== 0 && x !== 0) {
        if (from === 'L2' || from === 'L1') {
            R1 += x
            if (R1 < 5) {
                hit.play()
            }
            if (R1 > 5) {
                R1 -= 5
                hit.play()
            }
            if (R1 == 5 && (R1 !== 0 || R2 !== 0)) {
                kill.play()
                R1 = 0
            }
            rightbox1.innerHTML = `<img id="${R1}_B" align = "right" src="B${R1}.png">`;
            right_Turn()
        }
    }
    if (turn == 'right') {
        if (from === 'R2') {
            console.log('COUNTER POPUP')
            split.play()
            counter_right(e)
            original_R1 = R1
        }
    }

    console.log(R1)
    console.log(R2)
    if (R1 == 0 && R2 == 0) {
        console.log('left wins')
        leftWin()
        win.play()
    }
}


function dropped_L2(e) {
    e.preventDefault();
    console.log(turn)

    if (turn == 'right' && L2 !== 0 && x !== 0) {
        if (from === 'R2' || from === 'R1') {
            L2 += x
            if (L2 < 5) {
                hit.play()
            }
            if (L2 > 5) {
                L2 -= 5
                hit.play()
            }
            if (L2 == 5 && (L1 !== 0 || L2 !== 0)) {
                kill.play()
                L2 = 0
            }
            leftbox2.innerHTML = `<img id="${L2}_C" src="C${L2}.png">`;
            left_Turn()
        }
    }

    if (turn == 'left') {
        if (from === 'L1') {
            split.play()
            counter_left(e)
            original_L1 = L1
        }
    }

    console.log(L1)
    console.log(L2)
    if (L1 == 0 && L2 == 0) {
        console.log('right wins')
        win.play()
        rightWin()
    }
}

function dropped_R2(e) {
    e.preventDefault();
    console.log(turn)
    if (turn == 'left' && R2 !== 0 && x !== 0) {
        if (from === 'L2' || from === 'L1') {
            R2 += x
            if (R2 < 5) {
                hit.play()
            }
            if (R2 > 5) {
                R2 -= 5
                hit.play()
            }
            if (R2 == 5 && (R1 !== 0 || R2 !== 0)) {
                R2 = 0
                kill.play()
            }
            rightbox2.innerHTML = `<img id="${R2}_D" align = "right" src="D${R2}.png">`;
            right_Turn()
        }
    }

    if (turn == 'right') {
        if (from === 'R1') {
            split.play()
            counter_right(e)
            original_R1 = R1
        }
    }

    console.log(R1)
    console.log(R2)
    if (R1 == 0 && R2 == 0) {
        console.log('left wins')
        win.play()
        leftWin()
    }
}

function counter_right(e) {
    button_right1.setAttribute('style', 'display:auto;')
    button_right2.setAttribute('style', 'display:auto;')
    done_right.setAttribute('style', 'display:auto;')
}

function counter_left(e) {
    button_left1.setAttribute('style', 'display:auto;')
    button_left2.setAttribute('style', 'display:auto;')
    done_left.setAttribute('style', 'display:auto;')
}

function up_left() {
    if (L1 >= 0 && L1 < 4 && L2 > 0 && L2 <= 4) {
        L1 += 1
        L2 -= 1
    }
    leftbox1.innerHTML = `<img id="${L1}" src="A${L1}.png">`
    leftbox2.innerHTML = `<img id="${L2}" src="C${L2}.png">`
}

function down_left() {
    if (L1 > 0 && L1 <= 4 && L2 >= 0 && L2 < 4) {
        L1 -= 1
        L2 += 1
    }
    leftbox1.innerHTML = `<img id="${L1}" src="A${L1}.png">`
    leftbox2.innerHTML = `<img id="${L2}" src="C${L2}.png">`
}

function up_right() {
    if (R1 >= 0 && R1 < 4 && R2 > 0 && R2 <= 4) {
        R1 += 1
        R2 -= 1
    }
    rightbox1.innerHTML = `<img id="${R1}" align=right src="B${R1}.png">`
    rightbox2.innerHTML = `<img id="${R2}" align=right  src="D${R2}.png">`
}

function down_right() {
    if (R1 > 0 && R1 <= 4 && R2 >= 0 && R2 < 4) {
        R1 -= 1
        R2 += 1
    }
    rightbox1.innerHTML = `<img id="${R1}" align=right src="B${R1}.png">`
    rightbox2.innerHTML = `<img id="${R2}" align=right src="D${R2}.png">`
}

function done_Left() {
    button_left1.setAttribute('style', 'display:none;')
    done_left.setAttribute('style', 'display:none;')
    button_left2.setAttribute('style', 'display:none;')


    if (original_L1 !== L1 && original_L1 !== L2) {
        hit.play()
        right_Turn()
    }

    if (original_L1 == L1 || original_L1 == L2) {
        wrong.play()
    }
}

function done_Right() {
    button_right1.setAttribute('style', 'display:none;')
    done_right.setAttribute('style', 'display:none;')
    button_right2.setAttribute('style', 'display:none;')

    if (original_R1 !== R1 && original_R1 !== R2) {
        hit.play()
        left_Turn()
    }

    if (original_R1 == R1 || original_R1 == R2) {
        wrong.play()
    }
}

function left_Turn() {
    turn = 'left'
    console.log(turn)
    rightTurn.setAttribute('style', 'color:white;')
    leftTurn.setAttribute('style', 'display:initial;')
}

function right_Turn() {
    turn = 'right'
    console.log(turn)
    leftTurn.setAttribute('style', 'color:white;')
    rightTurn.setAttribute('style', 'display:initial;')
}

function leftWin() {
    setTimeout(() => {
        window.location.href = "leftWin.html";
    }, 1500)
}

function rightWin() {
    setTimeout(() => {
        window.location.href = "rightWin.html";
    }, 1500)
}

window.addEventListener("load", doFirst, false);