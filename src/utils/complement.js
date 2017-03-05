import { NOT } from '../constants/operators';


export function isComplement( query )
{
    return ( query instanceof Array ) && ( query[0] === NOT );
}


export function complement( query )
{
    return [NOT, query];
}


export function eliminateNegations( query )
{
    return ( isComplement( query ) && isComplement( query[1] ) )
        ? eliminateNegations( query[1][1] )
        : query;
}
