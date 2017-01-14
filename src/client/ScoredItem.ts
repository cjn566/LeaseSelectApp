/**
 * Created by intern04 on 1/12/2017.
 */

import Item from '../item'

enum Location{
    SuggestionPool,
    SuggestionList,
    FreshAccept,
    StaleAccept
}

export default class ScoredItem extends Item{
    score: number;
    location: Location;
}