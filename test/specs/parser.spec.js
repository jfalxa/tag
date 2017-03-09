import test from 'ava';

import createParser from 'src/parser';


const parse = createParser();


test( 'parser: A and B', t =>
{
    const query  = 'A and B';
    const result = ['and', 'A', 'B'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: A or B', t =>
{
    const query  = 'A or B';
    const result = ['or', 'A', 'B'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: A, B, C, D and E', t =>
{
    const query  = 'A, B, C, D and E';
    const result = ['and', 'A', 'B', 'C', 'D', 'E'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: A or not B', t =>
{
    const query  = 'A or not B';
    const result = ['or', 'A', ['not', 'B']];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: A or not (B or C)', t =>
{
    const query  = 'A or not (B or C)';
    const result = ['or', 'A', ['not', ['or', 'B', 'C']]];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: (A and B) or (C and not (D, not E or F))', t =>
{
    const query  = '(A and B) or (C and not (D, not E or F))';
    const result = ['or', ['and', 'A', 'B'], ['and', 'C', ['not', ['or' ,'D', ['not', 'E'], 'F']]]];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: longSet and otherSet', t =>
{
    const query  = 'longSet and otherSet';
    const result = ['and', 'longSet', 'otherSet'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: @userA and @userB', t =>
{
    const query  = '@userA and @userB';
    const result = ['and', '@userA', '@userB'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: #tagA and #tagB', t =>
{
    const query  = '#tagA and #tagB';
    const result = ['and', '#tagA', '#tagB'];

    t.deepEqual( parse( query ), result );
} );


test( 'parser: number01 and 02number', t =>
{
    const query  = 'number01 and 02number';
    const result = ['and', 'number01', '02number'];

    t.deepEqual( parse( query ), result );
} );


test.todo( 'parser: Syntax error in query' );
