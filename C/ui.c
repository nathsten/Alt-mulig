#include <stdio.h>
#include <stdlib.h>

int main(){

    char *name = malloc(sizeof(char) * 500);
    
    printf("Enter your name: ");
    fgets(name, sizeof(char)*500, stdin);

    printf("Your name is: %s\n", name);

    return 0;
}