import React from 'react';
import { Icon, Intent } from '@blueprintjs/core';

const defaultProps = {
  airEmissions: {},
  airMeasureTools: {},
  directoryFactsAir: {},
  directoryFactsWaste: {},
  directoryFactsWater: {},
  directoryOKATO: {},
  factsAir: {},
  factsWaste: {},
  factsWater: {},
  object: {},
  record: {},
  wasteTotalAnnualValue: {},
  waterEmissions: {},
  waterMeasure: {},
};

const IndexFooter = (props) => {
  const currentPoint = props.currentPoint || defaultProps;
  const {
    category,
    code,
    latitude,
    longitude,
    name,
    registryType,
    riskCategory,
    timestamp,
  } = currentPoint.object;
  const {
    organizationName,
    organizationRegistrationDate,
  } = currentPoint.record;
  const {
    airObjectCount,
    airTotalAnnualValue,
    factsValCo2,
  } = currentPoint.factsAir;
  const {
    waterObjectCount,
    waterTotalAnnualValue,
  } = currentPoint.factsWater;
  // const {
  //   wasteTotalAnnualValue,
  // } = currentPoint.wasteTotalAnnualValue;
  // const {
  //   wasteKlass,
  // } = currentPoint.directoryFactsWaste;
  return (
    <div className="index__footer">
      <div className='index__footer-close' onClick={props.onClick}>
        <Icon icon='cross' iconSize={40} />
      </div>
      <p>
          <strong>Наименование производственной территории:</strong>
          <span>{name}</span>
      </p>
      <p>
          <strong>Наименование организации:</strong>
          <span>{organizationName}</span>
      </p>
      <p>
          <strong>Зарегистрирован:</strong>
          <span>{organizationRegistrationDate}</span>
      </p>
      <p>
          <strong>Категория риска:</strong>
          <span>{riskCategory}</span>
      </p>
      <p>
          <strong>Уровень гос.надзора:</strong>
          <span>{category}</span>
      </p>
      <p>
          <strong>Кол-во компонентов загрязнения воздуха:</strong>
          <span>{airObjectCount}</span>
      </p>
      <p>
          <strong>Фактическая масса выбросов в атмосферу:</strong>
          <span>{airTotalAnnualValue}</span>
      </p>
      <p>
          <strong>Концентрация CO2:</strong>
          <span>{factsValCo2}</span>
      </p>
      <p>
          <strong>Кол-во компонентов загрязнения воды:</strong>
          <span>{waterObjectCount}</span>
      </p>
      <p>
          <strong>Масса, т/год:</strong>
          <span>{waterTotalAnnualValue}</span>
      </p>
      <p>
          <strong>Фактическая масса реализации отходов, т/год:</strong>
          <span>{}</span>
      </p>
      <p>
          <strong>Класс опасности загрязняющего отхода:</strong>
          <span>{}</span>
      </p>
    </div>
  );
};

export default IndexFooter;
