import _union        from 'lodash/union';
import _difference   from 'lodash/difference';
import _intersection from 'lodash/intersection';



export function and( ...groups )
{
    return _intersection( ...groups );
}


export function or( ...groups )
{
    return _union( ...groups );
}


export function and_not( group, notGroup )
{
    return _difference( group, notGroup );
}


export function or_not( group, notGroup )
{
    // const rest = and_not( [], notGroup );
    // return _union( group, rest );
    return ['not', and_not( notGroup, group )];
}
