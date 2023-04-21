var x;
var y;
var i;
var j;
var error = false;
var moresol = true;
var sudoku = [[0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0]];

function fillSudoku() {
    
    y = 0
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            var num = document.getElementById('tabla').getElementsByTagName('input')[y].value;
            var Num = Number(num);
            if (isNaN(num) || num > 9) {
                alert('Please enter a numerical value between 1 and 9');
                error = true;
                return
            };
            sudoku[i][j] = Num;
            y++;
        };
    };
    return sudoku
};

function clearer() {
    var table;
    for (y = 0; y < 81; y++) {
        document.getElementById('tabla').getElementsByTagName('input')[y].value = '';
    };
};

function fillSolution(data) {
    document.getElementById("teibol2").style.display = "block";
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            document.getElementById('tabla2').rows[i].cells[j].innerHTML = data[i][j];
        };
    };
};

function possible(x,y,n,grid) {
    for (i = 0; i < 9; i++) {
        if ((grid[y][i] === n) || (grid[i][x] === n)) {
            return false
        };
    };
    
    var x_box = (Math.floor(x/3))*3;
    var y_box = (Math.floor(y/3))*3;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (grid[y_box + i][x_box + j] === n) {
                return false
            };
        };
    };
    return true;
};

function solve(data) {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (data[y][x] === 0) {
                for(var n = 1; n <= 9; n++) {
                    if (possible(x,y,n,data)) {
                        data[y][x] = n;
                        if (solve(data)) {
                            return true;
                        } else {
                            data[y][x] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    if (moresol) {
        fillSolution(data);
        moresol = false;
    };
    i++;
    return true;
};

function solver() {
    var data = fillSudoku();
    if (error) {
        error = false;
        return;
    };
    i = 0;
    solve(data);
    if (i>1) {
        document.getElementById("more").innerHTML = '<p>This sudoku does not have a unique solution!</p>'
    };
    document.getElementById("new").innerHTML = '<p><button id="button" onclick="newSudoku()">SOLVE NEW SUDOKU</button></p>';
};

function newSudoku() {
    window.location.reload(true);
};