import parser from './parser';


export default function parse( query )
{
    return parser.parse( query );
}
