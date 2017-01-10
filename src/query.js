import _ from 'lodash';

import db               from 'src/db';
import parse            from 'src/parse';
import { bench, print } from 'src/utils';


const ops =
{
    c :
    {
        and : 'or',
        or  : 'and'
    },

    and( ...groups )
    {
        return _.intersection( ...groups );
    },

    or( ...groups )
    {
        return _.union( ...groups );
    },

    nand( ...groups )
    {
        return ['not', ops.and( ...groups )];
    },

    nor( ...groups )
    {
        return ['not', ops.or( ...groups )];
    }
};


function compute( operation, groups )
{
    if ( !ops[operation] )
    {
        return [operation, ...groups];
    }

    return ops[operation]( ...groups );
}


function separate( groups )
{
    return _.partition( groups, group => _.isNumber( group[0] ) );
}


function operate( operation, ok, not, others )
{
    const params = [];

    if ( ok.length > 0 ) params.push( ok );
    if ( not.length > 0 ) params.push( not );

    params.push( ...others );

    return [operation, ...params];
}


// combine everything that is combinable recursively (aka everything but NOT)
function preprocess( query )
{
    // if we reach a group node
    if ( _.isString( query ) )
    {
        return db.get( 'group_docs', query );
    }

    // else we're in an operation
    const [operation, ...operands] = query;

    // run preprocess on the operands for recursivity
    const operandGroups = _.map( operands, preprocess );

    // separate the precomputed groups from the ones that need later processing
    const [groups, otherGroups] = separate( operandGroups );

    // compute the currently possible operation
    const combinedGroup = compute( operation, groups );

    return ( otherGroups.length > 0 )
        ? operate( operation, combinedGroup, [], otherGroups )
        : combinedGroup;
}


// apply computations to preprocessed data
function process( preprocessed )
{
    if ( _.isNumber( preprocessed[0] ) )
    {
        return preprocessed;
    }

    // decompose the operation
    const [operation, ...operands] = preprocessed;

    const groups = _.map( operands, process );

    switch (operation)
    {
        case 'add':

            break;

    }
}


export default function runQuery( query )
{
    let res, pre, parsed;

    bench( 'parse', () => ( parsed = parse( query ) ) );
    bench( 'preprocess', () => ( pre = preprocess( parsed ) ) );
    bench( 'process', () => ( res = process( pre ) ) );

    console.log();
    console.log( query, '->', parsed );
    console.log();
    print( pre );
}
