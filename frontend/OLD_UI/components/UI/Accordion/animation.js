import posed from 'react-pose';

const CollapsibleContent = posed.div({
  open: {
    height: 'auto',
  },
  closed: {
    height: 0,
  },
});

export default CollapsibleContent;
