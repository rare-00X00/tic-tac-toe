var tiles = document.querySelectorAll('.container > :nth-child(2) > div');
var player1 = {
    id: document.querySelector(".container > :nth-child(1)"),
    symbol: document.querySelector(".container > :nth-child(1) > :nth-child(1)"),
}
var player2 = {
    id: document.querySelector(".container > :nth-child(3)"),
    symbol: document.querySelector(".container > :nth-child(3) > :nth-child(1)"),
}
var disable = false;
var symbol = "";
var active_tiles = {};
var fromKeyboardSpacebar = false;

function activePlayer() {
    var randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 0) {
        return "player1";
    } else {
        return "player2";
    }
}

function randomSymbol() {
    var non_active_symbol = "";
    var randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 0) {
        symbol = "o-symbol";
        non_active_symbol = "x-symbol";
    } else {
        symbol = "x-symbol";
        non_active_symbol = "o-symbol";
    }
    return [symbol, non_active_symbol];
}

function randomization() {
    var active_player = activePlayer();
    var [active_symbol, non_active_symbol] = randomSymbol();

    if (active_player === "player1") {
        player1.id.classList.add("green");
        player1.symbol.classList.add(active_symbol);
        player2.symbol.classList.add(non_active_symbol);
    } else {
        player2.id.classList.add("green");
        player2.symbol.classList.add(active_symbol);
        player1.symbol.classList.add(non_active_symbol);
    }
}

randomization();

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
    id = setInterval(function() {
        for (var i=0; i<elements.length; i++) {
            tiles[elements[i] - 1].classList.toggle("flicker-bg-img");
        }
        if (player1.symbol.className === tiles[elements[0] - 1].classList[0]) {
            player1.id.classList.toggle("flicker");
            player1.id.classList.add("green");
            player2.id.classList.remove("green");
        } else {
            player2.id.classList.toggle("flicker");
            player2.id.classList.add("green");
            player1.id.classList.remove("green");
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
        const patterns = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        var matched_pattern = [];
        for (var i=0; i<patterns.length; i++) {
            if (patternMatch(patterns[i])) {
                flag = true;
                disable = true;
                matched_pattern = patterns[i];
                break;
            }
        }
        if (flag === true || Object.keys(active_tiles).length == 9) {
            blink3times(matched_pattern);
            setTimeout(function() {
                if (!fromKeyboardSpacebar) {
                    reset();
                }
            }, 2000);
        }
        debugger;
    }
}

function tileEventHandler() {
    if (disable != true) {
        this.classList.add(symbol);
        active_tiles[this.getAttribute('name')] = this.getAttribute('class');
        checkForWinner();
        changeSymbol();
    }
}

for(var i=0; i<tiles.length; i++) {
    tiles[i].addEventListener('click', tileEventHandler, {'once': true});
}

function reset() {

    function removeClassesFromPlayer() {
        player1.id.classList.remove("green");
        player2.id.classList.remove("green");
        player1.symbol.classList.remove("o-symbol");
        player1.symbol.classList.remove("x-symbol");
        player2.symbol.classList.remove("o-symbol");
        player2.symbol.classList.remove("x-symbol");
    }

    function removeClasses(tile) {
        tile.classList.remove("o-symbol");
        tile.classList.remove("x-symbol");
    }

    disable = false;
    active_tiles = {};
    fromKeyboardSpacebar = false;
    for(var i=0; i<tiles.length; i++) {
        removeClasses(tiles[i]);
        tiles[i].removeEventListener("click", tileEventHandler);
        tiles[i].addEventListener("click", tileEventHandler, {'once': true});
    }
    removeClassesFromPlayer();
    randomization();
}

document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        fromKeyboardSpacebar = true;
        if (disable === true) {
            reset();
        }
    }
});
