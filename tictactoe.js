const colors = require("colors");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board ={
    1:" ",
    2:" ",
    3:" ",
    4:" ",
    5:" ",
    6:" ",
    7:" ",
    8:" ",
    9:" "
}
const combinationWins = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7]]
function isWin(player){
    for (let i = 0; i < combinationWins.length; i++){
        let mark = 0;
        for (let j = 0; j < 3;j++){
            if (board[combinationWins[i][j]] === player){
                mark++
            }
        }
        if (mark === 3)
            return true
    }
    return false

}
function printBoard(){
    console.log(colors.blue('\n'+
        ' '+board["1"]+' | '+board["2"]+' | '+' '+board["3"]+' '+'\n'+
        '---|---|---'+'\n'+
        ' '+board["4"]+' | '+board["5"]+' | '+' '+board["6"]+' '+'\n'+
        '---|---|---'+'\n'+
        ' '+board["7"]+' | '+board["8"]+' | '+' '+board["9"]+' '+'\n'


    ))
}

function correctMove(position){
    if (board[position] === ' '){
        return true
    }
   return false
}
function randomInteger(min, max) {

    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function bot(){
    let position_bot = randomInteger(1,9)
    while (!correctMove(position_bot))
        position_bot = randomInteger(1,9)

    board[position_bot] = 'O'
    console.log('Бот сходил ', position_bot)
    printBoard()
}

function fullBoard(){
    for (let i = 1; i < 10;i++)
        if (board[i] === ' ')
            return false
    return true
}

function game(){
    console.log(colors.blue('\n'+ 'Вводите номер, куда будете ходить'+"\n"+
        ' '+'1'+' | '+"2"+' | '+' '+"3"+' '+'\n'+
        '---|---|---'+'\n'+
        ' '+"4"+' | '+"5"+' | '+' '+"6"+' '+'\n'+
        '---|---|---'+'\n'+
        ' '+"7"+' | '+"8"+' | '+' '+"9"+' '+'\n'
    ))
    console.log('Выберете ход')
    rl.on('line', function (position) {

        if(position > 0 && position < 10 && correctMove(position)){
            board[position] = 'X'
            printBoard()
            if (isWin('X')){
                console.log('Вы выйграли')
                rl.close()
                return
            }
            if (fullBoard()){
                console.log('Ничья')
                rl.close()
                return
            }
            bot()
            if (isWin('O')){
                console.log('Вы проиграли')
                rl.close()
                return
            }
            if (fullBoard()){
                console.log('Ничья')
                rl.close()
                return
            }
        }
        else {
            console.log('Неверный ход')
        }

        console.log('Выберете ход')
    });
}


game()




