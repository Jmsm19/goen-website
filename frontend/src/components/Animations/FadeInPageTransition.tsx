import React from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import { withRouter, RouteComponentProps, Switch } from 'react-router';

interface Props extends RouteComponentProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInPageTransition = ({ location, children, className }: Props) => {
  const transitions = useTransition(location, l => l.pathname, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(trans => (
        <animated.div style={trans.props} key={trans.key} className={className}>
          <Switch location={trans.item}>{children}</Switch>
        </animated.div>
      ))}
    </>
  );
};

FadeInPageTransition.defaultProps = {
  className: undefined,
};

FadeInPageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default withRouter(FadeInPageTransition);
