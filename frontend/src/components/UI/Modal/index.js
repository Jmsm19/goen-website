import React from 'react';
import PropTypes from 'prop-types';
import {
  Zoom,
  Slide,
  Fade,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogTitle,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Modal = props => {
  const {
    isVisible,
    title,
    animation,
    children,
    onClose,
    className,
    withToolbar,
    actionComponent,
    ...rest
  } = props;

  const AnimatedComponent = React.useMemo(() => {
    if (animation) {
      return React.forwardRef((componentProps, ref) => {
        const lowerCasedAnimation = animation.toLowerCase();
        switch (lowerCasedAnimation) {
          case 'zoom':
            return <Zoom ref={ref} {...componentProps} />;
          case 'fade':
            return <Fade ref={ref} {...componentProps} />;
          case 'slide':
          default:
            return <Slide direction='up' ref={ref} {...componentProps} />;
        }
      });
    }
    return undefined;
  }, [animation]);

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      className={className}
      container={document.getElementById('portal')}
      TransitionComponent={AnimatedComponent}
      {...rest}
    >
      {withToolbar && (
        <AppBar color='primary' position='static'>
          <Toolbar>
            {title && (
              <Typography variant='h5' style={{ marginRight: 'auto' }}>
                {title}
              </Typography>
            )}

            <IconButton color='secondary' onClick={onClose} style={{ marginLeft: 'auto' }}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {title && !withToolbar && <DialogTitle>{title}</DialogTitle>}

      <DialogContent scroll='paper'>{children}</DialogContent>

      {actionComponent}
    </Dialog>
  );
};

Modal.defaultProps = {
  animation: 'slide',
  isVisible: false,
  title: undefined,
  withToolbar: false,
  className: '',
  actionComponent: undefined,
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  withToolbar: PropTypes.bool,
  actionComponent: PropTypes.node,
  animation: PropTypes.oneOf([true, 'fade', 'zoom', 'slide']),
  ...Dialog.propTypes,
};

export default Modal;
