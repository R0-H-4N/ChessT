let selected = false, moved = false;
let board;
let memory = [];
let white_turn = true, black_turn = false;
let possible_places = [[]], poss_places_out = [[]];

/*window.onload = function() {
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
             [' ', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
             ['h', 'g', 'o', 'q', 'k', 'o', 'g', 'h']];
}*/

function stToIndex(st) {
    let coord = [];
    coord.push(7-st.charCodeAt(0)+97);
    coord.push(st.charCodeAt(1)-49);
    return coord;
}

function IndextoSt(pos) {
    let st = '';
    let a = String.fromCharCode(pos[0]+97);
    let b = '' + (pos[1] + 1);
    st = a + b;
    return st;
}

function content(st) {
    let pos = stToIndex(st);
    return board[pos[0]][pos[1]];
}

function bContent(x, y) {
    return board[x][y];
}


function availableChoice(st) {
    let pc = content(st);
    let ps = stToIndex(st);
    poss_places_out.length = 0;
    possible_places.length = 0;

    if(white_turn) {
        if(pc == 'p') {
            if(ps[0] == 6) {
                if(board[ps[0]-2][ps[1]] == ' ') {
                    let mem = [];
                    mem.push(ps[0] - 2);
                    mem.push(ps[1]);
                    possible_places.push(mem);
                    console.log('mem: ')
                    console.log(mem);
                    console.log('memend;');
                }
            }
            if(board[ps[0]-1][ps[1]] == ' ') {
                let mem = [];
                mem.push(ps[0]-1);
                mem.push(ps[1]);
                possible_places.push(mem);
            }
        }
        else if(pc == 'h') {
            let i = ps[0]-1;
            while(board[i][ps[1]] == ' ' && i >= 0) {
                let mem = [];
                mem.push(i);
                mem.push(ps[1]);
                possible_places.push(mem);
                i--;
            }
            i = ps[1]+1;
            while(board[ps[0]][i] == ' ' && i < 8) {
                let mem = [];
                mem.push(i);
                mem.push(ps[1]);
                possible_places.push(mem);
                i++;
            }
        }
    }

    for(let i = 0; i < possible_places.length; i++) {
        console.log(possible_places[i]);
        poss_places_out.push(IndextoSt(possible_places[i]));
    }
}


board = [['H', 'G', 'O', 'Q', 'K', 'O', 'G', 'H'],
             ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
             [' ', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
             ['h', 'g', 'o', 'q', 'k', 'o', 'g', 'h']];


availableChoice('a1');
console.log(poss_places_out);



