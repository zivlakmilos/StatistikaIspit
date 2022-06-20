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

let ltData = [];
let ltNextId = 0;

const addTrendRowToTable = (year, y) => {
  const newRow = {
    id: ltNextId,
    year: year,
    y: y,
  }
  ltNextId++;
  ltData.push(newRow);
  $('#linearTrendTable').append(`
      <tr id="linearTrendRow_${newRow.id}">
        <td>
          <input id="linearTrendCol1_${newRow.id}" type="text" value="${newRow.year}" />
        </td>
        <td>
          <input id="linearTrendCol2_${newRow.id}" type="text" value="${newRow.y}" />
        </td>
        <td>
          <button class="btnLinearTrendRemove" data-id="${newRow.id}">Obriši</button>
        </td>
      <tr>
    `);
}

const removeTrendRowFromTable = (id) => {
  ltData = ltData.filter(el => el.id !== id);
  $(`#linearTrendRow_${id}`).remove();
}

const linearTrendTest = () => {
  removeTrendRowFromTable(0);
  addTrendRowToTable(2008, 38.7);
  addTrendRowToTable(2009, 38.2);
  addTrendRowToTable(2010, 35.9);
  addTrendRowToTable(2011, 32.1);
  addTrendRowToTable(2012, 23.2);
  addTrendRowToTable(2013, 18.9);
  addTrendRowToTable(2014, 17.9);
  addTrendRowToTable(2015, 16.9);
  addTrendRowToTable(2016, 16.3);
}

const solveLinearTrend = () => {
  $('#linearTrendTableContainer').empty();
  $('#linearTrendLatex').empty();

  let latex = '';

  let sumY = 0;
  let sumX = 0;
  let sumXY = 0;
  let sumX_SQ = 0;

  for (let i = 0; i < ltData.length; i++) {
    ltData[i].y = strToNumber($(`#linearTrendCol2_${ltData[i].id}`).val());

    if (ltData.length % 2 === 0) {
      ltData[i].x = i - Math.floor(ltData.length / 2) + 0.5;
    } else {
      ltData[i].x = i - Math.floor(ltData.length / 2);
    }

    ltData[i].xy = ltData[i].x * ltData[i].y;
    ltData[i].x_sq = ltData[i].x * ltData[i].x;

    sumY += ltData[i].y;
    sumX += ltData[i].x;
    sumXY += ltData[i].xy;
    sumX_SQ += ltData[i].x_sq;
  }

  const avgY = sumY / ltData.length;
  const avgX = sumX / ltData.length;
  const avgXY = sumXY / ltData.length;

  const b0 = avgY;
  const b1 = sumXY / sumX_SQ;

  let sumY_HAT = 0;
  let sumY_DIF = 0;

  let table = '<table>';
  table += `
    <tr>
      <th>Godina</th>
      <th>y<sub>i</sub></th>
      <th>x<sub>i</sub></th>
      <th>x<sub>i</sub> y<sub>i</sub></th>
      <th>x<sup>2</sup></th>
      <th>y&#770;<sub>i</sub></th>
      <th>(y<sub>i</sub> - y&#770;<sub>i</sub>)<sup>2</sup></th>
    </tr>
  `;
  ltData.forEach(el => {
    y_hat = b0 + b1 * el.x;
    y_dif = el.y - y_hat;

    sumY_HAT += y_hat;
    sumY_DIF += (y_dif * y_dif);

    table += `
      <tr>
        <td>${el.year}</td>
        <td>${numberToStr(el.y)}</td>
        <td>${numberToStr(el.x)}</td>
        <td>${numberToStr(el.xy)}</td>
        <td>${numberToStr(el.x_sq)}</td>
        <td>${numberToStr(y_hat)}</td>
        <td>${numberToStr(y_dif * y_dif)}</td>
      </tr>
    `;
  });

  table += `
    <tr>
      <th>Ukupno</th>
      <th>${numberToStr(sumY)}</th>
      <th>${numberToStr(sumX)}</th>
      <th>${numberToStr(sumXY)}</th>
      <th>${numberToStr(sumX_SQ)}</th>
      <th>${numberToStr(sumY_HAT)}</th>
      <th>${numberToStr(sumY_DIF)}</th>
    </tr>
  `;

  const s = Math.sqrt((sumY_DIF) / (ltData.length - 2));

  table += '</table>';
  $('#linearTrendTableContainer').append(table);

  latex += '<hr />';

  latex += '\\[';
  latex += '\\boxed{';
  latex += 'b_{0} = ' + numberToStr(b0);
  latex += '}';
  latex += '\\]';

  latex += '\\[';
  latex += '\\boxed{';
  latex += 'b_{1} = ' + numberToStr(b1);
  latex += '}';
  latex += '\\]';

  latex += '<hr />';
  latex += '\\[';
  latex += '\\boxed{';
  latex += `y_{i} = ${numberToStr(b0)} ${b1 < 0 ? '- ' + numberToStr(b1 * -1) : '+ ' + numberToStr(b1)} \\cdot x_{i}`;
  latex += '}';
  latex += '\\]';

  latex += '<hr />';
  latex += '\\[';
  latex += '\\boxed{';
  latex += 'S = ' + numberToStr(s);
  latex += '}';
  latex += '\\]';

  latex += '<hr />';

  $('#linearTrendLatex').html(latex);
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

const linearTrend = () => {
  addTrendRowToTable(2022, 0);

  //linearTrendTest();

  $('#linearTrendAdd').click(() => {
    addTrendRowToTable(0, 0);

    $('.btnLinearTrendRemove').click((el) => {
      const id = $(el.target).data('id');
      removeTrendRowFromTable(id);
    });
  });

  $('.btnLinearTrendRemove').click((el) => {
    const id = $(el.target).data('id');
    removeTrendRowFromTable(id);
  });

  $('#linearTrendCalculate').click(() => {
    solveLinearTrend();
  });
};
