import execute      from './execute';
import toBinaryTree from './toBinaryTree';


export default function search( query, data )
{
    const queryTree = toBinaryTree( query );
    const results   = execute( queryTree, data );

    return results;
}
