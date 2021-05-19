#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* multiply(int *n, int m);

int main(){
    char *word = malloc(sizeof(char) * 10);
    strcpy(word, "Hello");

    int *nums = malloc(sizeof(int) * 3);
    nums[0] = 8;
    *(nums+1) = 12;
    *(nums+2) = 16;
    *(nums+3) = 20;
    *(nums+4) = 24;

    int *edited = multiply(nums, 8);
    printf("%d\n", *(edited));

    // lengt of array
    int tall[] = {1,2,3,4,5};
    int lengt = sizeof(tall)/sizeof(tall[0]);
    printf("Lengt of tall: %d\n", lengt);

    return 0;
}

int* multiply(int *n, int m){
    for(int i = 0; i < 5; i++){
        n[i] = *(n+i)*m;
    }

    return n;
}