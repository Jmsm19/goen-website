import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CaretDown, CaretUp } from 'styled-icons/boxicons-regular';

import StyledAccordion from './styles';
import CollapsibleContent from './animation';

const Accordion = props => {
  const { title, titleTag, children, isOpen, onClick, className } = props;
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(isOpen);
  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);

  const handleClick = typeof onClick === 'function' ? onClick : toggleAccordion;

  const AccordionHeader = React.useMemo(
    () =>
      React.createElement(
        titleTag || 'h2',
        { className: classnames('accordion-header', { 'accordion--open': isAccordionOpen }) },
        <button
          type='button'
          onClick={handleClick}
          aria-expanded={isAccordionOpen ? 'true' : 'false'}
          aria-controls='accordion-content-region'
        >
          <span className='accordion-title'>{title}</span>
          {isAccordionOpen ? (
            <CaretUp className='accordion-icon' size={20} />
          ) : (
            <CaretDown className='accordion-icon' size={20} />
          )}
        </button>,
      ),
    [handleClick, isAccordionOpen, title, titleTag],
  );

  return (
    <StyledAccordion className={classnames(['accordion', className])}>
      {AccordionHeader}

      <CollapsibleContent
        role='region'
        id='accordion-content-region'
        className='accordion-content-region'
        aria-labelledby='accordion-content-region'
        pose={isAccordionOpen ? 'open' : 'closed'}
      >
        <div className='accordion-content'>{children}</div>
      </CollapsibleContent>
    </StyledAccordion>
  );
};

Accordion.defaultProps = {
  titleTag: 'h2',
  className: undefined,
  onClick: undefined,
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Accordion;
