#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

int myatoi(char *s);
int pointerLength(struct ListNode* p);
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2);

int main(){
    // printf("%d\n", amytoi("    -4193 with words"));
    int l1arr[] = {1,3,5,7};
    int l2arr[] = {8,6,4,2};
    struct ListNode *l1 = (struct ListNode*)(malloc(sizeof(struct ListNode)*4));
    struct ListNode *l2 = (struct ListNode*)(malloc(sizeof(struct ListNode)*4));
    for(int i=0; i<4; ++i){
        (l1+i)->val = l1arr[i];
        (l2+i)->val = l2arr[i];
    }
    for(int i=0; i<4; ++i){ 
        (l1+i)->next = (l1+(i+1));
        (l2+i)->next = (l2+(i+1));
    }
    struct ListNode *out = mergeTwoLists(l1, l2);
}

int pointerLength(struct ListNode* p){
    int i=0;
    for(i=0; i<1000; ++i)
        if((p+i)->val == 0) break;

    return i;
}

struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2){
    // int l1Len = pointerLength(l1);
    // int l2Len = pointerLength(l2);
    // struct ListNode *new = (struct ListNode*)(malloc(sizeof(struct ListNode) * (l1Len+l2Len)));
    // int i, j=0;
    // for(i=0; i<l1Len; ++i){
    //     (new+j)->val = (l1+i)->val;
    //     (new+j)->next = (l1+i)->next;
    //     ++j;
    // }
    // j--;
    // for(i=0; i<l2Len; ++i){
    //     (new+j)->val = (l2+i)->val;
    //     (new+j)->next = (l2+i)->next;
    //     ++j;
    // }

    // for(i=0; (new+i)->next != 0; ++i)
    //     printf("Val: %d\n", (new+i)->val);

    struct NodeList *curr, *next, *working;
    curr = (struct ListNode *)l1;
    working = (struct ListNode *)l2;
    next = (struct ListNode *)l1->next;
    while (curr != NULL)
    {
        curr->next = working->next;
        break;

    }
    
}

int myatoi(char *s){
    int num = 0;
    int n;
    if(s[0] == '-') n = 1;
    else n = 0;

    for(int i=n; s[i] != 0; ++i){
        if(s[i] == ' ') continue;
        if(s[i] == '-') {
            n = 1;
            continue;
        }
        if(s[i] < 48 || s[i] > 57) continue;
        num = num*10 + (s[i] - 48);
    }

    if(n == 1) num = num *-1;

    return num;
}