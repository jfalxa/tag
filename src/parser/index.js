import peg from 'pegjs';

import grammar from './grammar';


export default function createParser()
{
    const parser = peg.generate( grammar );
    return ( query => parser.parse( query ) );
}
