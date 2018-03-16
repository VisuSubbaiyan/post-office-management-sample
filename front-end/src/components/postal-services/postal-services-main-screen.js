import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

import {appActions} from '../../actions/app-actions';
import {filterDataList} from '../../helpers/app-helper';
import DataList from '../data-list';
import Filters from '../base/filters';

@connect(state => state, dispatch => bindActionCreators(appActions, dispatch))
class PostalServicesMainScreen extends Component {
  static propTypes = {
    shipmentsList: PropTypes.arrayOf(PropTypes.object),
    getShipmentList: PropTypes.func,
    navigateToScreen: PropTypes.func,
    updateAppState:PropTypes.func,
    process: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      showFilters: false
    };
  }

  componentDidMount() {
    this.props.getShipmentList();
  }

  handleShowHideFilter = () => {
    this.setState({showFilters: !this.state.showFilters});
  }

  handleFiltersChange = (field) => (e, value) => {
    const filters = Object.assign({}, this.state.filters, {[field]: value});
    this.setState({filters});
  }

  handleWeightFieldChange = (e, key, weight) => {
    const filters = Object.assign({}, this.state.filters, {weight});
    this.setState({filters});
  }

  handleFilterSubmit = () => {
    this.setState({shipmentsList: filterDataList(this.props.shipmentsList, this.state.filters)});
  }

  handleFilterReset = () => {
    this.setState({shipmentsList: filterDataList(this.props.shipmentsList, {}), filters: {}});
  }
  // Pagination is not best practice in UX point of view, we have filter option to get the ferfect result.
  // So I dont provide pagination option
  render() {
    return (
      <div>
        <h4 className="l-screen-title">{'POSTAL SERVICES'}</h4>
        {this.state.showFilters &&
          <Filters
            filterData={this.state.filters}
            onFilterFieldChange={this.handleFiltersChange}
            handleWeightFieldChange={this.handleWeightFieldChange}
            onFilterSubmit={this.handleFilterSubmit}
            onFilterReset={this.handleFilterReset}
            process={this.props.process}
          />
        }
        <div className="row">
          <div className="col-lg-3">
            <RaisedButton onClick={this.handleShowHideFilter} label={this.state.showFilters ? 'Hide Filters' : 'Show Filters'} fullWidth={true} />
          </div>
          <div className="col-lg-6"></div>
          <div className="col-lg-3">
            <RaisedButton onClick={() => this.props.navigateToScreen('postal-services/add-edit-screen')} label="Add shipment" primary={true}  fullWidth={true} />
          </div>
        </div>
        <DataList
          dataList={this.state.shipmentsList || this.props.shipmentsList}
          navigateToScreen={this.props.navigateToScreen}
          updateAppState={this.props.updateAppState}
        />
      </div>
    );
  }
}

export default PostalServicesMainScreen;
