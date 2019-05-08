import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { connect } from 'react-redux';
import {
  H2,
  H5,
  Card,
  Elevation,
} from '@blueprintjs/core';
import { Cell, Column, Table } from '@blueprintjs/table';

import MainLayout from '../layouts/main-layout';

const cellRenderer = (data, typeFirst, typeSecond) => (rowIndex) => {
  return <Cell>{data[rowIndex][typeFirst][typeSecond]}</Cell>;
};

class Detail extends Component {
  state = {
    isReport: false,
  };

  handleClick = (e) => {
    const { objects } = this.props;
    const current = objects.filter((item) => {
      return item.object.code === this.props.match.params.code;
    })[0];
    axios.post('/api/report/', { current }).then((res) => {
      this.setState({ isReport: true });
    });
  }

  render() {
    const { objects } = this.props;
    const current = objects.filter((item) => {
      return item.object.code === this.props.match.params.code;
    })[0];
    const { elements } = current;

    let template = 'Сбросы отсутствуют';

    if (elements.water.length > 0) {
      template = <Table className='detail__table' numRows={elements.water.length}>
      <Column name="Код" cellRenderer={cellRenderer(elements.water, 'directoryFactsWater', 'waterFactsCode')}/>
      <Column name="Наименование ЗВ" cellRenderer={cellRenderer(elements.water, 'directoryFactsWater', 'waterFactsName')}/>
      <Column name="Масса, т/год" cellRenderer={cellRenderer(elements.water, 'waterEmissions', 'waterFactsAnnualValue')}/>
      </Table>;
    }
    return (
      <MainLayout secondPage='yes' ref={'main'}>
        <div className="detail">
          <button onClick={this.handleClick}>Создать отчет</button>
          {this.state.isReport ? <a href='/report.pdf'>Скачать отчет</a> : ''}
          <div className="row">
            <Card interactive={false} elevation={Elevation.THREE}>
              <H2>Объект {this.props.match.params.code}</H2>
              <H5>Название: {current.object.name}</H5>
              <H5>Организация: {current.record.organizationName}</H5>
              <H5>Уровень надзора: {`${current.object.registryType}, ${current.object.category}`}</H5>
              <H5>Категория риска: {current.object.riskCategory}</H5>
            </Card>
          </div>
          <div className="row">
            <Card interactive={false} elevation={Elevation.THREE}>
              <H5 className="row__title">Количество и состав выбросов в атмосферный воздух</H5>
              <Table className='detail__table' numRows={elements.air.length}>
                <Column name="Код" cellRenderer={cellRenderer(elements.air, 'directoryFactsAir', 'airFactsCode')}/>
                <Column name="Наименование ЗВ" cellRenderer={cellRenderer(elements.air, 'directoryFactsAir', 'airFactsName')}/>
                <Column name="Масса, т/год" cellRenderer={cellRenderer(elements.air, 'airEmissions', 'airFactsAnnualValue')}/>
                <Column name="Мощность, г/с" cellRenderer={cellRenderer(elements.air, 'airEmissions', 'airFactsPower')}/>
              </Table>
            </Card>
          </div>
          <div className="row">
            <Card interactive={false} elevation={Elevation.THREE}>
              <H5 className="row__title">Количество и состав выбросов в водную среду</H5>
              { template }
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default connect((state) => {
  return {
    objects: state.data.objects,
  };
})(Detail);
