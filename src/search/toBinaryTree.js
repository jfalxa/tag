import isLeaf                       from './isLeaf';
import { complement, isComplement } from './complement';


function toOperand( operator, nodes )
{
    return ( nodes.length > 1 )
        ? [operator, ...nodes]
        : nodes[0];
}


export default function toBinaryTree( query )
{
    if ( isLeaf( query ) )
    {
        return query;
    }
    else if ( isComplement( query ) )
    {
        return complement( toBinaryTree( query[1] ) );
    }

    const [operator, leftNode, ...rightNodes] = query;

    const left  = toBinaryTree( leftNode );
    const right = toBinaryTree( toOperand( operator, rightNodes ) );

    return [operator, left, right];
}
