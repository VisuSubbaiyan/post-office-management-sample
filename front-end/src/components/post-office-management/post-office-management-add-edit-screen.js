import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import {appActions} from '../../actions/app-actions';

const processPLZItems = (officeList = []) => officeList.map(item => ({
  text: '' + item.PLZ,
  value: (<MenuItem primaryText={'' + item.PLZ} />)
}));

const processLocationItems = (officeList = []) => officeList.map(item => ({
  text: item.name,
  value: (<MenuItem primaryText={ item.name} />)
}));

@connect(state => state, dispatch => bindActionCreators(appActions, dispatch))
class PostOfficeManagementAddEditScreen extends Component {
  static propTypes = {
    selectedItem: PropTypes.object,
    updateAppState: PropTypes.func,
    addSelctedItem: PropTypes.func,
    updateSelectedItem: PropTypes.func,
    navigateToScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      submitButtonText : props.selectedItem ? 'EDIT' : 'ADD',
      validation: {},
      errorMessage: 'This field is required'
    };
    this.style = {margin: {margin: 12}};
  }

  componentDidMount() {
    this.props.getOfficeList();
  }

  handleDropDownChange = (dropdownType) => ({target: {textContent}}, key, value) => {
    const selectedItem = Object.assign({}, this.props.selectedItem, {[dropdownType]: dropdownType === 'PLZ' ? +textContent : textContent});
    this.props.updateAppState({selectedItem});
  }

  handleAutoSelectUpdateInput = (key) => (searchText) => {
    this.props.updateAppState({selectedItem: Object.assign({}, this.props.selectedItem, {[key]: key === 'PLZ' ? +searchText : searchText})});
  }

  handleAutoSelectNewRequest = (key) => (selectedItem) => {
    const textContent = typeof selectedItem === 'object' ? selectedItem.text : selectedItem;
    this.props.updateAppState({selectedItem: Object.assign({}, this.props.selectedItem, {[key]: key === 'PLZ' ? +textContent : textContent})});
  }

  validation = () => {
    const selectedItem = this.props.selectedItem || {};
    const validation = {
      PLZ: !selectedItem.PLZ,
      name: !selectedItem.name
    };

    this.setState({validation});

    return Object.values(validation).includes(true);
  }

  handleButtonClick = (buttonType) => ({target: {value}}) => {
    if (buttonType === 'CANCEL') {
      this.props.updateAppState({selectedItem: null});
      this.props.navigateToScreen('post-office-management');
    } else if (buttonType === 'ADD') {
      !this.validation() && this.props.addSelctedItem();
    } else {
      !this.validation() && this.props.updateSelectedItem();
    }
  }

  render() {
    const selectedItem = this.props.selectedItem || {};
    return (
      <div>
        <h4 className="l-screen-title">{`${this.state.submitButtonText} OFFICE`}</h4>
        <div className="row">
          <AutoComplete
            floatingLabelText="PLZ"
            hintText="Type Zip"
            onChange={this.handleDropDownChange('PLZ')}
            style={this.style.margin}
            searchText={'' + (selectedItem.PLZ || '')}
            onUpdateInput={this.handleAutoSelectUpdateInput('PLZ')}
            onNewRequest={this.handleAutoSelectNewRequest('PLZ')}
            dataSource={processPLZItems(this.props.officeList)}
            filter={(searchText, key) => key.indexOf(searchText) !== -1}
            errorText={this.state.validation.PLZ && this.state.errorMessage}
          />
          <AutoComplete
            floatingLabelText="Location"
            hintText="Type Location"
            onChange={this.handleDropDownChange('name')}
            style={this.style.margin}
            searchText={selectedItem.name}
            onUpdateInput={this.handleAutoSelectUpdateInput('name')}
            onNewRequest={this.handleAutoSelectNewRequest('name')}
            dataSource={processLocationItems(this.props.officeList)}
            filter={(searchText, key) => key.indexOf(searchText) !== -1}
            errorText={this.state.validation.name && this.state.errorMessage}
          />
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

export default PostOfficeManagementAddEditScreen;