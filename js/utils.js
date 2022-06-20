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

const isDigit = (chr) => {
    if (chr >= '0' && chr <= '9') {
        return true;
    }

    return false;
}

const isLetter = (chr) => {
    if ((chr >= 'A' && chr <= 'Z') || (chr >= 'a' && chr <= 'z')) {
        return true;
    }

    return false;
}

const clone = (obj) => {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}

const getAlphabet = (n) => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return str[n];
}

const strToNumber = (str) => {
  str = str.replace(',', '.');
  return parseFloat(str);
}

const numberToStr = (num) => {
  return num.toFixed(3);
}
