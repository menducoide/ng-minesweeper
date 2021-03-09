import { Difficulty } from "./difficulty";
import { GameCell } from "./game-cell";
import { GameRow } from "./game-row";

export interface GameBoard {
    rows : GameRow[];
    start : Date;
    end : Date | null;
    win : boolean;
    elapsedTime : number;
     difficulty : Difficulty;
}