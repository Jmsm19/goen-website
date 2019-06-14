import { makeStyles } from '@material-ui/styles';

const useTopNavStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default useTopNavStyles;
