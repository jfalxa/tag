export function maybe( chances=1/2 )
{
    return Math.random() < chances;
}



export function bench( label, fn )
{
    console.time( label );
    fn();
    console.timeEnd( label );
}


export function print( obj )
{
    console.log( JSON.stringify( obj, null, '  ' ) );
}
