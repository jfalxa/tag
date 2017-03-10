import { AND, OR, NOT } from '../constants/operators';


export default
`
start
    = expression

_ "optional whitespace"
    = [ ]*

__ "mandatory whitespace"
    = [ ]+

and
    = "${ AND }"

or
    = "${ OR }"

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

expression
    = union

union
    = left:leftprimary __ or __ right:union { return ['${ OR }'].concat( left, [right] ) }
    / left:intersection __ or __ right:union { return ['${ OR }', left, right] }
    / intersection

intersection
    = left:leftprimary __ and __ right:intersection { return ['${ AND }'].concat( left, [right] ) }
    / left:primary __ and __ right:intersection { return ['${ AND }', left, right] }
    / primary

leftprimary
    = left:primary _ "," _ right:leftprimary { return [left].concat( right ) }
    / prm:primary { return [prm] }

primary
    = "\(" _ exp:expression _ "\)" { return exp }
    / not _ opd:primary { return ['${ NOT }', opd] }
    / set

`;
