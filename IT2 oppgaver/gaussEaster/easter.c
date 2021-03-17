#include <stdio.h>
#include <math.h>

void gaussEaster(int Y);

int main() {
    gaussEaster(2020);
    return 1;
}

void gaussEaster(int Y){
    float A, B, C, P, Q,
        M, N, D, E;
    // All calculations done on the basis of
    // Gauss Easter Algorithm
    A = Y % 19;
    B = Y % 4;
    C = Y % 7;
    P = (double)floor(Y / 100);
    Q = (double)floor((13 + 8 * P) / 25);
    M = (int)(15 - Q + P - P / 4) % 30;
    N = (int)(4 + P - P / 4) % 7;
    D = (int)(19 * A + M) % 30;
    E = (int)(2 * B + 4 * C + 6 * D + N) % 7;
    int days = (int)(22 + D + E);
    // A corner case,
    // when D is 29
    if ((D == 29) && (E == 6)) {
        printf("%d-04-19\n", Y);
        return;
    }
    // Another corner case,
    // when D is 28
    else if ((D == 28) && (E == 6)) {
        printf("%d-04-18\n", Y);
        return;
    }
    else {
        // If days > 31, move to April
        // April = 4th Month
        if (days > 31) {
            printf("%d-04-%d\n", Y, days-31);
            return;
        }
        else {
            // Otherwise, stay on March
            // March = 3rd Month
            printf("%d-03-%d\n", Y, days);
            return;
        }
    }
}