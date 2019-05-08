module.exports = (flag, tableContent) => {
  return `
    <div className="row">
      <h3 className="row__title">Количество и состав выбросов в атмосферный воздух</h3>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100">
              ${
                flag ?
                `<table>
                <thead>
                  <tr class="table100-head">
                    <th class="column1">Код</th>
                    <th class="column2">Наименование ЗВ</th>
                    <th class="column3">Масса, т/год</th>
                    <th class="column4">Мощность, г/с</th>
                  </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
              </table>
                `
                :
                '<h4>Сбросы отсутствуют</h4>'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}