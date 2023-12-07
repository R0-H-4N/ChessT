let board;
let white_turn = false, selected = false, moved = false;
let availablePlaces = [], cellsForHTML = [];
let cellsOnWork = [];
let clicked = '';

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
        if(coord[0] > 0 && legalForWhite(up(coord, 1))) {
            availablePlaces.push(up(coord, 1));
        }
        if(coord[0] == 6) {
            if(legalForWhite(up(coord, 2))) {
                availablePlaces.push(up(coord, 2));
            }
        }
    }
    else {
        if(coord[0] < 7 && legalForBlack(down(coord, 1))) {
            availablePlaces.push(down(coord, 1));
        }
        if(coord[0] == 1) {
            if(legalForWhite(down(coord, 2))) {
                availablePlaces.push(down(coord, 2));
            }
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
    copyForHTML();
}

function updateStyle(st) {
    document.getElementById(st).style.backgroundColor = 'rgba(255, 255, 150, 0.7)';
    cellsOnWork.push(st);

    for(let cell of cellsForHTML) {
        document.getElementById(cell).style.border = 'yellow 4px solid';
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
}

function updateBoard(st) {
    if(st == clicked) {
        resetChanges();
        clicked = '';
        return;
    }
    let cell = stToIndex(st);
    if((boardCellContent(cell) == ' ') || ((white_turn && containsBlack(cell)) || (!white_turn && containsWhite(cell)))) {
        return;
    }
    let pc = boardCellContent(cell);
    choicesGenerator(pc, cell);
    resetChanges();
    updateStyle(st);
    clicked = st;
}









