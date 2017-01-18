export default class Item{
    constructor(public name: string, public totalUses: number, public lastUseIdx: number, public associations?: number){
        if(!associations)
            this.associations = 0;
    }
}