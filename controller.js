let selected = false, moved = false;

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
}

function updateBoard(st) {
    
}
