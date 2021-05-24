#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define LEN(a) sizeof(a)/sizeof(a[0])

struct Point* getFile(char filename[]);
void printPointer(struct Point *p);
int lengthOfString(char str[]);

struct Point{
    int x;
    int y;
};

int main(){
    char filename[] = "convex-hull-testdata.txt";
    struct Point *allPoints = getFile(filename);
    printPointer(allPoints);
    return 1;
}

struct Point* getFile(char filename[]){
    FILE *txt;
    char str[100];
    struct Point *allPoints;
    allPoints = (struct Point*) malloc(100* sizeof(struct Point));
    int p = 0;
 
    txt = fopen(filename, "r");
    if (txt == NULL){
        printf("Could not open file %s\n",filename);
        return allPoints;
    }
    while (fgets(str, 100, txt) != NULL){
        // printf("%s", str);
        char xs[3];
        char ys[3];
        int c = 0;
        int i = 0;
        int length = lengthOfString(str);
        while(str[i] != ' '&&i != length){
            xs[i] = str[i];
            i++;
        }
        i++;
        while (i <= length){
            ys[c] = str[i];
            c++;
            i++;
        }
        (allPoints+p)->x = atoi(xs);
        (allPoints+p)->y = atoi(ys);
        p++;
    }
        // printf("\n"); 
    fclose(txt);

    return allPoints;
}

void printPointer(struct Point *p){
    for(int i=0; i<50; i++){
        if((p+i)->x == 0 && (p+i)->y == 0) break;
        printf("%d\t%d\n", (p+i)->x, (p+i)->y);
    }
}

int lengthOfString(char str[]){
    int i = 0;
    for(i=0; i<1000000; ++i){
        if(str[i] == 0) break;
    }
    return i-1;
}