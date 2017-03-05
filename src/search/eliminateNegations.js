import { isComplement } from './complement';


export default function eliminateNegations( query )
{
    return ( isComplement( query ) && isComplement( query[1] ) )
        ? eliminateNegations( query[1][1] )
        : query;
}
