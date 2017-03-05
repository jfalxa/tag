import test   from 'ava';
import search from 'src/search';


const sets =
{
    'A' : [0, 1, 2, 3, 4],
    'B' : [3, 4, 5, 6, 7],
    'C' : [6, 7, 8, 9],
    'D' : [0, 2, 4, 6, 8],
    'E' : [1, 3, 5, 7, 9],
    'F' : [2, 3, 5, 7]
};


test( 'search: "A and B"', t =>
{
    const query  = ['and', 'A', 'B'];
    const result = [3, 4];

    t.deepEqual( search( query, sets ), result );
} );


test( 'search: "A, B or C"', t =>
{
    const query  = ['or', 'A', 'B', 'C'];
    const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    t.deepEqual( search( query, sets ), result );
} );


test( 'search: "A and not D"', t =>
{
    const query  = ['and', 'A', ['not', 'D']];
    const result = [1, 3];

    t.deepEqual( search( query, sets ), result );
} );


test( 'search: "A and not (D or F)"', t =>
{
    const query  = ['and', 'A', ['not', ['or', 'D', 'F']]];
    const result = [1];

    t.deepEqual( search( query, sets ), result );
} );
