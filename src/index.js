import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let secondCount = 0;

setInterval(() => {
  secondCount += 1;
  $('#main').html(`You've been on this page for ${secondCount} seconds.`);
}, 1000);
