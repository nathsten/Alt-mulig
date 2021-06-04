#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void readLine(char line[]);

int main() {
    char line[10][1000];
    char check; 
    int i=0;
    while(i<10){
        readLine(line[i]);
        if(getchar() == '\n') break;
        ++i;
    }
    for(i=0; i<10&&line[i]!=0; ++i){
        printf("%s\n", line[i]);
    }
}

void readLine(char line[]){
    fgets(line, sizeof(char)*1000, stdin);
}