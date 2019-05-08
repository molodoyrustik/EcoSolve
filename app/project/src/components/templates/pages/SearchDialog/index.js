import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import YearPicker from 'react-year-picker';
import Select from 'react-select';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const kindPollutionOptions = [
  { value: 'Объекты сброса в водную среду', label: 'Объекты сброса в водную среду' },
  { value: 'Объекты выбросов в воздух', label: 'Объекты выбросов в воздух' },
  { value: 'Объекты размещения отходов', label: 'Объекты размещения отходов' },
];

class SearchDialog extends Component {
  state = {
    objectName: '',
    organizationName: '',
    year: null,
    riskCategory: null,
    category: null,
    kindPollution: null,
  }

  handleSearch = () => {
    const {
      objectName,
    } = this.state;
    const { objects, onSearch } = this.props;
    const point = objects.filter((item) => {
      return item.object.name === objectName;
    })[0];

    const { latitude, longitude } = point.object;
    onSearch({
      map: {
        center: [latitude, longitude],
        zoom: 15,
      },
      searchDialogIsOpen: false,
      showFooter: true,
      currentPoint: point,
    });
  }

  handleInputChange = (type) => (e) => {
    this.setState({
      [type]: e.target.value,
    });
  }

  handleYearChange = (year) => {
    this.setState({
      year,
    });
  }

  handleSelectChange = (type) => selectedOption => {
    this.setState({ [type]: selectedOption });
  }

  handleClean = () => {
    this.setState({
      objectName: '',
      organizationName: '',
      year: null,
      riskCategory: null,
      category: null,
      kindPollution: null,
    });
  }

  render() {
    const { searchDialogIsOpen, onToggleOverlay } = this.props;
    return (
      <div>
        <Dialog
          className={Classes.DIALOG }
          icon="search"
          onClose={onToggleOverlay}
          title="Поиск объектов"
          isOpen={searchDialogIsOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            <FormGroup
              label="Наименование объекта"
              labelFor="text-input"
            >
              <InputGroup value={this.state.objectName} onChange={this.handleInputChange('objectName')} id="text-input" placeholder="Введите наименование объекта" />
            </FormGroup>
            <FormGroup
              label="Название организации"
              labelFor="text-input"
            >
              <InputGroup
                value={this.state.organizationName}
                onChange={this.handleInputChange('organizationName')}
                id="text-input"
                placeholder="Введите название организации"
              />
            </FormGroup>
            <FormGroup
              label="Зарегистрирован, год"
              labelFor="text-input"
            >
             <YearPicker onChange={this.handleYearChange}/>
            </FormGroup>
            <FormGroup
              label="Категория риска"
              labelFor="text-input"
            >
              <Select
                value={this.state.riskCategory}
                onChange={this.handleSelectChange('riskCategory')}
                options={options}
              />
            </FormGroup>
            <FormGroup
              label="Уровень гос.надзора"
              labelFor="text-input"
            >
              <Select
                value={this.state.category}
                onChange={this.handleSelectChange('category')}
                options={options}
              />
            </FormGroup>
            <FormGroup
              label="Вид загрязнения"
              labelFor="text-input"
            >
              <Select
                value={this.state.kindPollution}
                onChange={this.handleSelectChange('kindPollution')}
                options={kindPollutionOptions}
              />
            </FormGroup>
            <Checkbox
              checked={this.state.isEnabled}
              onChange={this.handleEnabledChange}
              inline={true}>
              Сохранить результат запроса
            </Checkbox>
            <Button intent={Intent.PRIMARY} onClick={this.handleClean}>Сборс критериев</Button>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.handleSearch}>Найти объекты по заданным критериям</Button>
              <Tooltip content="Нажмите на кнопку чтобы свернуть окно.">
                <Button intent={Intent.DANGER} onClick={onToggleOverlay}>Отмена</Button>
              </Tooltip>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    objects: state.data.objects,
  };
})(SearchDialog);
