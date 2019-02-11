import { css } from 'styled-components';
import classnames from 'classnames';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  ${'' /* @media (max-width: ${sizes[label] / 16}em) { */}
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

/**
 *  Set ant-menu-item-selected if router's path matches
 *
 * @param {String} path
 * @param {*} router
 */
export const setActiveLinkClass = (path, router) =>
  classnames({
    'ant-menu-item-selected': router.asPath === path,
  });
