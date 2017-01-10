import programm    from 'commander';
import { version } from '../package.json';

import db    from 'src/db';
import query from 'src/query';


programm.version( version )
    .usage( '<command> [options]' )
    .description( 'processes tag queries' );

programm.command( 'query <query>' ).alias( 'q' )
    .description( 'give a query to the tag manager' )
    .action( query );

programm.command( 'print' ).alias( 'p' )
    .description( 'print the db contents' )
    .action( () => db.print() );

programm.command( 'clean' ).alias( 'c' )
    .description( 'clean the db' )
    .action( () => db.clean() );

programm.command( 'init [max]' ).alias( 'i' )
    .description( 'init the db with {max} documents' )
    .action( db.initDB );


export default programm.parse( process.argv );
