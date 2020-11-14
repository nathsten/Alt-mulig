#include <stdio.h>

int main(){
    int tallListe[4] = {2,3,7,6};
    int target = 9;
    printf("%s", twoSum());
}

int twoSum(){
    int tallListe[4] = {2,3,7,6};
    int target = 9;
    int output[] = {};

    for(int i=0; i<4; ++i){
        for(int j=0; j<4; ++j){
            if(tallListe[i] + tallListe[j] == target){
                output[0] = tallListe[i];
                output[1] = tallListe[j];
            }
        }
    }
    return output;
}



// int main(){
//     int x = 48;
//     while (x<50){
//         printf("X is less than 50. ");
//         x+=1;
//         if(x >= 50){
//             printf("X is greater or equal than 50. ");
//             break;
//         }
//     }
// }