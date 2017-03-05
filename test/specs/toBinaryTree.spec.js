import test from 'ava';

import createParser from 'src/parser';
import toBinaryTree from 'src/search/toBinaryTree';


const parse = createParser();


test( 'toBinaryTree: "A and B"', t =>
{
    const query = parse( 'A and B' );
    const tree  = ['and', 'A', 'B'];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A and not B"', t =>
{
    const query = parse( 'A and not B' );
    const tree  = ['and', 'A', ['not', 'B']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A, B or C"', t =>
{
    const query = parse( 'A, B or C' );
    const tree  = ['or', 'A', ['or', 'B', 'C']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A, not B or C"', t =>
{
    const query = parse( 'A, not B or C' );
    const tree  = ['or', 'A', [ 'or', ['not', 'B'], 'C']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A and not (B, C or D)"', t =>
{
    const query = parse( 'A and not (B, C or D)' );
    const tree  = ['and', 'A', ['not', ['or', 'B', ['or', 'C', 'D']]]];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "not A, (B and C) or (D, E and F)"', t =>
{
    const query = parse( 'not A, (B and C) or (D, E and F)' );
    const tree  = ['or', ['not', 'A'], ['or', ['and', 'B', 'C'], ['and', 'D', ['and', 'E', 'F']]]];

    t.deepEqual( toBinaryTree( query ), tree );
} );
