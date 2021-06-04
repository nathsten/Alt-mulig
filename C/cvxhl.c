#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Point* getFile(char filename[]);
struct Point* convex_hull(struct Point* allPoints);
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
    char str[1000];
    struct Point *allPoints;
    allPoints = (struct Point*) malloc(100* sizeof(struct Point));
    int p = 0;
 
    txt = fopen(filename, "r");
    if (txt == NULL){
        printf("Could not open file %s\n",filename);
        return allPoints;
    }
    while (fgets(str, 1000, txt) != NULL)
    {
        int i=0;
        char *splitted = strtok(str, " ");
        struct Point *point = (struct Point*)malloc(sizeof(struct Point));
        while( splitted != NULL && i < 2) {
            if(i == 0){
                point->x = atoi(splitted);
                splitted = strtok(NULL, "\n");
            }
            if(i == 1) point->y = atoi(splitted);
            ++i;
        }
        (allPoints+p)->x = point->x;
        (allPoints+p)->y = point->y;
        free(point);
        ++p;
        // printf("%d %d", point->x, point->y);
        // printf("\n");
    }
    
    fclose(txt);

    return allPoints;
}

struct Point* convex_hull(struct Point* allPoints)
{
    return allPoints;
}

void printPointer(struct Point *p){
    for(int i=0; i<50; i++){
        if((p+i)->x == 0 && (p+i)->y == 0) break;
        printf("x: %d\ty: %d\n", (p+i)->x, (p+i)->y);
    }
}