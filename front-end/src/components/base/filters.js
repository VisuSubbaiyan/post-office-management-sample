import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {margin: 5};

const Filters = ({filterData, onFilterFieldChange, handleWeightFieldChange, onFilterSubmit, onFilterReset, process}) => (
  <div className="l-filters-panel">
    <h6>{'Filter Options:'}</h6>
    <TextField floatingLabelText="ID" value={filterData.id} onChange={onFilterFieldChange('id')} style={style} />
    {process === 'shipment' &&
      <TextField floatingLabelText="Status" value={filterData.status} onChange={onFilterFieldChange('status')} style={style} />
    }
    <TextField
      floatingLabelText="Location"
      value={process === 'shipment' ? filterData.location : filterData.name}
      onChange={onFilterFieldChange(process === 'shipment' ? 'location' : 'name')}
      style={style}
    />
    {process === 'office' && 
      <TextField
        floatingLabelText="PLZ"
        value={filterData.PLZ}
        onChange={onFilterFieldChange('PLZ')}
        style={style}
      />
    }
    {process === 'shipment' &&
      <SelectField
        floatingLabelText="ShipmentWeight"
        value={filterData.weight}
        onChange={handleWeightFieldChange}
        style={style}
        className="l-text-field"
      >
        <MenuItem value="" primaryText="" />
        <MenuItem value="Less than 1kg" primaryText="Less than 1kg" />
        <MenuItem value="Between 1kg and 5kg" primaryText="Between 1kg and 5kg" />
        <MenuItem value="More than 5kg" primaryText="More than 5kg" />
      </SelectField>
    }
    <div className="row">
     <div className="col-lg-6"></div>
     <div className="col-lg-3">
        <RaisedButton onClick={onFilterReset} label="Reset" fullWidth={true} style={style} />
     </div>
     <div className="col-lg-3">
        <RaisedButton onClick={onFilterSubmit} label="Submit" primary={true} fullWidth={true} style={style} />
      </div>
    </div>
  </div>
);

Filters.propTypes = {
  filterData: PropTypes.object,
  onFilterFieldChange: PropTypes.func,
  handleWeightFieldChange: PropTypes.func,
  onFilterSubmit: PropTypes.func,
  onFilterReset: PropTypes.func,
  process: PropTypes.string
};

export default Filters;