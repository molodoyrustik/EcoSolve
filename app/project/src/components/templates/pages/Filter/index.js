import React, { Component } from 'react';
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

class Filter extends Component {
  render() {
    const { onHandleEnabledChange } = this.props;
    return (
      <div className="menu">
        <div className="menu__first">
          <div className="menu__first-title-checkbox">
            <Checkbox checked={false}>
              Объекты воздействия на окружающую среду
            </Checkbox>
          </div>
          <div className="menu__first-body-checkboxes">
            <Checkbox checked={this.props.isWaste} onChange={onHandleEnabledChange('isWaste')}>
              Объекты выбросов в почву
            </Checkbox>
            <Checkbox checked={this.props.isAir} onChange={onHandleEnabledChange('isAir')}>
              Объекты выбросов в воздух
            </Checkbox>
            <Checkbox checked={this.props.isWater} onChange={onHandleEnabledChange('isWater')}>
              Объекты сброса в водную среду
            </Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
