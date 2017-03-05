import isLeaf                       from './isLeaf';
import * as operations              from './operations';
import { complement, isComplement } from './complement';


function load( query, data )
{
    return isComplement( query )
        ? complement( data[query[1]] )
        : data[query];
}


export default function execute( query, data )
{
    if ( isLeaf( query ) )
    {
        return load( query, data );
    }
    else if ( isComplement( query ) )
    {
        return complement( execute( query[1], data ) );
    }

    const [operator, left, right] = query;

    const leftResult  = execute( left, data );
    const rightResult = execute( right, data );

    return operations[operator]( leftResult, rightResult );
}
