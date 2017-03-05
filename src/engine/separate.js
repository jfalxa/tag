import _partition from 'lodash/partition';
import _isEmpty   from 'lodash/isEmpty';
import _isNumber  from 'lodash/isNumber';


function isSet( group )
{
    return _isEmpty( group ) || _isNumber( group[0] );
}


export function separate( groups )
{
    return _partition( groups, isSet );
}


export function separateNot( otherGroups )
{
    return _partition( otherGroups, group => ( group[0] === 'not' ) );
}
