/* eslint-disable react/prop-types */
import React from 'react';
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
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions/transition';

import { useLayoutContext } from '../../../store/context/LayoutContext';

interface Props extends ModalProps {
  fullScreen?: boolean;
  onClose?: (...args: any[]) => any;
}

const Modal: React.FC<Props> = props => {
  const {
    isVisible,
    title,
    animation,
    children,
    onClose,
    className,
    withToolbar,
    actionComponent,
    fullScreen,
    ...rest
  } = props;
  const { isMobile } = useLayoutContext();

  const AnimatedComponent = React.useMemo(() => {
    if (animation) {
      return React.forwardRef((componentProps: TransitionProps, ref) => {
        switch (animation) {
          case 'zoom':
            return <Zoom {...componentProps} ref={ref} />;
          case 'fade':
            return <Fade {...componentProps} ref={ref} />;
          case 'slideRight':
            return <Slide direction='right' {...componentProps} ref={ref} />;
          case 'slideLeft':
            return <Slide direction='left' {...componentProps} ref={ref} />;
          case 'slideDown':
            return <Slide direction='down' {...componentProps} />;
          case 'slideUp':
          default:
            return <Slide direction='up' {...componentProps} ref={ref} />;
        }
      });
    }
    return undefined;
  }, [animation]);

  return (
    <Dialog
      open={!!isVisible}
      onClose={onClose}
      className={className}
      container={document.getElementById('portal')}
      maxWidth='md'
      TransitionComponent={AnimatedComponent}
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          margin: 0,
          minWidth: isMobile ? 300 : 400,
          width: isMobile && !fullScreen ? '95vw' : undefined,
        },
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

      <DialogContent>{children}</DialogContent>

      {actionComponent}
    </Dialog>
  );
};

Modal.defaultProps = {
  animation: 'slideUp',
  fullScreen: false,
  isVisible: false,
  title: undefined,
  withToolbar: false,
  className: '',
  actionComponent: undefined,
};

export default Modal;
