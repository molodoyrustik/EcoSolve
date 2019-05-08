import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  YMaps,
  Map,
  GeoObject,
  ZoomControl,
} from 'react-yandex-maps';
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Tooltip,
  FormGroup,
  InputGroup,
  Checkbox,
} from '@blueprintjs/core';

import MainLayout from '../layouts/main-layout.jsx';
import PointDialog from './PointDialog';
import SearchDialog from './SearchDialog';
import IndexFooter from './IndexFooter';
import Filter from './Filter';

class Index extends Component {
  state = {
    map: {
      center: [54.7358014, 55.9696942],
      zoom: 10,
    },
    pointDialogIsOpen: false,
    searchDialogIsOpen: false,
    currentPoint: null,
    showFooter: false,
    filter: {
      isWaste: true,
      isWater: true,
      isAir: true,
    },
  }

  toggleOverlay = (type) => (e) => {
    this.setState({ [type]: !this.state[type] });
  }

  handlePlacemarkClick = (data) => () => {
    this.setState({ currentPoint: data });
    this.toggleOverlay('pointDialogIsOpen')();
  }

  handleSearch = (data) => {
    this.setState(data);
  }

  handleZoomChange = (e) => {
    this.setState({
      ...this.state,
      map: {
        ...this.state.map,
        zoom: e.originalEvent.newZoom,
      },
    });
  }

  hanldeFooterClose = (e) => {
    this.setState({
      showFooter: false,
    });
  }

  handleEnabledChange = (type) => (e) => {
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        [type]: !this.state.filter[type],
      },
    });
  }

  render() {
    let { objects } = this.props;
    if (this.state.filter.isWaste === false) {
      objects = objects.filter((object) => {
        return object.factsWaste.wasteObjectCount !== 0;
      });
    }
    if (this.state.filter.isAir === false) {
      objects = objects.filter((object) => {
        return object.factsAir.airObjectCount !== 0;
      });
    }
    if (this.state.filter.isWater === false) {
      objects = objects.filter((object) => {
        return object.factsWater.waterObjectCount !== 0;
      });
    }
    return (
      <MainLayout>
        <div className="index">
            <div className="index__left">
              <Button icon="search" className='index__left-search-btn' onClick={this.toggleOverlay('searchDialogIsOpen')}/>
              <YMaps>
                  <Map width={'70vw'} height={'100vh'} state={this.state.map} onBoundsChange={this.handleZoomChange}>
                    <ZoomControl
                      options={{
                        size: 'small',
                        zoomDuration: 500,
                      }}
                    />
                    {
                      objects.map((data, index) => {
                        return <GeoObject
                                  key={index}
                                  geometry={{
                                    type: 'Point',
                                    coordinates: [data.object.latitude, data.object.longitude],
                                  }}
                                  onClick={this.handlePlacemarkClick(data)}
                                />;
                      })
                    }
                  </Map>
              </YMaps>
              <PointDialog
                currentPoint={this.state.currentPoint}
                pointDialogIsOpen={this.state.pointDialogIsOpen}
                onToggleOverlay={this.toggleOverlay('pointDialogIsOpen')}
                />
              <SearchDialog
                searchDialogIsOpen={this.state.searchDialogIsOpen}
                onToggleOverlay={this.toggleOverlay('searchDialogIsOpen')}
                onSearch={this.handleSearch}
              />
            </div>
            <div className="index__right">
              <Filter
                isWaste={this.state.filter.isWaste}
                isAir={this.state.filter.isAir}
                isWater={this.state.filter.isWater}
                onHandleEnabledChange={this.handleEnabledChange}
              />
            </div>
              {
                this.state.showFooter ? <IndexFooter onClick={this.hanldeFooterClose} currentPoint={this.state.currentPoint}/> : ''
              }
          </div>
      </MainLayout>
    );
  }
}

export default connect((state) => {
  return {
    objects: state.data.objects,
  };
})(Index);
