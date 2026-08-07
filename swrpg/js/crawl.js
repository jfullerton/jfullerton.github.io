/*
 * Star Wars opening crawl from 1977
 * 
 * I freaking love Star Wars, but could not find
 * a web version of the original opening crawl from 1977.
 * So I created this one.
 *
 * I wrote an article where I explain how this works:
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 * 
 * Watch the Start Wars opening crawl on YouTube.
 * http://www.youtube.com/watch?v=7jK-jZo6xjY
 * 
 * Stuff I used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - SVG (the Star Wars logo from wikimedia.org)
 *   http://commons.wikimedia.org/wiki/File:Star_Wars_Logo.svg
 * - JavaScript (to sync the animation/audio)
 *
 * Thanks to Craig Buckler for his amazing article 
 * which helped me to create this remake of the Star Wars opening crawl. 
 * http://www.sitepoint.com/css3-starwars-scrolling-text/ 
 *
 * Sound copyright by The Walt Disney Company.
 * 
 *
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 *
 * Rewritten in vanilla JavaScript (jQuery dependency removed).
 */
(function () {
  'use strict';

  var el = document.querySelector('.starwars');
  if (!el) {
    return;
  }

  // Audio to play the opening crawl
  var audio = el.querySelector('audio');
  audio.volume = 0.25;

  // Start the animation
  var start = el.querySelector('.start');

  // The animation wrapper. Detached from the DOM while idle; a deep clone
  // is re-appended on each play so the CSS animations restart from zero.
  var animation = el.querySelector('.animation');

  // Resets the animation and shows the start screen
  function reset() {
    start.style.display = '';
    var cloned = animation.cloneNode(true);
    if (animation.parentNode) {
      animation.parentNode.removeChild(animation);
    }
    animation = cloned;
  }

  // Remove animation and show the start screen
  reset();

  // Start the animation on click
  start.addEventListener('click', function () {
    start.style.display = 'none';
    start.querySelector('p').textContent = 'Replay';
    audio.play();
    el.appendChild(animation);
    document.body.classList.add('stars');
  });

  // Reset the animation and show the start screen when the music ends
  audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    reset();
  });
})();
