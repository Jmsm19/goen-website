import React from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import { withRouter, RouteComponentProps, Switch } from 'react-router';

interface Props extends RouteComponentProps {
  children: React.ReactNode;
}

const FadeInPageTransition = ({ location, children }: Props) => {
  const transitions = useTransition(location, l => l.pathname, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(trans => (
        <animated.div style={trans.props} key={trans.key}>
          <Switch location={trans.item}>{children}</Switch>
        </animated.div>
      ))}
    </>
  );
};

FadeInPageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(FadeInPageTransition);
