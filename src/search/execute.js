import isLeaf                       from './isLeaf';
import eliminateNegations           from './eliminateNegations';
import * as operations              from './operations';
import { complement, isComplement } from './complement';


export default function execute( query, data )
{
    if ( isLeaf( query ) )
    {
        // once we reach leaves, we can actually feed data to the algorithm
        return data[query];
    }
    else if ( isComplement( query ) )
    {
        // execute a complement's base set to actually grab its data
        return complement( execute( query[1], data ) );
    }

    const [operator, left, right] = query;

    // recursively call execute in order to get results from nested queries
    const leftResult  = execute( left, data );
    const rightResult = execute( right, data );

    // combine the results from both children using the query's operator
    const result = operations[operator]( leftResult, rightResult );

    // and remove any double negation
    return eliminateNegations( result );
}
