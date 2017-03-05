import test from 'ava';

import { and, or } from 'src/query/operations';


const A = [1, 2, 3, 4];
const B = [3, 4, 5, 6];


test( 'operations: A and B', t =>
{
    const operation = and( A, B );
    const result    = [3, 4];

    t.deepEqual( operation, result );
} );


test( 'operations: A or B', t =>
{
    const operation = or( A, B );
    const result    = [1, 2, 3, 4, 5, 6];

    t.deepEqual( operation, result );
} );


test( 'operations: A and not B', t =>
{
    const operation = and( A, ['not', B] );
    const result    = [1, 2];

    t.deepEqual( operation, result );
} );


test( 'operations: not A and B', t =>
{
    const operation = and( ['not', A], B );
    const result    = [5, 6];

    t.deepEqual( operation, result );
} );


test( 'operations: not A and not B', t =>
{
    const operation = and( ['not', A], ['not', B] );
    const result    = ['not', [1, 2, 3, 4, 5, 6]];

    t.deepEqual( operation, result );
} );


test( 'operations: A or not B', t =>
{
    const operation = or( A, ['not', B] );
    const result    = ['not', [5, 6]];

    t.deepEqual( operation, result );
} );


test( 'operations: not A or B', t =>
{
    const operation = or( ['not', A], B );
    const result    = ['not', [1, 2]];

    t.deepEqual( operation, result );
} );


test( 'operations: not A or not B', t =>
{
    const operation = or( ['not', A], ['not', B] );
    const result    = ['not', [3, 4]];

    t.deepEqual( operation, result );
} );
