# -*- coding: utf-8 -*-
"""
Created on Thu May  7 10:54:22 2020

@author: pablo
"""

import numpy as np

sudoku = [[0,0,0,0,0,0,0,0,0],
          [5,9,3,0,0,0,0,0,0],
          [0,0,0,7,0,0,1,0,4],
          [0,0,0,0,0,0,0,0,0],
          [0,4,1,6,0,0,0,2,0],
          [0,0,2,0,0,3,7,0,0],
          [0,0,8,1,5,6,0,0,9],
          [1,0,0,4,7,0,0,0,3],
          [0,0,0,3,2,0,0,1,0]]

def possible(x,y,n):
    global sudoku
    for i in range(0,9):
        if (sudoku[y][i] == n):
            return False
        
    for i in range(0,9):
        if (sudoku[i][x] == n):
            return False
        
    x_box = (x//3)*3
    y_box = (y//3)*3
    
    for i in range(0,3):
        for j in range(0,3):
            if sudoku[y_box + i][x_box + j] == n:
                return False
    return True
    
def solve():
    global sudoku
    for y in range(9):
        for x in range(9):
            if sudoku[y][x] == 0:
                for n in range(1,10):
                    if possible(x,y,n):
                        sudoku[y][x] = n
                        solve()
                        sudoku[y][x] = 0
                return
    print(np.matrix(sudoku))
    input('Press enter for more solutions')
    
                        