import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import {appActions} from '../../actions/app-actions';

const processItems = (officeList = []) => officeList.map(item => ({
  text: '' + item.PLZ,
  value: (
    <MenuItem
      primaryText={'' + item.PLZ}
      secondaryText={item.name}
    />
  ),
}));

@connect(state => state, dispatch => bindActionCreators(appActions, dispatch))
class PostalServicesAddEditScreen extends Component {
  static propTypes = {
    selectedItem: PropTypes.object,
    updateAppState: PropTypes.func,
    addSelctedItem: PropTypes.func,
    updateSelectedItem: PropTypes.func,
    navigateToScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    const selectedItem = props.selectedItem || {type: {}, weight: {}, office: {}};

    this.state = {
      selectedItem,
      shipmentOffice: '' + (selectedItem.office.PLZ || ''),
      submitButtonText : props.selectedItem ? 'EDIT' : 'ADD',
      validation: {},
      errorMessage: 'This field is required'
    };
    this.style = {margin: {margin: 12}, checkbox: {width: 140}};
  }

  componentDidMount() {
    this.props.updateAppState({selectedItem: this.state.selectedItem});
    this.props.getOfficeList();
  }

  handleDropDownChange = (dropdownType) => ({target: {textContent}}, key, value) => {
    const updatedValue = () => {
      switch (dropdownType) {
        case 'type': {
          return {[dropdownType]: {id: value, name: textContent}};
        }

        case 'weight': {
          return {[dropdownType]: {id: value, desc: textContent}};
        }

        default:
          return {};
      }
    };
    const selectedItem = Object.assign({}, this.props.selectedItem, updatedValue());
    this.props.updateAppState({selectedItem});
  }

  selectOffice = (shipmentOffice) => this.props.officeList.find(item => ('' + item.PLZ) === shipmentOffice || item.name === shipmentOffice) || {};

  handleAutoSelectUpdateInput = (searchText) => {
    const office = this.selectOffice(searchText);
    this.props.updateAppState({selectedItem: Object.assign({}, this.props.selectedItem, {office})});
    this.setState({shipmentOffice: searchText});
  }

  handleAutoSelectNewRequest = (selectedItem) => {
    const office = typeof selectedItem === 'object' ? this.selectOffice(selectedItem.text) : this.selectOffice(selectedItem);
    this.props.updateAppState({selectedItem: Object.assign({}, this.props.selectedItem, {office})});
  }

  validation = () => {
    const validation = {
      type: !this.props.selectedItem.type.name,
      weight: !this.props.selectedItem.weight.desc,
      zip: !this.props.selectedItem.office.PLZ
    };

    this.setState({validation});

    return Object.values(validation).includes(true);
  }

  handleButtonClick = (buttonType) => ({target: {value}}) => {
    if (buttonType === 'CANCEL') {
      this.props.updateAppState({selectedItem: null});
      this.props.navigateToScreen('postal-services');
    } else if (buttonType === 'ADD') {
      !this.validation() && this.props.addSelctedItem();
    } else {
      !this.validation() && this.props.updateSelectedItem();
    }
  }

  handleCheckboxChange = (field) => () => {
    const selectedItem = Object.assign({}, this.props.selectedItem, {[field]: !this.props.selectedItem[field]});

    this.props.updateAppState({selectedItem});
  }

  render() {
    const selectedItem = this.props.selectedItem || this.state.selectedItem;
    return (
      <div>
        <h4 className="l-screen-title">{`${this.state.submitButtonText} SHIPMENT`}</h4>
        <div className="row">
          <SelectField
            floatingLabelText="Shipment Type"
            value={selectedItem.type.id}
            onChange={this.handleDropDownChange('type')}
            className="l-text-field"
            style={this.style.margin}
            errorText={this.state.validation.type && this.state.errorMessage}
          >
            <MenuItem value={0} primaryText="letter" />
            <MenuItem value={1} primaryText="package" />
          </SelectField>
          <SelectField
            floatingLabelText="Shipment Weight"
            value={selectedItem.weight.id}
            onChange={this.handleDropDownChange('weight')}
            className="l-text-field"
            style={this.style.margin}
            errorText={this.state.validation.weight && this.state.errorMessage}
          >
            <MenuItem value={0} primaryText="Less than 1kg" />
            <MenuItem value={1} primaryText="Between 1kg and 5kg" />
            <MenuItem value={2} primaryText="More than 5kg" />
          </SelectField>
          <AutoComplete
            floatingLabelText="Post Office"
            hintText="Type PLZ"
            onChange={this.handleDropDownChange('office')}
            style={this.style.margin}
            searchText={this.state.shipmentOffice}
            onUpdateInput={this.handleAutoSelectUpdateInput}
            onNewRequest={this.handleAutoSelectNewRequest}
            dataSource={processItems(this.props.officeList)}
            filter={(searchText, key) => key.indexOf(searchText) !== -1}
            errorText={this.state.validation.zip && this.state.errorMessage}
          />
        </div>
        <div className="row">
          <h5 className="l-heading-label">{'Status:'}</h5>
          <div className="col-lg-12">
            <Checkbox
              label="Origin"
              checked={!!selectedItem.origin}
              onCheck={this.handleCheckboxChange('origin')}
              style={this.style.checkbox}
              className="l-checkbox"
            />
            <Checkbox
              label="Destination"
              checked={!!selectedItem.destination}
              onCheck={this.handleCheckboxChange('destination')}
              style={this.style.checkbox}
              className="l-checkbox"
            />
            <Checkbox
              label="Delivered"
              checked={!!selectedItem.delivered}
              onCheck={this.handleCheckboxChange('delivered')}
              style={this.style.checkbox}
              className="l-checkbox"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <RaisedButton
              onClick={this.handleButtonClick('CANCEL')}
              label="Cancel"
              fullWidth={true}
              style={this.style.margin}
            />
          </div>
          <div className="col-lg-3">
            <RaisedButton
              onClick={this.handleButtonClick(this.state.submitButtonText)}
              label={this.state.submitButtonText}
              primary={true}
              fullWidth={true}
              style={this.style.margin}
            />
          </div>
          <div className="col-lg-6"></div>
        </div>
      </div>
    );
  }
}

export default PostalServicesAddEditScreen;