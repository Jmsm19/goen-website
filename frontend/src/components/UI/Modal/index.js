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

import useLayoutContext from '../../../hooks/useLayoutContext';

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
  const { isMobile } = useLayoutContext();

  const AnimatedComponent = React.useMemo(() => {
    if (animation) {
      return React.forwardRef((componentProps, ref) => {
        switch (animation) {
          case 'zoom':
            return <Zoom ref={ref} {...componentProps} />;
          case 'fade':
            return <Fade ref={ref} {...componentProps} />;
          case 'slideRight':
            return <Slide direction='right' ref={ref} {...componentProps} />;
          case 'slideLeft':
            return <Slide direction='left' ref={ref} {...componentProps} />;
          case 'slideDown':
            return <Slide direction='down' ref={ref} {...componentProps} />;
          case 'slideUp':
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
      maxWidth='md'
      TransitionComponent={AnimatedComponent}
      PaperProps={{
        style: { margin: 0, minWidth: isMobile ? 300 : 400, width: isMobile ? '95vw' : null },
      }}
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
  animation: 'slideUp',
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
  animation: PropTypes.oneOf([
    true,
    'fade',
    'zoom',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
  ]),
  ...Dialog.propTypes,
};

export default Modal;
