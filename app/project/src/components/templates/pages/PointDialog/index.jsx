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
import { Link } from 'react-router-dom';

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

class PointDialog extends Component {
  render() {
    const { pointDialogIsOpen, onToggleOverlay } = this.props;
    const currentPoint = this.props.currentPoint || defaultProps;
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
      <div>
        <Dialog
            className={Classes.DIALOG }
            icon="info-sign"
            onClose={onToggleOverlay}
            title="Информация об объекте"
            isOpen={pointDialogIsOpen}
        >
          <div className={Classes.DIALOG_BODY}>
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
          <div className={Classes.DIALOG_FOOTER}>
            <div className="point-dialog__link-wrap">
              <Link className='point-dialog__link' to={`/detail/${code}`}>Подробнее</Link>
            </div>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
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

export default PointDialog;
