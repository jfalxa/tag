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
