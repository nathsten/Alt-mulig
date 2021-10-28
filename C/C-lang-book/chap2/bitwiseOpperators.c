#include <stdio.h>
#include <stdlib.h>

void lowerStr(char s[], int size);

int main(){
    int n;
    // n = n & 0177;
    int x, p;
    n = 4, p = 7;

    x = n ^ p;

    // printf("%d\n", x);
    char str[] = "HeLLO WOrLd";
    int size = sizeof(str) / sizeof(str[0]);

    lowerStr(str, size);
    // printf("Lowered HeLLO WOrLd: %s\n", str);

    printf("Left shift: %c\n", (3<<5)+1);
}

void lowerStr(char s[], int size){
    for(int i=0; i<size; ++i)
        s[i] = s[i] <= 90 && s[i] >= 65 ? s[i] + 32 : s[i];
    
}