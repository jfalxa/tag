import test from 'ava';

import { eliminateNegations } from 'src/utils/complement';


// NOT NOT NOT NOT NOT NOT NOTNOTNTONTONTOTNTOTNOTASCSLSAMAKFMKAOA

const A = [0];


test( 'eliminateNegations: A', t =>
{
    t.deepEqual( eliminateNegations( A ), A );
} );


test( 'eliminateNegations: not A', t =>
{
    t.deepEqual( eliminateNegations( ['not', A] ), ['not', A] );
} );


test( 'eliminateNegations: not not A', t =>
{
    t.deepEqual( eliminateNegations( ['not', ['not', A]] ), A );
} );


test( 'eliminateNegations: not not not A', t =>
{
    t.deepEqual( eliminateNegations( ['not', ['not', ['not', A]]] ), ['not', A] );
} );


test( 'eliminateNegations: not not not not A', t =>
{
    t.deepEqual( eliminateNegations( ['not', ['not', ['not', ['not', A]]]] ), A );
} );
