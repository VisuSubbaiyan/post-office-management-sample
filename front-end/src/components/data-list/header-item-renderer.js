import React from 'react';
import PropTypes from 'prop-types';

const HeaderItemRenderer = () => (
  <div className="row row-header">
    <div className="col-lg-2">{'ID'}</div>
    <div className="col-lg-1">{'Type'}</div>
    <div className="col-lg-2">{'Weight'}</div>
    <div className="col-lg-2">{'Status'}</div>
    <div className="col-lg-1">{'PLZ'}</div>
    <div className="col-lg-2">{'Location'}</div>
    <div className="col-lg-2">{'Action'}</div>
  </div>
);

export default HeaderItemRenderer;
