import React from 'react';
import getConfig from 'next/config';
import { StyledFooter } from '../../styles/components/Footer';

const { publicRuntimeConfig } = getConfig();

function Footer() {
  return (
    <StyledFooter>
      <p>&copy; 2018 - {publicRuntimeConfig.SITE_NAME}</p>
    </StyledFooter>
  );
}

Footer.propTypes = {};

export default Footer;
