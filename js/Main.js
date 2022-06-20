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

/*
 * Main
 */

function renderEquationsSystem(latex) {
  $('#equationsLatex').empty();
  $('#equationsLatex').html(latex);
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

function renderLinearProgramming(latex, index) {
  $('#linearProgrammingLatex' + index).empty();
  $('#linearProgrammingLatex' + index).html(latex);
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

(() => {
  regression();
})();
