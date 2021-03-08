import { GameBoard } from "./game-board";

export interface User {
    name : string;
    games : GameBoard[] | null;
}
