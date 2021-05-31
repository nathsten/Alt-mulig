#include <stdio.h>
#define MAXLINE 1000 /* maximum input line length */
#define true 1

int fetchLine(char s[], int lim);
void copy(char to[], char from[]);
void reverse(char str[], int length);
/* print the longest input line */
int main()
{
    int len;
    int max;
    char line[MAXLINE];
    char longest[MAXLINE]; /* longest line saved here */
    /* current line length */
    /* maximum length seen so far */
    max = 0;
    while ((len = fetchLine(line, MAXLINE)) > 0){
        if (len > max) {
                max = len;
                copy(longest, line);
            }
        if(max>0){
            printf("%s->%d\n", longest,max);
            reverse(longest, max);
            printf("Reversed: %s\n", longest);
        }
    /* current input line */
    }
    return 0; 
}
/* getline:  read a line into s, return length  */
int fetchLine(char s[], int lim)
{
    int c, i;
    for (i=0; i < lim-1 && (c=getchar())!=EOF && c!='\n'; ++i) s[i] = c;
    if (c == '\n') { 
        s[i] = c;
        ++i; 
    }
    s[i] = '\0';
    return i-1; 
}
/* copy:  copy 'from' into 'to'; assume to is big enough */
void copy(char to[], char from[])
{
    int i;
    i = 0;
    while (1){
        if(from[i] == '\0') break;
        if(from[i] == '\n') break;
        to[i] = from[i];
        ++i; 
    }
}

void reverse(char str[], int length)
{
    char *copystr = str;
    int i=0;
    while(true){
        if(length % 2 != 0 && i>length/2) break;
        if(length % 2 == 0 && i==length/2) break;
        char curr = *(copystr + i);
        char oposite = *(copystr + (length-1-i));
        str[i] = oposite;
        str[length-i-1] = curr;
        ++i;
    }
}