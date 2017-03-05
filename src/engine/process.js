import _map      from 'lodash/map';
import _isEmpty  from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber';

import { separateNot }      from './separate';
import { compute, combine } from './compute';


// apply computations to preprocessed data
export default function process( preprocessed )
{
    if ( _isNumber( preprocessed[0] ) || preprocessed[0] === 'not' )
    {
        return preprocessed;
    }

    // decompose the operation
    const [operation, ...operands] = preprocessed;

    // process the data recursively
    const operandGroups = _map( operands, process );

    // check if there's some not groups
    const [notGroups, groups] = separateNot( operandGroups );

    if ( !_isEmpty( notGroups ) )
    {
        return combine( operation, groups, notGroups );
    }

    return compute( operation, ...groups );
}
