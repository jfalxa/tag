import test from 'ava';

import runQuery from 'src';


test( 'runQuery: from memory', t =>
{
    function loadFromMemory()
    {
        const data =
        {
            A : [1, 2, 3],
            B : [3, 4, 5]
        };

        return data;
    }

    const query   = 'A and B';
    const results = [3];

    t.deepEqual( runQuery( query, loadFromMemory ), results );
} );


test( 'runQuery: from memory using query space', t =>
{
    const db =
    {
        A : [1, 2, 3],
        B : [3, 4, 5],
        C : [5, 6, 7],
        D : [7, 8, 9]
    };

    const dbSubset =
    {
        A : [1, 2, 3],
        B : [3, 4, 5],
        C : [5, 6, 7]
    };

    function loadFromMemory( querySpace )
    {
        t.deepEqual( querySpace, Object.keys( dbSubset ) );

        const querySpaceData = {};

        // get just what you need
        querySpace.forEach( set => ( querySpaceData[set] = db[set] ) );

        t.deepEqual( querySpaceData, dbSubset );

        return querySpaceData;
    }

    const query   = 'A, B or C';
    const results = [1, 2, 3, 4, 5, 6, 7];

    t.deepEqual( runQuery( query, loadFromMemory ), results );
} );
