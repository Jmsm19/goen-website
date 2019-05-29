import React from 'react';
import { Card } from 'shards-react';

const CardWithRef = React.forwardRef((props, ref) => <Card {...props} innerRef={ref} />);

export default CardWithRef;
