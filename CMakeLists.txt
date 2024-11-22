cmake_minimum_required(VERSION 3.10)

project(MemoryGame)

set(CMAKE_CXX_STANDARD 11)

# Add executable
add_executable(MemoryGame main.cpp game_logic.cpp)
