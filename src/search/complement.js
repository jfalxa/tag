import { op } from 'src/constants';


export function complement( query )
{
    return [op.NOT, query];
}


export function isComplement( query )
{
    return ( query instanceof Array ) && ( query[0] === op.NOT );
}
