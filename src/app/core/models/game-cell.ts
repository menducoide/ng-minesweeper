export interface GameCell 
{
    id : number;
    hasBomb: boolean;
    hasFlag : boolean;
    arroundBombs: number;
    selected: boolean;
    rowId: number;
}
