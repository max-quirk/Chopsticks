var x = 1
var L1 = 1
var R1 = 1
var L2 = 1
var R2 = 1
var original_R1 = 0
var original_L1 = 0
var turn = 'left'
var time
var hit = new Audio('hit.mov')
var split = new Audio('split.mov')
var win = new Audio('win.mov')
var wrong = new Audio('wrong.mov')
var fail = new Audio('fail.mov')
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

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
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
    }
}

function dropped_R1(e) {
    e.preventDefault();
    console.log('running R1')
    if (turn == 'left' && R1 !== 0 && x !== 0) {
        if (from === 'L2' || from === 'L1') {
            R1 += x
            if (R1 >= 5) {
                R1 = 0
            }
            if (R1 < 5 && R1 !== 0) {
                hit.play()
            }
            if (R1 == 0) {
                kill.play()
            }
            console.log(R1)
            rightbox1.innerHTML = `<img id="${R1}_B" align = "right" src="B${R1}.png">`;
            right_Turn()
        }
    }

    console.log(R1)
    console.log(R2)
    if (R1 == 0 && R2 == 0) {
        console.log('left wins')
        leftWin()
    }
}

function dropped_L2(e) {
    e.preventDefault();
    console.log(turn)

    if (turn == 'left') {
        if (from === 'L1') {
            counter_left(e)
            split.play()
            original_L1 = L1
        }
    }

    console.log(L1)
    console.log(L2)
    if (L1 == 0 && L2 == 0) {
        console.log('right wins')
        rightWin()
    }
}

function dropped_R2(e) {
    e.preventDefault();
    console.log(turn)
    if (turn == 'left' && R2 !== 0 && x !== 0) {
        if (from === 'L2' || from === 'L1') {
            R2 += x
            if (R2 >= 5) {
                R2 = 0
            }
            if (R2 < 5 && R2 !== 0) {
                hit.play()
            }
            if (R2 == 0) {
                kill.play()
            }
            rightbox2.innerHTML = `<img id="${R2}_D" align = "right" src="D${R2}.png">`;
            right_Turn()
        }
    }

    console.log(R1)
    console.log(R2)
    if (R1 == 0 && R2 == 0) {
        console.log('left wins')
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
    console.log('running upleft')
    console.log(L1)
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
    if (R1 >= 0 && R1 < 4 && R2 > 0 && R2 < 4) {
        R1 += 1
        R2 -= 1
    }
    rightbox1.innerHTML = `<img id="${R1}" align=right src="B${R1}.png">`
    rightbox2.innerHTML = `<img id="${R2}" align=right  src="D${R2}.png">`
}

function down_right() {
    if (R1 > 0 && R1 < 6 && R2 >= 0 && R2 < 6) {
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
        right_Turn()
        hit.play()
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
        left_Turn()
        hit.play()
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
    update()
    console.log(rightbox1.innerHTML)
    turn = 'right'
    console.log(turn)
    leftTurn.setAttribute('style', 'color:white;')
    rightTurn.setAttribute('style', 'display:initial;')
    console.log('HIDDEN')
    time = setTimeout(compute, 1000)
}

function update() {
    rightbox1.innerHTML = `<img id="${R1}_B" align = right src="B${R1}.png">`;
    rightbox2.innerHTML = `<img id="${R2}_D" align = right src="D${R2}.png">`;
    leftbox1.innerHTML = `<img id="${L1}_A" src="A${L1}.png">`;
    leftbox2.innerHTML = `<img id="${L2}_C" src="C${L2}.png">`;
}

function compute() {
    console.log('computing')

    //SPLITS LINE:Splits straight away (2,0) vs (1,1)
    if ((L1 == 0 && L2 == 2 || L1 == 2 && L2 == 0) && (R1 == 1 && R2 == 1 || R1 == 1 && R2 == 1) && turn == 'right') {
        if (L1 == 2) {
            L1 = 3
        }
        if (L2 == 2) {
            L2 = 3
        }
        hit.play()
        update()
        left_Turn()
    }

    //SPLITS LINE:Hits with 3 hand: (3,0) vs (4,1)
    if ((L1 == 0 && L2 == 3 || L1 == 3 && L2 == 0) && (R1 == 4 && R2 == 1 || R1 == 1 && R2 == 4) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //SPLITS LINE: Hits either hand with 3: (2,1) vs (4,0)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 4 && R2 == 0 || R1 == 0 && R2 == 4) && turn == 'right') {
        R1 = 2
        R2 = 2
        update()
        split.play()
        left_Turn()
    }

    //SPLITS LINE: Splits from (3,0) to (2,1): (2,1) vs (1,1)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 1 && R2 == 1 || R1 == 1 && R2 == 1) && turn == 'right') {
        R1 = 2
        R2 = 0
        update()
        split.play()
        left_Turn()
    }

    //SPLITS LINE: Splits from (3,0) to (2,1): (2,1) vs (1,1)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 1 && R2 == 1 || R1 == 1 && R2 == 1) && turn == 'right') {
        R1 = 2
        R2 = 0
        update()
        split.play()
        left_Turn()
    }

    //SPLITS LINE: Splits to (3,0) from (2,1): (3,0) vs (2,2)
    if ((L1 == 3 && L2 == 0 || L1 == 0 && L2 == 3) && (R1 == 2 && R2 == 2 || R1 == 2 && R2 == 2) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //SPLITS LINE: Hits your 2 hand with 1: (2,1) vs (3,0)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //SPLITS LINE: Hits your 2 hand with 2: (2,1) vs (4,0)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 4 && R2 == 0 || R1 == 0 && R2 == 4) && turn == 'right') {
        R1 = 2
        R2 = 2
        update()
        split.play()
        left_Turn()
    }

    //SPLITS LINE: Hits either hand with 2: (2,1) vs (4,2)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 4 && R2 == 2 || R1 == 2 && R2 == 4) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //Hits either: (1,1) (2,1)
    if ((L1 == 1 && L2 == 1 && R1 == 2 && R2 == 1) || (L1 == 1 && L2 == 1 && R1 == 1 && R2 == 2) && turn == 'right') {
        R1 = 3
        R2 = 0
        update()
        split.play()
        left_Turn()
    }

    //Splits (2,0) vs (3,0)
    if ((L1 == 0 && L2 == 2 || L1 == 2 && L2 == 0) && (R1 == 0 && R2 == 3 || R1 == 3 && R2 == 0) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //Hits 3: (1,1) (4,0)
    if (L1 == 1 && L2 == 1 && R1 == 4 && R2 == 0 && turn == 'right') {
        R1 = 3
        R2 = 1
        update()
        split.play()
        left_Turn()
    }

    //Splits (2,0) vs (3,1)
    if ((L1 == 0 && L2 == 2 || L1 == 2 && L2 == 0) && (R1 == 1 && R2 == 3 || R1 == 3 && R2 == 1) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }
    //Splits (2,0) vs (3,2)
    if ((L1 == 0 && L2 == 2 || L1 == 2 && L2 == 0) && (R1 == 2 && R2 == 3 || R1 == 3 && R2 == 2) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }
    //FORK 1: HITS 3 INSTEAD OF 1

    //Hits 3: (1,1) (4,1)
    if (L1 == 1 && L2 == 1 && R1 == 4 && R2 == 1 && turn == 'right') {
        R1 = 3
        R2 = 2
        update()
        split.play()
        left_Turn()
    }
    //FORK 2: HITS 3 instead of 2
    //Hits 3: (1,1) (4,2)
    if (L1 == 1 && L2 == 1 && R1 == 4 && R2 == 2 && turn == 'right') {
        console.log('R2=')
        console.log(R2)
        L1 = 0
        update()
        kill.play()
        left_Turn()
    }
    //FORK 3: HITS 4 instead of 2
    //Hits 4: (0,1) (0,2)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && (R1 == 0 && R2 == 2 || R1 == 2 && R2 == 0) && turn == 'right') {
        R1 = 1
        R2 = 1
        update()
        split.play()
        left_Turn()
    }
    //hits either
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && (R1 == 2 && R2 == 1 || R1 == 1 && R2 == 2) && turn == 'right') {
        R1 = 3
        R2 = 0
        update()
        split.play()
        left_Turn()
    }
    //hits 3
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && (R1 == 4 && R2 == 0) && turn == 'right') {
        L1 = 0
        update()
        fail.play()
        rightWin()
    }

    //FORK 3: HITS 2 INSTEAD OF 4
    //hits 2 (0,1) (4,3)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn == 'right') {
        L2 = 0
        update()
        fail.play()
        rightWin()
    }

    //FORK 2: HITS 2 instead of 3
    //Hits 2 (1,1) (3,3)
    if (L1 == 1 && L2 == 1 && R1 == 3 && R2 == 3) {
        L1 = 4
        update()
        hit.play()
        left_Turn()
    }

    //FORK 2.1: Splits (3,2) instead of killing a 3 with the 4 or the 1
    //Splits from (4,1) to (3,2)  vs   (3,3)
    if ((L1 == 3 && L2 == 2 || L1 == 2 && L2 == 3) && (R1 == 3 && R2 == 3 || R1 == 3 && R2 == 3) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //hits your 3 with their 3 (3,0) (3,0)
    if ((L1 == 3 && L2 == 0 || L1 == 0 && L2 == 3) && (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //split from (3,0) to (2,1) vs (3,3)
    if ((L1 == 1 && L2 == 2 || L1 == 2 && L2 == 1) && (R1 == 3 && R2 == 3 || R1 == 3 && R2 == 3) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //hits either hand with 1 (0,1) vs (4,3)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK 2.2: hits with 1 instead of splitting or hitting with 4
    //hits either hand with their 1
    if ((L1 == 4 && L2 == 1 || L1 == 1 && L2 == 4) && ((R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) || (R1 == 3 && R2 == 4 || R1 == 4 && R2 == 3)) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }
    //FORK 3.3: Hit with 4 (4,0) (3,0 or 4,0), split (3,1), split (2,2)
    //hits either of your hands with his 4 (4,0) vs (3,4)
    if ((L1 == 0 && L2 == 4 || L1 == 4 && L2 == 0) && ((R1 == 4 && R2 == 0 || R1 == 0 && R2 == 4) || (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3)) && turn == 'right') {
        if (L1 == 4) {
            L1 = 0
        }
        if (L2 == 4) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //split (3,1):  (3,1) vs (4,3)
    if ((L1 == 1 && L2 == 3 || L1 == 3 && L2 == 1) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //split (3,1) continued --> he kills either hand: (3,0) vs (4,0 or 3,0)
    if ((L1 == 0 && L2 == 3 || L1 == 3 && L2 == 0) && ((R1 == 4 && R2 == 0 || R1 == 0 && R2 == 4) || (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3)) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //split (2,2):  (3,1)  vs (4,3)
    if ((L1 == 2 && L2 == 2 || L1 == 2 && L2 == 2) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn == 'right') {
        L1 = 0
        update()
        kill.play()
        left_Turn()
    }

    //split (2,2) continued --> he kills either hand: (2,0) vs (4,0 or 3,0)
    if ((L1 == 0 && L2 == 2 || L1 == 2 && L2 == 0) && ((R1 == 4 && R2 == 0 || R1 == 0 && R2 == 4) || (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3)) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //split (2,2) continued --> he splits into (1,1): (1,1) vs (4,3)
    if ((L1 == 1 && L2 == 1) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4)) {
        console.log('running function')
        L1 = 1
        L2 = 0
        update()
        kill.play()
        left_Turn()
    }

    //split (2,2) continued-- he splits (1,1) --> he hits 3 hand: (0,1) vs (4,4)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 4 || R1 == 4 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //split (2,2) continued-- he splits (1,1) --> he kills 4 hand: (0,1) vs (0,3)
    //THIS IS (1,0) VS (3,0) ...1
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 0 && R2 == 3 || R1 == 3 && R2 == 0) && turn == 'right') {
        console.log('run (1,0) vs (3,0)')
        R1 = 2
        R2 = 1
        update()
        split.play()
        left_Turn()
    }

    //FORK ...1: Hit your 2 hand instead of 1: (1,0) vs (3,1)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 1 && R2 == 3 || R1 == 3 && R2 == 1) && turn == 'right') {
        R1 = 2
        R2 = 2
        update()
        split.play()
        left_Turn()
    }

    //FORK ...1 continued: Hits either (3) hand: (1,0) vs (3,2)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 2 && R2 == 3 || R1 == 3 && R2 == 2) && turn == 'right') {
        //hit them with your (2) hand
        if (L1 == 1) {
            L1 = 3
        }
        if (L2 == 1) {
            L2 = 3
        }
        update()
        hit.play()
        left_Turn()
    }

    //FORK ...1 continued: They kill either (3 or 2) hand: (3,0) vs (0,2 or 0,3)
    if ((L1 == 3 && L2 == 0 || L1 == 0 && L2 == 3) && ((R1 == 2 && R2 == 0 || R1 == 0 && R2 == 2) || (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3)) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...1 continued: Split from (3,0) to (2,1): (3,0) vs (3,2)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 2 && R2 == 3 || R1 == 3 && R2 == 2) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK ...1 continued: They tap your 3 hand with their 1: (1,0) vs (4,2)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 2 || R1 == 2 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...1 continued: They tap your 2 hand with their 1: (1,0) vs (3,3)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 3 && R2 == 3 || R1 == 3 && R2 == 3) && turn == 'right') {
        R1 = 4
        R2 = 2
        update()
        split.play()
        left_Turn()
    }

    //FORK ...1 continued: They tap your 3 hand with their 1: (1,0) vs (4,3)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...1 continued: They tap your 4 hand with their 1: (1,0) vs (2,0)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 2 && R2 == 0 || R1 == 0 && R2 == 2) && turn == 'right') {
        R1 = 1
        R2 = 1
        update()
        split.play()
        left_Turn()
    }

    //FORK ...2: Hit your 1 hand instead of 2: (1,0) vs (2,2)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 2 && R2 == 2 || R1 == 2 && R2 == 2) && turn == 'right') {
        R1 = 3
        R2 = 1
        update()
        split.play()
        left_Turn()
    }

    //FORK ...2 continued: Hits 3 hand: (1,0) vs (4,1)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 1 || R1 == 1 && R2 == 4) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...2 continued: Hit your 1 hand instead of 3: (1,0) vs (3,2)
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 3 && R2 == 2 || R1 == 2 && R2 == 3) && turn == 'right') {
        if (L1 == 1) {
            L1 = 3
        }
        if (L2 == 1) {
            L2 = 3
        }
        update()
        hit.play()
        left_Turn()
    }

    //FORK ...2 continued: Kills either hand with their 3: (3,0) vs (3,0 or 2,0)
    if ((L1 == 3 && L2 == 0 || L1 == 0 && L2 == 3) && ((R1 == 2 && R2 == 0 || R1 == 0 && R2 == 2) || (R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3)) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...2 continued: Splits from (3,0) to (2,1): (3,0) vs (3,2)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && ((R1 == 2 && R2 == 0) || (R1 == 0 && R2 == 2)) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK ...2 continued: Hits 3 hand with one: (1,0) vs (4,2)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && ((R1 == 4 && R2 == 2) || (R1 == 2 && R2 == 4)) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...2 continued: Hits 2 hand with one: (1,0) vs (3,3)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && ((R1 == 3 && R2 == 3) || (R1 == 3 && R2 == 3)) && turn == 'right') {
        R1 = 4
        R2 = 2
        update()
        split.play()
        left_Turn()
    }

    //FORK ...2 continued: Hits 2 hand with one: (1,0) vs (4,3)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && ((R1 == 4 && R2 == 3) || (R1 == 3 && R2 == 4)) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK ...2 continued: Hits 4 hand with one: (1,0) vs (0,2)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && ((R1 == 0 && R2 == 2) || (R1 == 2 && R2 == 0)) && turn == 'right') {
        R1 = 1
        R2 = 1
        update()
        split.play()
        left_Turn()
    }

    //hits either hand with 4
    if ((L1 == 1 && L2 == 0 || L1 == 0 && L2 == 1) && (R1 == 4 && R2 == 3 || R1 == 3 && R2 == 4) && turn !== 'left') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK 2.3: Hits either with 4
    //hits either hand with 4
    if ((L1 == 4 && L2 == 1 || L1 == 1 && L2 == 4) && (R1 == 0 && R2 == 3 || R1 == 3 && R2 == 0) && turn == 'right') {
        if (L1 == 4) {
            L1 = 0
        }
        if (L2 == 4) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //hits your 3 with his 1 (0,1) vs (4,0)
    if ((L1 == 0 && L2 == 1 || L1 == 1 && L2 == 0) && (R1 == 0 && R2 == 4 || R1 == 4 && R2 == 0) && turn == 'right') {
        if (L1 == 1) {
            L1 = 0
        }
        if (L2 == 1) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }



    //FIRST BIG FORK
    //hits 1 instead of 3 (1,1) vs (3,2)
    if ((L1 == 1 && L2 == 1 || L1 == 1 && L2 == 1) && (R1 == 3 && R2 == 2 || R1 == 2 && R2 == 3) && turn == 'right') {
        L1 = 4
        update()
        hit.play()
        left_Turn()
    }
    //FORK 1: splits from (4,1) to (3,2): (3,2) vs (3,2)
    if ((L1 == 3 && L2 == 2 || L1 == 2 && L2 == 3) && (R1 == 3 && R2 == 2 || R1 == 2 && R2 == 3) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK 1: hits either hand with 3: (3,0) vs (3,0 or 2,0)
    if ((L1 == 3 && L2 == 0 || L1 == 0 && L2 == 3) && ((R1 == 3 && R2 == 0 || R1 == 0 && R2 == 3) || (R1 == 0 && R2 == 2 || R1 == 2 && R2 == 0)) && turn == 'right') {
        if (L1 == 3) {
            L1 = 0
        }
        if (L2 == 3) {
            L2 = 0
        }
        update()
        fail.play()
        rightWin()
    }

    //FORK 1: splits from (3,0) to (2,1): (2,1)  vs (3,2)
    if ((L1 == 2 && L2 == 1 || L1 == 1 && L2 == 2) && (R1 == 3 && R2 == 2 || R1 == 2 && R2 == 3) && turn == 'right') {
        if (L1 == 2) {
            L1 = 0
        }
        if (L2 == 2) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK 2: hits 3 with 1: (4,1) vs (4,2)
    if ((L1 == 4 && L2 == 1 || L1 == 1 && L2 == 4) && (R1 == 4 && R2 == 2 || R1 == 2 && R2 == 4) && turn == 'right') {
        if (L1 == 4) {
            L1 = 0
        }
        if (L2 == 4) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK 2: hits 2 with 1: (4,1) vs (3,3)
    if ((L1 == 4 && L2 == 1 || L1 == 1 && L2 == 4) && (R1 == 3 && R2 == 3 || R1 == 3 && R2 == 3) && turn == 'right') {
        if (L1 == 4) {
            L1 = 0
        }
        if (L2 == 4) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    //FORK 2: kills 3 or 2 with 4: (4,1) vs (0,3 or 0,2)
    if ((L1 == 4 && L2 == 1 || L1 == 1 && L2 == 4) && ((R1 == 0 && R2 == 3 || R1 == 3 && R2 == 0) || (R1 == 0 && R2 == 2 || R1 == 2 && R2 == 0)) && turn == 'right') {
        if (L1 == 4) {
            L1 = 0
        }
        if (L2 == 4) {
            L2 = 0
        }
        update()
        kill.play()
        left_Turn()
    }

    function leftWin() {
        window.location.href = "leftWin.html";
    }

    function rightWin() {
        setTimeout(() => {
            window.location.href = "comWin.html";
        }, 3200)
    }
}

window.addEventListener("load", doFirst, false);