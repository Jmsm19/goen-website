import React from 'react';
import { Button } from 'shards-react';

const ButtonWithRef = React.forwardRef((props, ref) => <Button {...props} innerRef={ref} />);

export default ButtonWithRef;
