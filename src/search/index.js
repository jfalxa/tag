import execute      from './execute';
import toBinaryTree from './toBinaryTree';


export default function search( query, data )
{
    return execute( toBinaryTree( query ), data );
}
