import db        from 'src/db';
import parse     from 'src/parse';
import { bench } from 'src/utils';


import preprocess from './preprocess';
import process    from './process';


export default function runQuery( query )
{
    let res, pre, parsed;

    bench( 'parse', () => ( parsed = parse( query ) ) );
    bench( 'preprocess', () => ( pre = preprocess( parsed ) ) );
    bench( 'process', () => ( res = process( pre ) ) );

    if ( res[0] === 'not' )
    {
        res = ops.rest( res[1] );
    }

    console.log();
    console.log( '>>> query' );
    console.log( query );
    // console.log();
    // console.log( '>>> preprocessed' );
    // print( pre );
    console.log();
    console.log( '>>> result' );
    console.log( `${ res.length } hits` );
}
