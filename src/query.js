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
    }
};


function compute( operation, groups )
{
    if ( !ops[operation] )
    {
        return null;
    }

    return ops[operation]( ...groups );
}


function computeNot( operation, groups )
{
    if ( !ops[operation] )
    {
        return null;
    }

    const notGroups     = _.map( groups, '1' );
    const complementary = ops.c[operation];

    return ['not', ops[complementary]( ...notGroups )];
}


function isSet( group )
{
    return _.isEmpty( group ) || _.isNumber( group[0] );
}


function separate( groups )
{
    return _.partition( groups, isSet );
}


function separateNot( otherGroups )
{
    return _.partition( otherGroups, group => ( group[0] === 'not' ) );
}


function getParam( group, groups )
{
    return ( group !== null ) && !( _.isEmpty( groups ) )
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
function preprocess( query )
{
    // if we reach a group node
    if ( _.isString( query ) )
    {
        return db.get( 'group_docs', query ) || [];
    }

    // else we're in an operation
    const [operation, ...operands] = query;

    // run preprocess on the operands for recursivity
    const operandGroups = _.map( operands, preprocess );

    // separate the precomputed groups from the ones that need later processing
    const [groups, otherGroups]   = separate( operandGroups );
    const [notGroups, lastGroups] = separateNot( otherGroups );

    const res = operate( operation, groups, notGroups, lastGroups );
    console.log( 'resss>>>', res );

    return res;
}


// apply computations to preprocessed data
function process( preprocessed=[] )
{
    if ( _.isNumber( preprocessed[0] ) )
    {
        return preprocessed;
    }

    // decompose the operation
    const [operation, ...operands] = preprocessed;

    const groups = _.map( operands, process );
}


export default function runQuery( query )
{
    let res, pre, parsed;

    bench( 'parse', () => ( parsed = parse( query ) ) );
    bench( 'preprocess', () => ( pre = preprocess( parsed ) ) );
    bench( 'process', () => ( res = process( pre ) ) );

    console.log();
    console.log( '>>> query' );
    console.log( query, '->', parsed );
    console.log();
    console.log( '>>> preprocessed' );
    print( pre );
}
