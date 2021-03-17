#include <iostream>
using namespace std;

// Placed the Gauss Easter Algorithmy directly 
// into main function
int main(){
    int Y = 2021;
    float A, B, C, P, Q,
        M, N, D, E;
    // All calculations done on the basis of
    // Gauss Easter Algorithm
    A = Y % 19;
    B = Y % 4;
    C = Y % 7;
    P = (float)floor(Y / 100);
    Q = (float)floor((13 + 8 * P) / 25);
    M = (int)(15 - Q + P - P / 4) % 30;
    N = (int)(4 + P - P / 4) % 7;
    D = (int)(19 * A + M) % 30;
    E = (int)(2 * B + 4 * C + 6 * D + N) % 7;
    int days = (int)(22 + D + E);
    // A corner case,
    // when D is 29
    if ((D == 29) && (E == 6)) {
        cout << Y << "-04-19" << "\n";
        return 1;
    }
    // Another corner case,
    // when D is 28
    else if ((D == 28) && (E == 6)) {
        cout << Y << "-04-18" << "\n";
        return 1;
    }
    else {
        // If days > 31, move to April
        // April = 4th Month
        if (days > 31) {
            cout << Y << "-04-"
                 << (days - 31) << "\n";
            return 1;
        }
        else {
            // Otherwise, stay on March
            // March = 3rd Month
            cout << Y << "-03-"
                 << days << "\n";
            return 1;
        }
    }
}