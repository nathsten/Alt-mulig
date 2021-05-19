#include <stdio.h>
#include <stdlib.h>

int* sort(int *n, int l);
int* arrToPointer(int arr[], int l);
void printPointer(int *p, int l);

int* arrToPointer(int arr[], int l){
    int *p = malloc(sizeof(int) * l);
    for(int i=0; i<l; i++){
        *(p+i) = arr[i];
    }

    return p;
}

int* sort(int *n, int l){
    int c = 0;
    int i = 0;
    int a = 0;
    while (c != l){
        int curr = *(n+i);
        int next = *(n+i+1);
        if(curr > next && next != 0){
            *(n+i) = next;
            *(n+i+1) = curr;
            // printf("%d < %d\n", *(n+i), *(n+i+1)); 
        }
        else{
            c++;
        }
        if(i == l+1){
            i=0;
            c=0;
        }
        i++;
    }

    return n;
}

void printPointer(int *p, int l){
    for(int i=0; i<l; i++){
        printf(" %d ", *(p+i));
    }
    printf("\n");
}