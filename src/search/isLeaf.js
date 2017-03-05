import { isComplement } from './complement';


function isSet( query )
{
    return ( typeof query === 'string' );
}


export default function isLeaf( query )
{
    return isComplement( query )
        ? isSet( query[1] )
        : isSet( query );
}
