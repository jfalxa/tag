import _map from 'lodash/map';

import * as ops from './operations';


const compl =
{
    and : 'or',
    or  : 'and'
};


export function compute( operation, groups )
{
    if ( !ops[operation] )
    {
        return null;
    }

    return ops[operation]( ...groups );
}


export function computeNot( operation, groups )
{
    if ( !ops[operation] )
    {
        return null;
    }

    const notGroups     = _map( groups, '1' );
    const complementary = compl[operation];

    return ['not', ops[complementary]( ...notGroups )];
}


export function combine( operation, groups, notGroups )
{
    const group    = groups[0];
    const notGroup = notGroups[0][1];

    return ops[operation + '_not']( group, notGroup );
}
