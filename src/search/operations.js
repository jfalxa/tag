import _union        from 'lodash/union';
import _difference   from 'lodash/difference';
import _intersection from 'lodash/intersection';

import { complement, isComplement } from './complement';


export function and( left, right )
{
    // left AND NOT right
    if ( !isComplement( left ) && isComplement( right ) )
    {
        return _difference( left, right[1] );
    }

    // NOT left AND right
    else if ( isComplement( left ) && !isComplement( right ) )
    {
        return _difference( right, left[1] );
    }

    // NOT left AND NOT right
    else if ( isComplement( left ) && isComplement( right ) )
    {
        return complement( or( left[1], right[1] ) );
    }

    // left AND right
    else
    {
        return _intersection( left, right );
    }
}


export function or( left, right )
{
    // left OR NOT right
    if ( !isComplement( left ) && isComplement( right ) )
    {
        return complement( and( complement( left ), right[1] ) );
    }

    // NOT left OR right
    else if ( isComplement( left ) && !isComplement( right ) )
    {
        return complement( and( left[1], complement( right ) ) );
    }

    // NOT left OR NOT right
    else if ( isComplement( left ) && isComplement( right ) )
    {
        return complement( and( left[1], right[1] ) );
    }

    // left OR right
    else
    {
        return _union( left, right );
    }
}
