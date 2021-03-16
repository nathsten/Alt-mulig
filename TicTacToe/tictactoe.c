#include <stdio.h>
#include <stdlib.h>

void printBoard();
void placeBrick(char p, char player);
void getCPUPos(char playerPos);
int checkVictory();

char b[5][5] = {
    {' ', '|', ' ', '|', ' '},
    {'-', '+', '-', '+', '-'},
    {' ', '|', ' ', '|', ' '},
    {'-', '+', '-', '+', '-'},
    {' ', '|', ' ', '|', ' '}
};
// Probably doesn't work..
int main(void){
    printBoard();
    int playing = checkVictory();
    while (playing == 1){
        char p;
        printf("%s", "Enter a possition between 0 and 9\n");
        p = getchar();
        placeBrick(p, 's');
        getCPUPos(p);
        printBoard();
    }
};

void printBoard(){
    for(int i=0; i<5; i++){
        for(int j=0; j<5; j++){
            printf("%c", b[i][j]);
        }
        printf("\n");
    }
}

void placeBrick(char p, char player){
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
            break;
        case'2':
            b[0][2] = brick;
            break;
        case'3':
            b[0][4] = brick;
            break;
        case'4':
            b[2][0] = brick;
            break;
        case'5':
            b[2][2] = brick;
            break;
        case'6':
            b[0][4] = brick;
            break;
        case'7':
            b[4][0] = brick;
            break;
        case'8':
            b[4][2] = brick;
            break;
        case'9':
            b[4][4] = brick;
            break;
        default:
            break;
    }
}

void getCPUPos(char playerPos){
    int newBrickFound = 0;

    while (newBrickFound == 0){
        // time_t t;
        char cpu = rand() % 10; 
        switch (cpu){
        case '1':
            if(b[0][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'2':
            if(b[0][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'3':
            if(b[0][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'4':
            if(b[2][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'5':
            if(b[2][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'6':
            if(b[2][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'7':
            if(b[4][0] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'8':
            if(b[4][2] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
            }
            break;
        case'9':
            if(b[4][4] == ' ' && playerPos != cpu){
                newBrickFound = 1;
                placeBrick(cpu, 'cpu');
                printBoard();
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

int checkVictory(){
    return 1;
}