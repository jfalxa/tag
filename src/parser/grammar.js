export default
`
start
    = operation

_ "optional whitespace"
    = [ ]*

__ "mandatory whitespace"
    = [ ]+

set
    = $[A-Z\-]+

operator
    = "and"
    / "or"

not
    = "not"

operand
    = set
    / group
    / not _ opd:operand { return ['not', opd] }

group
    = "\[" _ opn:operation _ "\]" { return opn }

leftoperand
    = left:operand _ "," _ right:leftoperand { return [left].concat( right ) }
    / opd:operand { return [opd] }

operation
    = left:leftoperand __ op:operator __ right:operand _ { return [op].concat( left, [right] ) }
    / operand
`;