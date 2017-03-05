import _uniq    from 'lodash/uniq';
import _flatMap from 'lodash/flatMap';

import isLeaf from './isLeaf';


function toQuerySpace( operand )
{
    return isLeaf( operand )
        ? operand
        : getQuerySpace( operand );
}


export default function getQuerySpace( [_, ...operands] )
{
    return _uniq( _flatMap( operands, toQuerySpace ) );
}
