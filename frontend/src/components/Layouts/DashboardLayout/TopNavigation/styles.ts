import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useTopNavStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default useTopNavStyles;
