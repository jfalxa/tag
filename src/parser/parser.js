import peg from 'pegjs';

import grammar from './grammar';


export default peg.generate( grammar );
