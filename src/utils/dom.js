export function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

/**
 * Checks that clicked to specified element.
 *
 * @param  {HTMLElement}  el      Needed element
 * @param  {HTMLElement}  target  Clicked element
 * @return {boolean}
 */
export function checkElClick(el, target) {
    return target === el || el.contains(target);
}
