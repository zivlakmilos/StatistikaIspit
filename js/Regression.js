/*
 * This file is part of StatistikaIspit project (https://github.com/zivlakmilos/StatistikaIspit) for solving statistics final exam.
 * Copyright (c) 2022 Miloš Zivlak (milos@zivlak.rs).
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

let data = [];
let nextId = 0;

const addRowToTable = (x1, x2, y) => {
  const newRow = {
    id: nextId,
    x1: x1,
    x2: x2,
    y: y,
  }
  nextId++;
  data.push(newRow);
  $('#regressionTable').append(`
      <tr id="regressionRow_${newRow.id}">
        <td>
          <input id="regressionCol1_${newRow.id}" type="text" value="${newRow.x1}" />
        </td>
        <td>
          <input id="regressionCol2_${newRow.id}" type="text" value="${newRow.x2}" />
        </td>
        <td>
          <input id="regressionCol3_${newRow.id}" type="text" value="${newRow.y}" />
        </td>
        <td>
          <button class="btnRegressionRemove" data-id="${newRow.id}">Obriši</button>
        </td>
      <tr>
    `);
}

const removeRowFromTable = (id) => {
  data = data.filter(el => el.id !== id);
  $(`#regressionRow_${id}`).remove();
}

const regressionTest = () => {
  removeRowFromTable(0);
  addRowToTable(5, 2, 148);
  addRowToTable(14, 0, 76);
  addRowToTable(6, 1, 100);
  addRowToTable(10, 3, 126);
  addRowToTable(4, 6, 194);
  addRowToTable(8, 2, 110);
  addRowToTable(11, 3, 114);
  addRowToTable(16, 1, 86);
  addRowToTable(3, 5, 198);
  addRowToTable(9, 1, 92);
  addRowToTable(19, 0, 70);
  addRowToTable(13, 3, 120);
}

const solveRegression = () => {
  $('#regressionTableContainer').empty();
  $('#regressionLatex').empty();

  let latex = '';

  let sumX1 = 0;
  let sumX2 = 0;
  let sumY = 0;

  for (let i = 0; i < data.length; i++) {
    data[i].x1 = strToNumber($(`#regressionCol1_${data[i].id}`).val());
    data[i].x2 = strToNumber($(`#regressionCol2_${data[i].id}`).val());
    data[i].y = strToNumber($(`#regressionCol3_${data[i].id}`).val());

    sumY += data[i].y;
    sumX1 += data[i].x1;
    sumX2 += data[i].x2;
  }

  const avgX1 = sumX1 / data.length;
  const avgX2 = sumX2 / data.length;
  const avgY = sumY / data.length;

  data = data.map(el => {
    const d1 = el.x1 - avgX1;
    const d2 = el.x2 - avgX2;
    const dy = el.y - avgY;
    const d1_sq = d1 * d1;
    const d2_sq = d2 * d2;
    const dy_sq = dy * dy;
    const d12 = d1 * d2;
    const d1y = d1 * dy;
    const d2y = d2 * dy;
    return {
      ...el,
      d1: d1,
      d2: d2,
      dy: dy,
      d1_sq: d1_sq,
      d2_sq: d2_sq,
      dy_sq: dy_sq,
      d12: d12,
      d1y: d1y,
      d2y: d2y,
    }
  });

  let sumD1 = 0;
  let sumD2 = 0;
  let sumDY = 0;
  let sumD1_SQ = 0;
  let sumD2_SQ = 0;
  let sumDY_SQ = 0;
  let sumD12 = 0;
  let sumD1Y = 0;
  let sumD2Y = 0;

  let table = '<table>';
  table += `
    <tr>
      <th>x<sub>1</sub></th>
      <th>x<sub>2</sub></th>
      <th>y<sub>i</sub></th>
      <th>d<sub>1</sub></th>
      <th>d<sub>2</sub></th>
      <th>d<sub>y</sub></th>
      <th>d<sub>1</sub><sup>2</sup></th>
      <th>d<sub>2</sub><sup>2</sup></th>
      <th>d<sub>y</sub><sup>2</sup></th>
      <th>d<sub>1</sub>*d<sub>2</sub></th>
      <th>d<sub>1</sub>*d<sub>y</sub></th>
      <th>d<sub>2</sub>*d<sub>y</sub></th>
    </tr>
  `;
  data.forEach(el => {
    sumD1 += el.d1;
    sumD2 += el.d2;
    sumDY += el.dy;
    sumD1_SQ += el.d1_sq;
    sumD2_SQ += el.d2_sq;
    sumDY_SQ += el.dy_sq;
    sumD12 += el.d12;
    sumD1Y += el.d1y;
    sumD2Y += el.d2y;
    table += `
      <tr>
        <td>${numberToStr(el.x1)}</td>
        <td>${numberToStr(el.x2)}</td>
        <td>${numberToStr(el.y)}</td>
        <td>${numberToStr(el.d1)}</td>
        <td>${numberToStr(el.d2)}</td>
        <td>${numberToStr(el.dy)}</td>
        <td>${numberToStr(el.d1_sq)}</td>
        <td>${numberToStr(el.d2_sq)}</td>
        <td>${numberToStr(el.dy_sq)}</td>
        <td>${numberToStr(el.d12)}</td>
        <td>${numberToStr(el.d1y)}</td>
        <td>${numberToStr(el.d2y)}</td>
      </tr>
    `;
  });

  table += `
    <tr>
      <th>${numberToStr(sumX1)}</th>
      <th>${numberToStr(sumX2)}</th>
      <th>${numberToStr(sumY)}</th>
      <th>${numberToStr(sumD1)}</th>
      <th>${numberToStr(sumD2)}</th>
      <th>${numberToStr(sumDY)}</th>
      <th>${numberToStr(sumD1_SQ)}</th>
      <th>${numberToStr(sumD2_SQ)}</th>
      <th>${numberToStr(sumDY_SQ)}</th>
      <th>${numberToStr(sumD12)}</th>
      <th>${numberToStr(sumD1Y)}</th>
      <th>${numberToStr(sumD2Y)}</th>
    </tr>
  `;

  table += '</table>';
  $('#regressionTableContainer').append(table);

  const b1 = ((sumD2_SQ * sumD1Y) - (sumD12 * sumD2Y)) / ((sumD1_SQ * sumD2_SQ) - (sumD12 * sumD12));
  const b2 = ((sumD1_SQ * sumD2Y) - (sumD12 * sumD1Y)) / ((sumD1_SQ * sumD2_SQ) - (sumD12 * sumD12));
  const b0 = avgY - b1 * avgX1 - b2 * avgX2;
  const s = Math.sqrt(((sumDY_SQ - b1 * sumD1Y - b2 * sumD2Y) / (data.length - 3)));

  latex += '<hr />';

  latex += '\\[';
  latex += '\\boxed{';
  latex += 'b_{1} = ' + numberToStr(b1);
  latex += '}';
  latex += '\\]';

  latex += '\\[';
  latex += '\\boxed{';
  latex += 'b_{2} = ' + numberToStr(b2);
  latex += '}';
  latex += '\\]';

  latex += '\\[';
  latex += '\\boxed{';
  latex += 'b_{0} = ' + numberToStr(b0);
  latex += '}';
  latex += '\\]';

  latex += '<hr />';
  latex += '\\[';
  latex += '\\boxed{';
  latex += `y_{i} = ${numberToStr(b0)} ${b1 < 0 ? '- ' + numberToStr(b1 * -1) : '+ ' + numberToStr(b1)} \\cdot x_{1} ${b2 < 0 ? '- ' + numberToStr(b2 * -1) : '+ ' + numberToStr(b2)} \\cdot x_{2}`;
  latex += '}';
  latex += '\\]';

  latex += '<hr />';
  latex += '\\[';
  latex += '\\boxed{';
  latex += 'S = ' + numberToStr(s);
  latex += '}';
  latex += '\\]';

  $('#regressionLatex').html(latex);
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

const regression = () => {
  addRowToTable(0, 0, 0);

  //regressionTest();

  $('#regressionAdd').click(() => {
    addRowToTable(0, 0, 0);

    $('.btnRegressionRemove').click((el) => {
      const id = $(el.target).data('id');
      removeRowFromTable(id);
    });
  });

  $('.btnRegressionRemove').click((el) => {
    const id = $(el.target).data('id');
    removeRowFromTable(id);
  });

  $('#regressionCalculate').click(() => {
    solveRegression();
  });
};
