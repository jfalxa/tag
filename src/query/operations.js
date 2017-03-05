import _union        from 'lodash/union';
import _difference   from 'lodash/difference';
import _intersection from 'lodash/intersection';

import { complement, isComplement } from '../utils/complement';


export function and( left, right )
{
    // left AND NOT right
    if ( !isComplement( left ) && isComplement( right ) )
    {
        // A ∩ Bc = A \ B
        return _difference( left, right[1] );
    }

    // NOT left AND right
    else if ( isComplement( left ) && !isComplement( right ) )
    {
        // Ac ∩ B = B \ A
        return _difference( right, left[1] );
    }

    // NOT left AND NOT right
    else if ( isComplement( left ) && isComplement( right ) )
    {
        // Ac ∩ Bc = (A ∪ B)c
        return complement( or( left[1], right[1] ) );
    }

    // left AND right
    else
    {
        // A ∩ B
        return _intersection( left, right );
    }
}


export function or( left, right )
{
    // left OR NOT right
    if ( !isComplement( left ) && isComplement( right ) )
    {
        // A ∪ Bc = (Ac ∩ B)c
        return complement( and( complement( left ), right[1] ) );
    }

    // NOT left OR right
    else if ( isComplement( left ) && !isComplement( right ) )
    {
        // Ac ∪ B = (A ∩ Bc)c
        return complement( and( left[1], complement( right ) ) );
    }

    // NOT left OR NOT right
    else if ( isComplement( left ) && isComplement( right ) )
    {
        // Ac ∪ Bc = (A ∩ B)c
        return complement( and( left[1], right[1] ) );
    }

    // left OR right
    else
    {
        // A ∪ B
        return _union( left, right );
    }
}
