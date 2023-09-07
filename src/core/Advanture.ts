import { IAdventure, IChar, INote } from '../../../client/src/types/general';

export class Useradventure implements IAdventure{
    id: number;
    name: string;
    notes: INote[];
    character: IChar;
    creationDate: string;
    lastUpdate: string;
    constructor(adventure: IAdventure){
        this.id = adventure.id;
        this.name = adventure.name;
        this.notes = adventure.notes;
        this.character = adventure.character;
        this.creationDate = adventure.creationDate;
        this.lastUpdate = adventure.lastUpdate;
    }
}