import { AND, OR, NOT } from '../constants/operators';


export default
`
start
    = operation

_ "optional whitespace"
    = [ ]*

__ "mandatory whitespace"
    = [ ]+

operator
    = "${ AND }"
    / "${ OR }"

not
    = "${ NOT }"

word
    = $[a-zA-Z0-9\-]+

user
    = "@" word

hash
    = "#" word

set
    = $ word
    / $ user
    / $ hash

operand
    = not _ opd:operand { return ['${ NOT }', opd] }
    / set
    / group

group
    = "\(" _ opn:operation _ "\)" { return opn }

leftoperand
    = left:operand _ "," _ right:leftoperand { return [left].concat( right ) }
    / opd:operand { return [opd] }

operation
    = left:leftoperand __ op:operator __ right:operand _ { return [op].concat( left, [right] ) }
    / operand
`;
