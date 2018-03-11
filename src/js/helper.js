(() => {
  'use strict';

  let helper = document.querySelector('.helper');
  let side = document.querySelector('.side');
  let hoverClass = 'helper-active';
  side.addEventListener('mouseenter', () => {
    helper.classList.add(hoverClass);
  });
  side.addEventListener('mouseleave', () => {
    helper.classList.remove(hoverClass);
  });

})();
