import test         from 'ava';
import toBinaryTree from 'src/search/toBinaryTree';


test( 'toBinaryTree: "A and B"', t =>
{
    const query = ['and', 'A', 'B'];
    const tree  = ['and', 'A', 'B'];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A and not B"', t =>
{
    const query = ['and', 'A', ['not', 'B']];
    const tree  = ['and', 'A', ['not', 'B']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A, B or C"', t =>
{
    const query = ['or', 'A', 'B', 'C'];
    const tree  = ['or', 'A', ['or', 'B', 'C']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A or not B or C"', t =>
{
    const query = ['or', 'A', [ 'not', 'B'], 'C'];
    const tree  = ['or', 'A', [ 'or', ['not', 'B'], 'C']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A or not B or C"', t =>
{
    const query = ['or', 'A', [ 'not', 'B'], 'C'];
    const tree  = ['or', 'A', [ 'or', ['not', 'B'], 'C']];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "A and not (B, C or D)"', t =>
{
    const query = ['and', 'A', ['not', ['or', 'B', 'C', 'D']]];
    const tree  = ['and', 'A', ['not', ['or', 'B', ['or', 'C', 'D']]]];

    t.deepEqual( toBinaryTree( query ), tree );
} );


test( 'toBinaryTree: "not A, (B and C) or (D, E and F)"', t =>
{
    const query = ['or', ['not', 'A'], ['and', 'B', 'C'], ['and', 'D', 'E', 'F']];
    const tree  = ['or', ['not', 'A'], ['or', ['and', 'B', 'C'], ['and', 'D', ['and', 'E', 'F']]]];

    t.deepEqual( toBinaryTree( query ), tree );
} );
