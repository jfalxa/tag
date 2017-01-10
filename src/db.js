import _   from 'lodash';
import low from 'lowdb';

import { maybe, print, bench } from 'src/utils';


const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F'];

const defaults =
{
    groups     : _( GROUPS ).map( g => [g,g] ).fromPairs().value(),
    docs       : {},
    group_docs : {},
    doc_groups : {}
};

const db   = low( '/home/falxa/workspace/tag/db.json' );
let data   = db.defaults( defaults ).value();


function addGroup( i, group )
{
    data.doc_groups[i]     = data.doc_groups[i] || [];
    data.group_docs[group] = data.group_docs[group] || [];

    data.doc_groups[i].push( group );
    data.group_docs[group].push( i );
}


function addDoc( i )
{
    data.docs[i] = { id : i };

    for ( const group in data.groups )
    {
        maybe() && addGroup( i, group );
    }
}



export default
{
    initDB( max=10 )
    {
        data       = _.defaults( {}, defaults );
        const size = _.size( data.docs );

        if ( size < max )
        {
            for ( let i=size; i<max; i++ )
            {
                addDoc( i );
            }

            bench( 'db-write', () => db.setState( data ) );
        }
    },

    get( ...path )
    {
        return _.get( data, path );
    },

    clean()
    {
        return db.setState( defaults );
    },

    print()
    {
        print( data.group_docs );
    }
};
