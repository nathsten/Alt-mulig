#include <stdio.h>
#include <stdlib.h>

void printBoard(char b[5][5]);
void placeBrick(char b[5][5], char p, char player);
char getCPUPos(char b[5][5], char playerPos);
int checkVictory(char b[5][5]);

int main(void){
    char board[5][5] = {
        {' ', '|', ' ', '|', ' '},
        {'-', '+', '-', '+', '-'},
        {' ', '|', ' ', '|', ' '},
        {'-', '+', '-', '+', '-'},
        {' ', '|', ' ', '|', ' '}
    };
    printBoard(board);
    // int playing = checkVictory(board);
    char p;
    printf("%s", "Enter a possition between 0 and 9\n");
    p = getchar();
    placeBrick(board, p, 's');
    char cpuPos = getCPUPos(board, p);
    placeBrick(board, '1', 'cpu');
};

void printBoard(char b[5][5]){
    for(int i=0; i<5; i++){
        for(int j=0; j<5; j++){
            printf("%c", b[i][j]);
        }
        printf("\n");
    }
}

void placeBrick(char b[5][5], char p, char player){
    char brick;
    if(player == 's'){
        brick = 'X';
    }
    else{
        brick = 'O';
    }
    
    switch (p){
        case '1':
            b[0][0] = brick;
            printBoard(b);
            break;
        case'2':
            b[0][2] = brick;
            printBoard(b);
            break;
        case'3':
            b[0][4] = brick;
            printBoard(b);
            break;
        case'4':
            b[2][0] = brick;
            printBoard(b);
            break;
        case'5':
            b[2][2] = brick;
            printBoard(b);
            break;
        case'6':
            b[0][4] = brick;
            printBoard(b);
            break;
        case'7':
            b[4][0] = brick;
            printBoard(b);
            break;
        case'8':
            b[4][2] = brick;
            printBoard(b);
            break;
        case'9':
            b[4][4] = brick;
            printBoard(b);
            break;
        default:
            break;
    }
}

char getCPUPos(char b[5][5], char playerPos){
    int newBrickFound = 0;

    while (newBrickFound == 0){
        time_t t;
        char cpu = rand() % 10; 
        switch (cpu){
        case '1':
            if(b[0][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'2':
            if(b[0][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'3':
            if(b[0][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'4':
            if(b[2][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'5':
            if(b[2][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'6':
            if(b[2][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'7':
            if(b[4][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'8':
            if(b[4][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        case'9':
            if(b[4][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                return cpu;
            }
            break;
        default:
            break;
        }
        if(newBrickFound == 1){
            break;
        }
    }
}

int checkVictory(char b[5][5]){
    return 1;
}