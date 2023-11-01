var tiles = document.querySelectorAll('.container > :nth-child(2) > div');
var player1 = {
    id: document.querySelector(".container > :nth-child(1)"),
    symbol: document.querySelector(".container > :nth-child(1) > :nth-child(1)"),
    name: document.querySelector(".container > :nth-child(1) > :nth-child(2)"),
}
var player2 = {
    id: document.querySelector(".container > :nth-child(3)"),
    symbol: document.querySelector(".container > :nth-child(3) > :nth-child(1)"),
    name: document.querySelector(".container > :nth-child(3) > :nth-child(2)"),
}
var disable = false;
var symbol = "";
var active_tiles = {};

// Function used to get random symbol each initial loading
function randomSymbol() {
    randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 0) {
        symbol = "o-symbol";
    } else {
        symbol = "x-symbol";
    }
}

function addSymbolToPlayer() {
    if (symbol === "o-symbol") {
        player1.symbol.classList.add("player-symbol-o");
        player2.symbol.classList.add("player-symbol-x");
    } else {
        player1.symbol.classList.add("player-symbol-x");
        player2.symbol.classList.add("player-symbol-o");
    }
}

randomSymbol();
addSymbolToPlayer();
player1.id.classList.add("green");

function changeSymbol() {
    if(symbol === "o-symbol") {
        symbol = "x-symbol";
    } else {
        symbol = "o-symbol";
    }
    player1.id.classList.toggle("green");
    player2.id.classList.toggle("green");
}

function blink3times(elements) {
    debugger;
    id = setInterval(function() {
        for (var i=0; i<elements.length; i++) {
            tiles[elements[i] - 1].classList.toggle("flickerbgimg");
        }
    }, 100);
    setTimeout(function() {
        clearInterval(id);
    }, 600);
}

function checkForWinner() {
    function patternMatch(combination) {
        if(active_tiles[combination[0]] === symbol &&
            active_tiles[combination[1]] === symbol &&
            active_tiles[combination[2]] === symbol) {
            return true;
        }
        return false;
    }

    if(Object.keys(active_tiles).length < 5) {
        return;
    } else {
        var flag = false;
        const patterns = [[1,2,3], [1,4,7], [1,5,9], [4,5,6], [7,8,9], [3,5,7], [3,6,9]];
        var matched_pattern = [];
        for (var i=0; i<patterns.length; i++) {
            if (patternMatch(patterns[i])) {
                flag = true;
                disable = true;
                matched_pattern = patterns[i];
                break;
            }
        }

        if (flag === true) {
            blink3times(matched_pattern);
        }
    }
}

for(var i=0; i<tiles.length; i++) {
    tiles[i].addEventListener('click', function() {
        if (disable != true) {
            this.classList.add(symbol);
            active_tiles[this.getAttribute('name')] = this.getAttribute('class');
            checkForWinner();
            changeSymbol();
        }
    }, {'once': true});
}
