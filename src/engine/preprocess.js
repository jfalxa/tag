import _map       from 'lodash/map';
import _isEmpty   from 'lodash/isEmpty';
import _isString  from 'lodash/isString';

import { compute, computeNot }   from './compute';
import { separate, separateNot } from './separate';


function getParam( group, groups )
{
    return ( group !== null ) && ( !_isEmpty( groups ) )
        ? [group]
        : groups;
}


function operate( operation, groups, notGroups, otherGroups )
{
    // compute the currently possible operation
    const computedGroup    = compute( operation, groups );
    const computedNotGroup = computeNot( operation, notGroups );

    const groupParam    = getParam( computedGroup, groups );
    const notGroupParam = getParam( computedNotGroup, notGroups );

    const params =
    [
        ...groupParam,
        ...notGroupParam,
        ...otherGroups
    ];

    return ( params.length > 1 ) || ( operation === 'not' )
        ? [operation, ...params]
        : params[0];
}


// combine everything that is combinable recursively (aka everything but NOT)
export default function preprocess( query )
{
    // if we reach a group node
    if ( _isString( query ) )
    {
        return db.get( 'group_docs', query ) || [];
    }

    // else we're in an operation
    const [operation, ...operands] = query;

    // run preprocess on the operands for recursivity
    const operandGroups = _map( operands, preprocess );

    // separate the precomputed groups from the ones that need later processing
    const [groups, otherGroups]   = separate( operandGroups );
    const [notGroups, lastGroups] = separateNot( otherGroups );

    // build the object representing the preprocessed data
    return operate( operation, groups, notGroups, lastGroups );
}
