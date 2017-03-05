const tags = new TagggClient( 'localhost:8000' );

tags.query( 'A and B' )
    .then( results => console.log( results ) );

tags.search( 'tags', { name : 'sal' } )
    .then( tags => console.log( 'found tags:', tags ) );

const srv = new TagggServer();
