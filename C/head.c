#include <stdio.h>
#include <stdlib.h>
#include "head.h"

#define SIZEOF(a) (sizeof(a) / sizeof(a[0]))

int main(){

    int *num = malloc(sizeof(int)*10);

    int numArr[] = {3,2,19,4,1,5,82,7,8,9,6,12,18};
    int l = SIZEOF(numArr);

    int *p = arrToPointer(numArr, l);

    int *s = sort(p, l);

    int *s2 = sort(s, l);
    printf("Sorted:");
    printPointer(s, l);

    return 0;
}
