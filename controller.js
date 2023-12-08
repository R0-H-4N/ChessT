let board;
let white_turn = true, selected = false, moved = false;
let availablePlaces = [], cellsForHTML = [];
let cellsOnWork = [];
let clicked = '';
let deadBlack = [], deadWhite = [];

window.onload = function() {
    for(let i = 1; i <= 8; i++) {
        let s = 'b' + i;
        let p = document.getElementById(s);
        p.innerHTML = '<img src="Pieces/SenaW.png">';
        s = 'g' + i;
        p = document.getElementById(s);
        p.innerHTML = '<img src="Pieces/SenaB.png">';
    }
    document.getElementById('a1').innerHTML = '<img src="Pieces/HattiW.png">';
    document.getElementById('a2').innerHTML = '<img src="Pieces/GhodaW.png">';
    document.getElementById('a3').innerHTML = '<img src="Pieces/OotW.png">';
    document.getElementById('a4').innerHTML = '<img src="Pieces/RaniW.png">';
    document.getElementById('a5').innerHTML = '<img src="Pieces/RajaW.png">';
    document.getElementById('a6').innerHTML = '<img src="Pieces/OotW.png">';
    document.getElementById('a7').innerHTML = '<img src="Pieces/GhodaW.png">';
    document.getElementById('a8').innerHTML = '<img src="Pieces/HattiW.png">';

    document.getElementById('h1').innerHTML = '<img src="Pieces/HattiB.png">';
    document.getElementById('h2').innerHTML = '<img src="Pieces/GhodaB.png">';
    document.getElementById('h3').innerHTML = '<img src="Pieces/OotB.png">';
    document.getElementById('h4').innerHTML = '<img src="Pieces/RaniB.png">';
    document.getElementById('h5').innerHTML = '<img src="Pieces/RajaB.png">';
    document.getElementById('h6').innerHTML = '<img src="Pieces/OotB.png">';
    document.getElementById('h7').innerHTML = '<img src="Pieces/GhodaB.png">';
    document.getElementById('h8').innerHTML = '<img src="Pieces/HattiB.png">';

    board = [['H', 'G', 'O', 'Q', 'K', 'O', 'G', 'H'],
             ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
             ['h', 'g', 'o', 'q', 'k', 'o', 'g', 'h']];
}

function stToIndex(st) {
    let coord = [];
    coord.push(7-st.charCodeAt(0)+97);
    coord.push(st.charCodeAt(1)-49);
    return coord;
}

function IndexToSt(coord) {
    return ('' + String.fromCharCode(7-coord[0]+97)) + (coord[1] + 1);
}

function up(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] - steps;
    return m;
}

function down(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] + steps;
    return m;
}

function left(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[1] = m[1] - steps;
    return m;
}

function right(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[1] = m[1] + steps;
    return m;
}

function upLeft(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] - steps;
    m[1] = m[1] - steps;
    return m;
}

function upRight(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] - steps;
    m[1] = m[1] + steps;
    return m;
}

function downLeft(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] + steps;
    m[1] = m[1] - steps;
    return m;
}

function downRight(coord, steps) {
    let m = [];
    m.push(coord[0]);
    m.push(coord[1]);
    m[0] = m[0] + steps;
    m[1] = m[1] + steps;
    return m;
}

function boardCellContent(coord) {
    return board[coord[0]][coord[1]];
}

function containsWhite(coord) {
    return (boardCellContent(coord) == 'p' || boardCellContent(coord) == 'h' || boardCellContent(coord) == 'o' || boardCellContent(coord) == 'g' || boardCellContent(coord) == 'k' || boardCellContent(coord) == 'q');
}

function containsBlack(coord) {
    return (boardCellContent(coord) == 'P' || boardCellContent(coord) == 'H' || boardCellContent(coord) == 'O' || boardCellContent(coord) == 'G' || boardCellContent(coord) == 'K' || boardCellContent(coord) == 'Q');
}

function legalForWhite(coord) {
    if(!((coord[0] < 8) && (coord[0] >= 0) && (coord[1] < 8) && (coord[1] >= 0))) {
        return false;
    }
    return (!containsWhite(coord) || (boardCellContent(coord) == ' '));
}

function legalForBlack(coord) {
    if(!((coord[0] < 8) && (coord[0] >= 0) && (coord[1] < 8) && (coord[1] >= 0))) {
        return false;
    }
    return (containsWhite(coord) || (boardCellContent(coord) == ' '));
}

function boardViewer(cord) {
    let b = [];
    for(let i = 0; i < 8; i++) {
        let c = [];
        for(let j = 0; j < 8; j++) {
            c.push('_');
        }
        b.push(c);
    }
    for(let element of cord) {
        if(containsBlack(element) || containsWhite(element)) {
            b[element[0]][element[1]] = 'x';
        }
        else {
            b[element[0]][element[1]] = '.';
        }
    }
    for(let i = 0; i < 8; i++) {
        let rw = '';
        for(let j = 0; j < 8; j++) {
            rw += ' ' + b[i][j];
        }
        console.log(rw);
    }
}

function GenerateForPawn(coord) {
    if(white_turn) {
        if(coord[0] > 0 && legalForWhite(up(coord, 1)) && !containsBlack(up(coord, 1))) {
            availablePlaces.push(up(coord, 1));
        }
        if(coord[0] == 6) {
            if(legalForWhite(up(coord, 2)) && !containsBlack(up(coord, 2))) {
                availablePlaces.push(up(coord, 2));
            }
        }
        if(containsBlack(upRight(coord, 1))) {
            availablePlaces.push(upRight(coord, 1));
        }
        if(containsBlack(upLeft(coord, 1))) {
            availablePlaces.push(upLeft(coord, 1));
        }
    }
    else {
        if(coord[0] < 7 && legalForBlack(down(coord, 1)) && !containsWhite(down(coord, 1))) {
            availablePlaces.push(down(coord, 1));
        }
        if(coord[0] == 1) {
            if(legalForWhite(down(coord, 2)) && !containsWhite(down(coord, 2))) {
                availablePlaces.push(down(coord, 2));
            }
        }
        if(containsWhite(downRight(coord, 1))) {
            availablePlaces.push(downRight(coord, 1));
        }
        if(containsWhite(downLeft(coord, 1))) {
            availablePlaces.push(downLeft(coord, 1));
        }
    }
}

function GenerateForRook(position) {
    let i;
    let enemyEncountered = false;
    if(white_turn) {
        i = 1;
        while(legalForWhite(up(position, i)) && !enemyEncountered) {
            availablePlaces.push(up(position, i));
            enemyEncountered = containsBlack(up(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(down(position, i)) && !enemyEncountered) {
            availablePlaces.push(down(position, i));
            enemyEncountered = containsBlack(down(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(right(position, i)) && !enemyEncountered) {
            availablePlaces.push(right(position, i));
            enemyEncountered = containsBlack(right(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(left(position, i)) && !enemyEncountered) {
            availablePlaces.push(left(position, i));
            enemyEncountered = containsBlack(left(position, i));
            i += 1;
        }
    }
    else {
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(up(position, i)) && !enemyEncountered) {
            availablePlaces.push(up(position, i));
            enemyEncountered = containsWhite(up(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(down(position, i)) && !enemyEncountered) {
            availablePlaces.push(down(position, i));
            enemyEncountered = containsWhite(down(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(right(position, i)) && !enemyEncountered) {
            availablePlaces.push(right(position, i));
            enemyEncountered = containsWhite(right(position, i));
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(left(position, i)) && !enemyEncountered) {
            availablePlaces.push(left(position, i));
            enemyEncountered = containsWhite(left(position, i));
            i += 1;
        }
    }
}

function GenerateForKnight(position) {
    if(white_turn) {
        if(legalForWhite(up(left(position, 1), 2))) {
            availablePlaces.push(up(left(position, 1), 2));
        }
        if(legalForWhite(up(right(position, 1), 2))) {
            availablePlaces.push(up(right(position, 1), 2));
        }
        if(legalForWhite(up(left(position, 2), 1))) {
            availablePlaces.push(up(left(position, 2), 1));
        }
        if(legalForWhite(up(right(position, 2), 1))) {
            availablePlaces.push(up(right(position, 2), 1));
        }
        if(legalForWhite(down(left(position, 1), 2))) {
            availablePlaces.push(down(left(position, 1), 2));
        }
        if(legalForWhite(down(right(position, 1), 2))) {
            availablePlaces.push(down(right(position, 1), 2));
        }
        if(legalForWhite(down(left(position, 2), 1))) {
            availablePlaces.push(down(left(position, 2), 1));
        }
        if(legalForWhite(down(right(position, 2), 1))) {
            availablePlaces.push(down(right(position, 2), 1));
        }
    }
    else {
        if(legalForBlack(up(left(position, 1), 2))) {
            availablePlaces.push(up(left(position, 1), 2));
        }
        if(legalForBlack(up(right(position, 1), 2))) {
            availablePlaces.push(up(right(position, 1), 2));
        }
        if(legalForBlack(up(left(position, 2), 1))) {
            availablePlaces.push(up(left(position, 2), 1));
        }
        if(legalForBlack(up(right(position, 2), 1))) {
            availablePlaces.push(up(right(position, 2), 1));
        }
        if(legalForBlack(down(left(position, 1), 2))) {
            availablePlaces.push(down(left(position, 1), 2));
        }
        if(legalForBlack(down(right(position, 1), 2))) {
            availablePlaces.push(down(right(position, 1), 2));
        }
        if(legalForBlack(down(left(position, 2), 1))) {
            availablePlaces.push(down(left(position, 2), 1));
        }
        if(legalForBlack(down(right(position, 2), 1))) {
            availablePlaces.push(down(right(position, 2), 1));
        }
    }
}

function GenerateForBishop(position) {
    let enemyEncountered = false, i = 1;
    if(white_turn) {
        while(legalForWhite(upRight(position, i)) && !enemyEncountered) {
            availablePlaces.push(upRight(position, i));
            if(containsBlack(upRight(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(downRight(position, i)) && !enemyEncountered) {
            availablePlaces.push(downRight(position, i));
            if(containsBlack(downRight(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(upLeft(position, i)) && !enemyEncountered) {
            availablePlaces.push(upLeft(position, i));
            if(containsBlack(upLeft(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForWhite(downLeft(position, i)) && !enemyEncountered) {
            availablePlaces.push(downLeft(position, i));
            if(containsBlack(downLeft(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
    }
    else {
        while(legalForBlack(upRight(position, i)) && !enemyEncountered) {
            availablePlaces.push(upRight(position, i));
            if(containsWhite(upRight(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(downRight(position, i)) && !enemyEncountered) {
            availablePlaces.push(downRight(position, i));
            if(containsWhite(downRight(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(upLeft(position, i)) && !enemyEncountered) {
            availablePlaces.push(upLeft(position, i));
            if(containsWhite(upLeft(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
        i = 1;
        enemyEncountered = false;
        while(legalForBlack(downLeft(position, i)) && !enemyEncountered) {
            availablePlaces.push(downLeft(position, i));
            if(containsWhite(downLeft(position, i))) {
                enemyEncountered = true;
            }
            i += 1;
        }
    }
}
function copyForHTML() {
    for(let elements of availablePlaces) {
        cellsForHTML.push(IndexToSt(elements));
    }
}
function choicesGenerator(piece, position) {
    availablePlaces = [];
    cellsForHTML = [];
    if(piece == 'p' || piece == 'P') {
        GenerateForPawn(position);
    }
    else if(piece == 'h' || piece == 'H') {
        GenerateForRook(position);
    }
    else if(piece == 'g' || piece == 'G') {
        GenerateForKnight(position);
    }
    else if(piece == 'o' || piece == 'O') {
        GenerateForBishop(position);
    }
    copyForHTML();
}

function updateStyle(st) {
    document.getElementById(st).style.backgroundColor = 'rgba(255, 255, 150, 0.7)';
    cellsOnWork.push(st);

    for(let cell of cellsForHTML) {
        if(boardCellContent(stToIndex(cell)) != ' ') {
            document.getElementById(cell).style.border = 'red 4px solid';
        }
        else {
            document.getElementById(cell).style.border = 'yellow 4px solid';
        }
        cellsOnWork.push(cell);
    }
}

function resetChanges() {
    if(cellsOnWork.length == 0) {
        return;
    }
    for(let cell of cellsOnWork) {
        document.getElementById(cell).style.border = 'none';
        let pos = stToIndex(cell);
        if(pos[0] % 2 == 0) {
            if(pos[1] % 2 == 1) {
                document.getElementById(cell).style.backgroundColor = '#bbbbbb';
            }
            else {
                document.getElementById(cell).style.backgroundColor = '#505050';
            }
        }
        else {
            if(pos[1] % 2 == 1) {
                document.getElementById(cell).style.backgroundColor = '#505050';
            }
            else {
                document.getElementById(cell).style.backgroundColor = '#bbbbbb';
            }
        }
    }
    cellsOnWork = [];
    cellsForHTML = [];
    availablePlaces = [];
}

function makeMove(initial, final) {
    white_turn = !white_turn;
    let pos1 = stToIndex(initial);
    let pos2 = stToIndex(final);
    let pieceInInitial = document.getElementById(initial).innerHTML;
    document.getElementById(initial).innerHTML = '';
    document.getElementById(final).innerHTML = '';
    document.getElementById(final).innerHTML = pieceInInitial;

    if(boardCellContent(pos2) != ' ') {
        if(!white_turn) {
            deadBlack.push(boardCellContent(pos2));
        }
        else {
            deadWhite.push(boardCellContent(pos2));
        }
    }

    pieceInInitial = boardCellContent(pos1);
    board[pos1[0]][pos1[1]] = ' ';
    board[pos2[0]][pos2[1]] = pieceInInitial;
    resetChanges();
}

function updateBoard(st) {
    if(st == clicked) {
        resetChanges();
        clicked = '';
        return;
    }
    let cell = stToIndex(st);
    if(cellsForHTML.includes(st)) {
        makeMove(clicked, st);
    }
    if((boardCellContent(cell) == ' ') || ((white_turn && containsBlack(cell)) || (!white_turn && containsWhite(cell)))) {
        return;
    }
    let pc = boardCellContent(cell);
    resetChanges();
    choicesGenerator(pc, cell);
    resetChanges();
    updateStyle(st);
    clicked = st;
}









