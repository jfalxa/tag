import test from 'ava';

import createParser  from 'src/parser';
import getQuerySpace from 'src/utils/getQuerySpace';


const parse = createParser();


test( 'getQuerySpace: A and B', t =>
{
    const query   = parse( 'A and B' );
    const results = ['A', 'B'];

    t.deepEqual( getQuerySpace( query ), results );
} );


test( 'getQuerySpace: A, B and C', t =>
{
    const query   = parse( 'A, B and C' );
    const results = ['A', 'B', 'C'];

    t.deepEqual( getQuerySpace( query ), results );
} );


test( 'getQuerySpace: A or not B', t =>
{
    const query   = parse( 'A or not B' );
    const results = ['A', 'B'];

    t.deepEqual( getQuerySpace( query ), results );
} );


test( 'getQuerySpace: A, (B and not B) and (C or B)', t =>
{
    const query   = parse( 'A, (B and not B) and (C or B)' );
    const results = ['A', 'B', 'C'];

    t.deepEqual( getQuerySpace( query ), results );
} );
