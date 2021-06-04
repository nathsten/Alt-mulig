#include <stdio.h>
#include <stdlib.h>
#define SIZEOF(a) sizeof(a)/sizeof(a[0])

struct Filtered{
    int *arr;
    int index;
};

int* quickSort(int *arr, int size);
struct Filtered* filter(int *arr, int size, int req);
int* concat(int *arr1, int *arr2, int avgnum);
int avgNum(int *arr, int size);
int pointerSize(int *p);
void printArr(int *arr, int size);

int main(){
    int arr[] = {4, 9, 1, 8, 7, 12, 9, 17, 5, 3, 6, 2};
    int size = SIZEOF(arr);
    int *p = arr;
    // int *s = quickSort(p, size);
    // printArr(s, pointerSize(s));
    struct Filtered *f = filter(p, size, 7);
    printArr(f->arr, size);
    printf("index: %d\n", f->index);
    return 1;
}

int* quickSort(int *arr, int size){
    if(size == 0||size == 1) return arr;
    if(size == 2){
        int f = arr[0];
        int s = arr[1];
        if(f > s){
            arr[0] = s;
            arr[1] = f;
            return arr;
        }
        return arr;
    }
    
    int m = (arr[(int)size/2] + arr[0] + arr[size-1])/3;
    struct Filtered *filtered = filter(arr, pointerSize(arr), m);


    // int uasize = pointerSize(underAvg);
    // int oasize = pointerSize(overAvg);
    // return concat(quickSort(underAvg, uasize), quickSort(overAvg, oasize), m);
    return arr;
}

struct Filtered* filter(int *arr, int size, int req){
    struct Filtered *ret = (struct Filtered*)malloc(sizeof(struct Filtered));
    int i=0, j=size-1;
    while(i < j){
        if(*(arr+i) < req) i++;

        if(*(arr+j) > req) j--;

        if(*(arr+i) > *(arr+j)){
            int low = *(arr+i);
            int high = *(arr+j);
            *(arr+i) = high;
            *(arr+j) = low;
            i++;
            j--;
        }
    }
    (ret)->arr = arr;
    (ret)->index = i-1;
    return ret;
}

int* concat(int *arr1, int *arr2, int avgnum){
    int ps1, ps2;
    ps1 = pointerSize(arr1);
    ps2 = pointerSize(arr2);
    int size = ps1+ps2+1;
    int *newArr = malloc(sizeof(int)*size);
    int i, j;

    for(i=0; i<ps1; ++i) *(newArr+i) = *(arr1+i);
    *(newArr+i) = avgnum;
    ++i;
    for(j=0; j<ps2; ++j){
        *(newArr+i) = *(arr2+j);
        ++i;
    }
    return newArr;
}

int pointerSize(int *p){
    int i=0;
    while(*(p+i) != 0){
        // Debugging av feil i pekerne. 
        if(*(p+i) > 1000) break;
        if(*(p+i) < -1000) break;
        ++i;
    }
    return i;
}

void printArr(int *arr, int size){
    printf("[");
    int i;
    for(i=0; i<size-1; ++i){
        printf("%d,", *(arr+i));
    }
    printf("%d]\n", *(arr+i));
}