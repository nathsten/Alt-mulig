#include <stdio.h>
#include <stdlib.h>

int factorial(int n);
int sumArr(int *arr, int i);
int largest(int *arr, int i, int max);

int main(){
    printf("Factioral 4: %d\n", factorial(4));
    int tall[] = {5,3,7,1,2,8,4,9,8};
    int len = sizeof(tall) / sizeof(tall[0]);
    int *list = tall;

    printf("Sum: %d\n", sumArr(list, len));
    printf("Largest: %d\n", largest(list, len-1, *list));
}

int factorial(int n){
    if(n == 1) return 1;
    else return n * factorial(n - 1);
}

int sumArr(int *arr, int i){
    if(i == 0) return 0;
    return *(arr+i-1) + sumArr(arr, i-1);
}

int largest(int *arr, int i, int max){
    if(i == 0) return max;
    if(*(arr+i) > max) max = *(arr+i);
    return largest(arr, i-1, max);
}