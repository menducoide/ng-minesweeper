import { Injectable } from '@angular/core';
import { Difficulty } from '../models/difficulty';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor() { }

  getDifficulties() : Difficulty[] {
    let id = 1;
    return  [
      { xLenght: 8, yLenght: 8, label: "Beginner", id: id++, mines: 10 },
      { xLenght: 16, yLenght: 16, label: "Medium", id: id++, mines: 40 },
      { xLenght: 30, yLenght: 16, label: "Expert", id: id++, mines: 99 },
    ];
  }
}
