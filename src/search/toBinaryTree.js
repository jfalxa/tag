import isLeaf                       from './isLeaf';
import { complement, isComplement } from './complement';


function toOperand( operator, nodes )
{
    // recreate a full query only if there is more than one right node
    return ( nodes.length > 1 )
        ? [operator, ...nodes]
        : nodes[0];
}


export default function toBinaryTree( query )
{
    if ( isLeaf( query ) )
    {
        // stop the recursion when you reach a leaf
        return query;
    }
    else if ( isComplement( query ) )
    {
        // in case of a NOT, keep recursing through the complemented set
        return complement( toBinaryTree( query[1] ) );
    }

    // decompose the query's, members
    const [operator, leftNode, ...rightNodes] = query;

    // convert the left member and go deeper in the tree with the right nodes
    const left  = toBinaryTree( leftNode );
    const right = toBinaryTree( toOperand( operator, rightNodes ) );

    // combine the previously obtained binary trees into a higher binary tree
    return [operator, left, right];
}
