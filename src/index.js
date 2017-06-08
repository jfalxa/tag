import createParser  from './parser';
import executeQuery  from './query/execute';
import toBinaryTree  from './utils/toBinaryTree';
import getQuerySpace from './utils/getQuerySpace';


const parse = createParser();


export default function runQuery( humanQuery, loadQuerySpace )
{
    // parse the query and turn it into a binary tree
    const query     = parse( humanQuery );
    const queryTree = toBinaryTree( query );

    // identify the query space and load the corresponding data
    const querySpace     = getQuerySpace( queryTree );
    const querySpaceData = loadQuerySpace( querySpace );

    if ( querySpace.then )
    {
        return querySpace.then( querySpaceData => executeQuery( queryTree, querySpaceData ) )
    }

    // execute the query on the loaded data
    return executeQuery( queryTree, querySpaceData );
}
