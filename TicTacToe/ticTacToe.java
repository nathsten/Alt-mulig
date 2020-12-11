import java.util.Random;
import java.util.Scanner;

class tictactoe{
    public static void main(String args[]){
        char board[][] = {
            {' ', '|', ' ', '|', ' '},
            {'-', '+', '-', '+', '-'},
            {' ', '|', ' ', '|', ' '},
            {'-', '+', '-', '+', '-'},
            {' ', '|', ' ', '|', ' '},
        };

        boolean playing = checkVictory(board);

        while(playing == true){
            System.out.println();
            System.out.println("Type in position 1-9");

            Scanner scan = new Scanner(System.in);
            int pos = scan.nextInt();

            int cpuPos = getCPUPos(board, pos);
    
            placeBrick(board, pos, "player");
            placeBrick(board, cpuPos, "cpu");
            placeBoard(board);
            checkVictory(board);
            playing = checkVictory(board);
        }
    }

    public static void placeBoard(char board[][]){
        for(int i = 0; i<board.length; i++){
            for(int j = 0; j<board[i].length; j++){
                System.out.print(board[i][j]);
            }
            System.out.println();
        }
    }

    public static void placeBrick(char board[][], int position, String user){
        char brick = ' ';

        if(user.equals("player")){
            brick = 'X';
        }
        else if(user.equals("cpu")){
            brick = 'O';
        }

        switch(position){
            case 1:
                board[0][0] = brick;
                break;
            case 2:
                board[0][2] = brick;
                break;
            case 3:
                board[0][4] = brick;
                break;
            case 4:
                board[2][0] = brick;
                break;
            case 5:
                board[2][2] = brick;
                break;
            case 6:
                board[2][4] = brick;
                break;
            case 7:
                board[4][0] = brick;
                break;
            case 8:
                board[4][2] = brick;
                break;
            case 9:
                board[4][4] = brick;
                break;
            default:
                break;
        }
    }

    public static int getCPUPos(char board[][], int playerPos){
        Random rnd = new Random();
        boolean newBrickFound = false;

        int posRet = 1;
        while(newBrickFound == false){
            int cpuPos = rnd.nextInt(9) + 1;
            switch(cpuPos){
                case 1:
                    if((board[0][0] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 2:
                    if((board[0][2] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 3:
                    if((board[0][4] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 4:
                    if((board[2][0] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 5:
                    if((board[2][2] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 6:
                    if((board[2][4] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 7:
                    if((board[4][0] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 8:
                    if((board[4][2] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                case 9:
                    if((board[4][4] == ' ') & (cpuPos != playerPos)){
                        posRet = cpuPos;
                        newBrickFound = true;
                    }
                    break;
                default:
                    break;
            }
        }
        return posRet;
    }

    public static boolean checkVictory(char board[][]){
        boolean state = true;
        String msg = " ";

        for(int i = 0; i<board.length; i++){
            if((board[i][0] == 'X') & (board[i][2] == 'X') & (board[i][4] == 'X')){
                state = false;
                msg = "You won";
            }
            else if((board[i][0] == 'O') & (board[i][2] == 'O') & (board[i][4] == 'O')){
                state = false;
                msg = "You lost";
            }
        }

        for(int i = 0; i<board.length; i++){
            if((board[0][i] == 'X') & (board[2][i] == 'X') & (board[4][i] == 'X')){
                state = false;
                msg = "You won";
            }
            else if((board[0][i] == 'O') & (board[2][i] == 'O') & (board[4][i] == 'O')){
                state = false;
                msg = "You lost";
            }
        }

        if(!msg.equals("")){
            System.out.println(msg);
        }

        return state;
    }
}