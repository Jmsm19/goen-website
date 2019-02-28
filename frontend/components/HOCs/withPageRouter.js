import React from 'react';
import { withRouter } from 'next/router';
import queryString from 'query-string';
import { getDisplayName } from '../../utils/index';

function withPageRouter(WrappedComponent) {
  const wrapper = withRouter(({ router, ...props }) => {
    const parsedQueryRouter = {
      ...router,
      query: queryString.parse(router.asPath.split(/\?/)[1]),
    };

    return <WrappedComponent {...props} router={parsedQueryRouter} />;
  });

  wrapper.displayName = `WithPageRouter(${getDisplayName(WrappedComponent)})`;

  return wrapper;
}

export default withPageRouter;
