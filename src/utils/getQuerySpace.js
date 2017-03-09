import _uniq    from 'lodash/uniq';
import _flatMap from 'lodash/flatMap';

import isLeaf from './isLeaf';


function toQuerySpace( operand )
{
    return isLeaf( operand )
        ? operand
        : getQuerySpace( operand );
}


export default function getQuerySpace( query )
{
    if ( typeof query === 'string' )
    {
        return [query];
    }

    return _uniq( _flatMap( query.slice( 1 ), toQuerySpace ) );
}
