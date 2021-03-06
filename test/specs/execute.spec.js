import test from 'ava';

import createParser from 'src/parser';
import execute      from 'src/query/execute';
import toBinaryTree from 'src/utils/toBinaryTree';


const SETS =
{
    'A' : [0, 1, 2, 3, 4],
    'B' : [3, 4, 5, 6, 7],
    'C' : [6, 7, 8, 9],
    'D' : [0, 2, 4, 6, 8],
    'E' : [1, 3, 5, 7, 9],
    'F' : [2, 3, 5, 7]
};


const parse  = createParser();
const search = query => execute( toBinaryTree( parse( query ) ), SETS );



test( 'execute: A', t =>
{
    const query  = 'A';
    const result = [0, 1, 2, 3, 4];

    t.deepEqual( search( query ), result );
} );


test( 'execute: not A', t =>
{
    const query  = 'not A';
    const result = ['not', [0, 1, 2, 3, 4]];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A and B', t =>
{
    const query  = 'A and B';
    const result = [3, 4];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A, B or C', t =>
{
    const query  = 'A, B or C';
    const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A and not D', t =>
{
    const query  = 'A and not D';
    const result = [1, 3];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A and not (D or F)', t =>
{
    const query  = 'A and not (D or F)';
    const result = [1];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A or not B', t =>
{
    const query  = 'A or not B';
    const result = ['not', [5, 6, 7]];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A or not (B, C and not E)', t =>
{
    const query  = 'A or not (B, C and not E)';
    const result = ['not', [6]];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A or not (B, C and not E)', t =>
{
    const query  = 'A or not (B, C and not E)';
    const result = ['not', [6]];

    t.deepEqual( search( query ), result );
} );


test( 'execute: A or not (B, (not C or D) or (not E or F))', t =>
{
    // without eliminateNegations this one could generate a double negation
    const query  = 'A or not (B, (not C or D) or (not E or F))';
    const result = [0, 1, 2, 3, 4, 9];

    t.deepEqual( search( query ), result );
} );
