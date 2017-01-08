export default class Item{
    constructor(private name: string, private totalUses: number, private lastUseIdx: number, private associations?: number){
        if(!associations)
            this.associations = 0;
    }
}