# Exercise 1 : Conway’s Game of Life
import time
from copy import deepcopy


class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
       
        self.rows = rows
        self.cols = cols
        # Initialize grid with all dead cells
        self.grid = [[0]*cols for _ in range(rows)]
        if initial_state:
            for r, c in initial_state:
                if 0 <= r < rows and 0 <= c < cols:
                    self.grid[r][c] = 1

    def count_neighbors(self, r, c):
        count = 0
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                if dr == 0 and dc == 0:
                    continue
                nr, nc = r + dr, c + dc
                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    count += self.grid[nr][nc]
        return count

    def step(self):
        new_grid = deepcopy(self.grid)
        for r in range(self.rows):
            for c in range(self.cols):
                live = self.grid[r][c] == 1
                neighbors = self.count_neighbors(r, c)
                if live and neighbors < 2:            # 1:underpopulation
                    new_grid[r][c] = 0
                elif live and neighbors in (2, 3):    # 2:lives on
                    new_grid[r][c] = 1
                elif live and neighbors > 3:          # 3:overpopulation
                    new_grid[r][c] = 0
                elif not live and neighbors == 3:     # 4:reproduction
                    new_grid[r][c] = 1
        self.grid = new_grid

    def display(self):
        for r in range(self.rows):
            line = "".join("█" if self.grid[r][c] else "." for c in range(self.cols))
            print(line)
        print()  
        
    def is_stable_or_empty(self, prev_grid):
        return self.grid == prev_grid or all(all(x == 0 for x in row) for row in self.grid)

    def run(self, generations=50, delay=0.1, stop_when_stable=True):
        last = None
        for gen in range(1, generations+1):
            print(f"Generation {gen}")
            self.display()
            time.sleep(delay)
            prev = deepcopy(self.grid)
            self.step()
            if stop_when_stable and (self.is_stable_or_empty(prev) or self.grid == prev == last):
                print("Game ended (stable/empty or short cycle).")
                self.display()
                break
            last = prev


def glider(top=1, left=1):
    return [(top, left+1), (top+1, left+2), (top+2, left), (top+2, left+1), (top+2, left+2)]

def blinker(top=2, left=2):
    return [(top, left), (top, left+1), (top, left+2)]
# hadi kat3ti ghir les positions initiales dyal cellules dyal blinker
# machi hiya liktharak les cellules, elle sert juste à fournir l’état de départ du jeu
    
def block(top=2, left=2):
    return [(top, left), (top, left+1), (top+1, left), (top+1, left+1)]
    #kib9a tabat

if __name__ == "__main__":
    init = glider(1, 1) + blinker(4, 4) + block(7, 7)

    game = GameOfLife(10, 10, initial_state=init)
    game.run(generations=100, delay=0.3, stop_when_stable=True)