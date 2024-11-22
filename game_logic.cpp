#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>
#ifdef _WIN32
#include <windows.h> // For Sleep() on Windows
#else
#include <unistd.h> // For sleep() on Unix-based systems
#endif

using namespace std;

// Define the grid size
const int GRID_SIZE = 4;

// Arrays to store card values and flipped status
vector<int> cards(GRID_SIZE * GRID_SIZE); // Array to store card values
vector<bool> flipped(GRID_SIZE * GRID_SIZE, false); // Array to track flipped cards

// Function to shuffle cards
void shuffleCards() {
    // Fill the cards with pairs of numbers (1-8)
    for (int i = 0; i < (GRID_SIZE * GRID_SIZE) / 2; i++) {
        cards[i] = i + 1;
        cards[i + (GRID_SIZE * GRID_SIZE) / 2] = i + 1;
    }

    // Shuffle the cards randomly
    srand(time(0));
    for (int i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        int j = rand() % (GRID_SIZE * GRID_SIZE);
        swap(cards[i], cards[j]);
    }
}

// Function to print the current state of the board
void printBoard() {
    cout << "\nCurrent Board State:\n";
    for (int i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        if (flipped[i]) {
            cout << cards[i] << " ";
        } else {
            cout << "* ";
        }

        if ((i + 1) % GRID_SIZE == 0) {
            cout << endl;
        }
    }
    cout << endl;
}

// Manual delay implementation
void manualDelay(int seconds) {
    for (int i = seconds; i > 0; --i) {
        cout << "Waiting: " << i << " seconds remaining...\r";
        cout.flush();
#ifdef _WIN32
        Sleep(1000); // Windows-specific delay (milliseconds)
#else
        sleep(1); // Unix-based delay (seconds)
#endif
    }
}

// Function to flip two cards and check if they match
bool flipCards(int first, int second) {
    // Temporarily reveal the cards
    flipped[first] = true;
    flipped[second] = true;

    // Show the current board state with flipped cards
    printBoard();

    if (cards[first] == cards[second]) {
        cout << "Match found!" << endl;
        return true;
    } else {
        cout << "No match. The cards will flip back." << endl;

        // Use manual delay instead of this_thread::sleep_for
        manualDelay(1);

        flipped[first] = false;
        flipped[second] = false;
        return false;
    }
}

// Main game loop
void playGame() {
    shuffleCards();
    int moves = 0;
    int pairsFound = 0;

    while (pairsFound < (GRID_SIZE * GRID_SIZE) / 2) {
        printBoard();

        int first, second;
        cout << "Enter the first card index (0 to " << (GRID_SIZE * GRID_SIZE) - 1 << "): ";
        cin >> first;
        cout << "Enter the second card index (0 to " << (GRID_SIZE * GRID_SIZE) - 1 << "): ";
        cin >> second;

        // Validate user input
        if (first >= 0 && first < GRID_SIZE * GRID_SIZE && second >= 0 && second < GRID_SIZE * GRID_SIZE && first != second) {
            if (!flipped[first] && !flipped[second]) {
                bool match = flipCards(first, second);
                moves++;
                if (match) {
                    pairsFound++;
                }
            } else {
                cout << "One or both cards are already flipped. Choose different cards." << endl;
            }
        } else {
            cout << "Invalid card indices or duplicate indices. Please try again." << endl;
        }
    }

    cout << "Congratulations! You found all the pairs in " << moves << " moves!" << endl;
}


