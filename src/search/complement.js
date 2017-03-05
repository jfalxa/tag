import { NOT } from 'src/constants/operators';


export function complement( query )
{
    return [NOT, query];
}


export function isComplement( query )
{
    return ( query instanceof Array ) && ( query[0] === NOT );
}
