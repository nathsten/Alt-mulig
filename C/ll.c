#include <stdio.h>
#include <stdlib.h>


struct Node{
    int data;
    struct Node *next;
};

void printNodes(struct Node *n);
struct Node* reverseList(struct Node *n);

int main(){
    struct Node *head = NULL;
    struct Node *second = NULL;
    struct Node *third = NULL;

    head = (struct Node*)malloc(sizeof(struct Node));
    second = (struct Node*)malloc(sizeof(struct Node));
    third = (struct Node*)malloc(sizeof(struct Node));

    head->data = 1;
    head->next = second;
    second->data = 3;
    second->next = third;
    third->data = 5;
    third->next = NULL;

    printNodes(head);
    struct Node *rev = reverseList(head);
    printf("Reversed: \n");
    printNodes(rev);
    return 0;
}

void printNodes(struct Node *n){
    while (n != NULL)
    {
        printf("Node data: %d\n", n->data);
        n = n->next;
    }
    
}

struct Node* reverseList(struct Node *n){
    struct Node *prev = NULL;
    struct Node *current = n;
    struct Node *next = NULL;
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    n = prev;
    return n;
}