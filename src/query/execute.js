import isLeaf          from '../utils/isLeaf';
import * as operations from './operations';

import { complement, eliminateNegations, isComplement } from '../utils/complement';


export default function execute( query, data )
{
    if ( isLeaf( query ) )
    {
        // once we reach leaves, we can actually feed data to the algorithm
        return data[query];
    }
    else if ( isComplement( query ) )
    {
        // execute any query that is inside a NOT node
        return complement( execute( query[1], data ) );
    }

    // decompose the binary tree of this query
    const [operator, left, right] = query;

    // recursively call execute in order to get results from nested queries
    const leftResult  = execute( left, data );
    const rightResult = execute( right, data );

    // combine the results from both children using the query's operator
    const result = operations[operator]( leftResult, rightResult );

    // and remove any double negation
    return eliminateNegations( result );
}
