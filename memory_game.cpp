#include <iostream>
using namespace std;

// Declare the playGame function (defined in game_logic.cpp)
void playGame();

int main() {
    cout << "Welcome to the Memory Matching Game!\n";
    cout << "Try to find all matching pairs in the grid.\n";
    cout << "Good luck!\n" << endl;

    // Start the game
    playGame();

    return 0;
}
