import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifegame',
  templateUrl: './lifegame.component.html',
  styleUrls: ['./lifegame.component.css']
})
export class LifegameComponent implements OnInit {
  openIntroModal:boolean=true;
  openMenu:boolean=false;
  grid: boolean[][] = [];
  cols = 255;
  rows = 100;
  intervalId: NodeJS.Timer | null = null;
  gridConfig1 : [number,number][]=[
              [3,10],[3,11],[4,11],[4,10],[13,10],
              [13,11],[13,12],[14,13],[14,9],[15,8],[16,8],[15,14],[16,14],
              [17,11],[18,9],[19,10],[19,12],[19,11],[18,13],[20,11],[23,10],[23,9],
              [23,8],[24,8],[24,9],[24,10],[25,7],[25,11],[27,11],[27,12],[27,7],[27,6],
              [37,8],[37,9],[38,9],[38,8]];
  gridConfig2: [number,number][]=[
    [56, 34], [57, 34], [56, 35], [57, 35],
    [66, 34], [66, 35], [66, 36],
    [67, 33], [68, 32], [69, 32], [67, 37], [68, 38], [69, 38], [70, 35],
    [71, 34], [71, 35], [71, 36], [72, 35],
    [76, 31], [76, 32], [76, 33], [77, 31], [77, 32], [77, 33], [78, 30], [78, 34],
    [80, 29], [80, 30], [80, 34], [80, 35],
    [90, 31], [90, 32], [91, 31], [91, 32]
    // [0,18],[0,19],[0,25],[0,26],[1,18],[1,19],[1,25],
    // [1,26],[15,20],[15,24],[16,20],[16,24],[18,17],[18,18],
    // [18,20],[18,24],[18,26],[18,27],[19,18],[19,19],[19,20],
    // [19,24],[19,25],[19,26],[20,19],[20,25],[30,15],[30,16],[30,17],
    // [30,21],[30,22],[30,23],[31,14],[31,17],[31,21],[31,24],[32,14],[32,15],
    // [32,17],[32,21],[32,23],[32,24],[48,15],[48,16],[48,23],[48,24],[49,15],
    // [49,16],[49,23],[49,24]
  ];
  gridConfig3: [number,number][]=[
    [26,22],[26,24],[27,25],[28,21],[28,25],
    [29,21],[29,25],[30,25],[31,22],[31,25],
    [32,23],[32,24],[32,25]
  ];
  gridConfig4: [number,number][]=[
    [45,25],[45,26],[46,23],[46,28],
    [47,22],[47,29],[48,21],[48,30],
    [49,21],[49,30],[50,21],[50,30],[51,22]
    ,[51,29],[52,23],[52,28],[53,25],[53,26]
  ];
  planeur: [number, number][] = [
    [57, 29], [58, 30], [59, 28], [59, 29], [59, 30]
  ];
  clignotant: [number, number][] = [
    [29, 57], [29, 58], [29, 59]
  ];
  
bloc: [number, number][] = [
  [57, 29], [58, 29], [57, 30], [58, 30]
];

vaisseauLeger: [number, number][] = [
  [57, 28], [58, 28], [59, 28], [60, 28],
  [56, 29], [60, 29],
  [60, 30],
  [56, 31], [59, 31]
];

vaisseauMoyen: [number, number][] = [
  [59, 28], [60, 28], [61, 28], [62, 28],
  [58, 29], [62, 29],
  [62, 30],
  [58, 31], [61, 31]
];

puffeur: [number, number][] = [
  [57, 30],
  [58, 30],
  [59, 30],
  [59, 29],
  [58, 28]
];

canonPlaneurs: [number, number][] = [
  [56, 34], [57, 34], [56, 35], [57, 35],
  [66, 34], [66, 35], [66, 36],
  [67, 33], [68, 32], [69, 32], [67, 37], [68, 38], [69, 38], [70, 35],
  [71, 34], [71, 35], [71, 36], [72, 35],
  [76, 31], [76, 32], [76, 33], [77, 31], [77, 32], [77, 33], [78, 30], [78, 34],
  [80, 29], [80, 30], [80, 34], [80, 35],
  [90, 31], [90, 32], [91, 31], [91, 32]
];

canonVaisseauxLeger: [number, number][] = [
  [55, 37], [56, 37], [56, 38], [57, 36], [58, 36], [59, 36], [59, 35], [60, 38], [60, 34],
  [67, 35], [67, 34], [67, 33], [68, 35], [68, 34], [68, 33], [69, 36], [69, 32], [70, 36],
  [71, 33], [71, 37], [72, 32], [72, 33], [72, 37], [72, 38], [73, 36], [73, 37],
  [76, 31], [76, 32], [77, 31]
];

canonVaisseauxMoyen: [number, number][] = [
  [55, 35], [55, 36], [56, 34], [56, 36], [57, 34], [57, 35], [57, 43], [57, 44], [58, 42],
  [58, 45], [59, 41], [59, 42], [59, 45], [59, 46], [60, 45], [63, 38], [63, 39], [64, 37],
  [64, 40], [65, 36], [65, 37], [66, 36], [66, 42], [67, 36], [67, 38], [67, 40],
  [68, 36], [68, 37], [69, 38]
];

piecePersane: [number, number][] = [
  [54, 36], [54, 37], [55, 35], [55, 36], [55, 37], [56, 35], [56, 36]
];
gliderGun: [number, number][] = [
    [0, 0], [1, 0], [2, 0],
    [0, 2], [2, 2],
    [0, 3], [1, 3], [2, 3],
    [5, 6], [6, 6], [7, 6],
    [5, 7], [7, 7],
    [5, 8], [6, 8], [7, 8],
    [5, 10], [6, 10], [7, 10],
    [10, 5], [11, 5], [12, 5],
    [10, 7], [12, 7],
    [10, 8], [11, 8], [12, 8],
    [10, 12], [11, 12],
    [16, 11], [17, 11],
    [16, 12], [18, 12],
    [16, 13], [18, 13],
    [20, 17], [21, 17], [22, 17],
    [20, 18], [22, 18],
    [20, 19], [21, 19], [22, 19],
    [20, 21], [21, 21], [22, 21],
    [26, 16], [27, 16], [28, 16],
    [26, 17], [28, 17],
    [26, 18], [27, 18], [28, 18],
    [26, 22], [27, 22], [28, 22]
  
];
  
  ngOnInit() {
    this.openIntroModal=true;
    this.initializeGrid();
    // this.AddEvt();
    this.ConfigGrid(this.gridConfig4);
  }
  see(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if(this.grid[i][j] ==true) {
          console.log("["+i+","+j+"]");
        };
      }
    }
  }
  initializeGrid() {
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = false;
      }
    }
  }
  // AddEvt(){
  //   let array:[number, number][]=[];
  //   let selectedOption : string;
  //   var selectElement = document.getElementById("select") as HTMLSelectElement;
  //   selectElement!.addEventListener("change", function() {
  //         selectedOption = selectElement.value;
  //         for (const variableName in this) {
  //           if (this[variableName] as unknown === selectedOption) {
  //             array= this[variableName] as unknown as [number, number][];
  //           }
  //         }
  //     });
  //     this.ConfigGrid(array);
      
  //   }
  
  ConfigGrid(array:[number,number][]){
        for (let k = 0; k < array.length; k++) {
          const [x, y]:[number,number]= array[k];
          // Vérification si les coordonnées sont valides
          if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[x].length) {
            // Mise à true de la valeur correspondante dans le tableau de booléens
            this.grid[x][y] = true;
          }
        }
      }
  onConfigChange(event:any) {
        const selectedConfig = event.target.value;
        this.initializeGrid(); // Remet la grille à zéro
        switch (selectedConfig) {
          case "gridConfig1":
            this.ConfigGrid(this.gridConfig1);
            break;
          case "gridConfig2":
            this.ConfigGrid(this.gridConfig2);
            break;
          case "gridConfig3":
            this.ConfigGrid(this.gridConfig3);
            break;
          case "planeur":
            this.ConfigGrid(this.planeur);
            break;
          case "clignotant":
            this.ConfigGrid(this.clignotant);
            break;
          case "bloc":
            this.ConfigGrid(this.bloc);
            break;
          case "vaisseauLeger":
            this.ConfigGrid(this.vaisseauLeger);
            break;
          case "vaisseauMoyen":
            this.ConfigGrid(this.vaisseauMoyen);
            break;
          case "gridConpuffeurfig4":
            this.ConfigGrid(this.puffeur);
            break;
          case "canonPlaneurs":
            this.ConfigGrid(this.canonPlaneurs);
            break;
          case "canonVaisseauxLeger":
            this.ConfigGrid(this.canonVaisseauxLeger);
            break;
          case "canonVaisseauxMoyen":
            this.ConfigGrid(this.canonVaisseauxMoyen);
            break;
          case "piecePersane":
            this.ConfigGrid(this.piecePersane);
            break;
          case "gliderGun":
            this.ConfigGrid(this.gliderGun);
            break;
          default:
            break;
        }
      }
        
 
  RandomizeGrid(){
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        let nb =Math.floor(Math.random() * 4);
        if(nb==1) this.grid[i][j] = true;
        else this.grid[i][j] = false; 
      }
    }
  }

  toggleCellState(row: number, col: number) {
    this.grid[row][col] = !this.grid[row][col];
    console.log(this.grid[row][col] + " row :"+ row + "col:"+ col);

  }

  startGame() {
    this.intervalId = setInterval(() => this.updateGrid(), 100);
  }

  stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateGrid() {
    const nextGrid: boolean[][] = [];
    for (let i = 0; i < this.rows; i++) {
      nextGrid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const aliveNeighbours = this.countAliveNeighbours(i, j);
        if (this.grid[i][j]) {
          nextGrid[i][j] = aliveNeighbours === 2 || aliveNeighbours === 3;
        } else {
          nextGrid[i][j] = aliveNeighbours === 3;
        }
      }
    }

    this.grid = nextGrid;
  }

  countAliveNeighbours(row: number, col: number): number {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          count += this.grid[newRow][newCol] ? 1 : 0;
        }
      }
    }

    return count;
  }

  getGridCol(index:number):number{
    return index+1;
  }
  getGridRow(index:number):number{
    return index+1;
  }
  CloseModale(){
    this.openIntroModal=false;
  }
  CloseMenu(){
    this.openMenu=false;
  }
  OpenMenu() {
    this.openMenu=true;
  }
  
}
