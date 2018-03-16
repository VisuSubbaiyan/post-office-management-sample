import React from 'react';
import PropTypes from 'prop-types';

const OfficeHeaderItemRenderer = () => (
  <div className="row row-header">
    <div className="col-lg-5">{'ID'}</div>
    <div className="col-lg-3">{'Location'}</div>
    <div className="col-lg-2">{'PLZ'}</div>
    <div className="col-lg-2">{'Action'}</div>
  </div>
);

export default OfficeHeaderItemRenderer;
