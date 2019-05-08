module.exports = (currentPoint) => {
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

  return `
    <h2>Объект ${code}</h2>
    <h2>Название: ${name}</h2>
    <h4>Организация: ${organizationName}</h4>
    <h4>Зарегистрирован: ${organizationRegistrationDate}</h4>
    <h4>Уровень надзора: ${`${registryType}, ${category}`}</h4>
    <h4>Категория риска: ${riskCategory}</h4>
    <h4>Кол-во компонентов загрязнения воздуха: ${airObjectCount}</h4>
    <h4>Фактическая масса выбросов в атмосферу: ${airTotalAnnualValue}</h4>
    <h4>Концентрация CO2: ${factsValCo2}</h4>
    <h4>Кол-во компонентов загрязнения воды: ${waterObjectCount}</h4>
    <h4>Масса, т/год:: ${waterTotalAnnualValue}</h4>
  `
}