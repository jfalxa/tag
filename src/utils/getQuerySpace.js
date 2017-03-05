import _flatMap from 'lodash/flatMap';

import isLeaf from './isLeaf';


export default function getQueryVector( [_, ...operands] )
{
    return _flatMap( operands, operand =>
    (
        isLeaf( operand )
            ? operand
            : getQueryVector( operand )
    ) ); 
}
