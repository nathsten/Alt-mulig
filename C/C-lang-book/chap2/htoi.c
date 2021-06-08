#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* htoi(int n);
void squeeze(char s1[], char s2[]);

int main(){
    char *hex = htoi(127183);
    char h[12];
    for(int i=0; i<12; ++i)
        h[i] = *(hex+i);
    printf("%s\n", h);


    char s1[] = "abcdef";
    char s2[] = "af";
    squeeze(s1, s2);
    printf("%s\n", s1);
}

char* htoi(int n){
    char hex[12];
    sprintf(hex, "%X", n);
    char *p = hex;
    return p;
}

void squeeze(char s1[], char s2[]){
    int i,j, li, lj;
    li = strlen(s1);
    lj = strlen(s2);
    for(i=0; i < li; ++i)
        for(j=0; j < lj; ++j)
            if(s1[i] == s2[j])
                memmove(&s1[i], &s1[i+1], li-i);
}