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

let pages = {};

pages.home = {};
pages.home.page = document.querySelector('#home');

pages.regression = {};
pages.regression.page = document.querySelector('#regression');

pages.linearTrend = {};
pages.linearTrend.page = document.querySelector('#linearTrend');

let path = '';

function navigate() {
    path = location.hash.substr(1).split('/');

    let currentPage = path[0];

    if (!pages.hasOwnProperty(currentPage)) {
        if (!pages.hasOwnProperty(currentPage)) {
            currentPage = 'home';
        }
    }

    for (let page in pages) {
        if (pages.hasOwnProperty(page)) {
            pages[page].page.classList.remove('active');
        }

        pages[currentPage].page.classList.add('active');
    }
}

navigate();

window.onhashchange = navigate;
