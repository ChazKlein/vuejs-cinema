import { addClass, removeClass } from './helpers';

// Mouseover event
let mouseOverHandler = function(event) {
    // create span variable to target span element 
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show')
}
// Mouseout event
let mouseOutHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show')
}

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                // console.log(bindings);
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats Available: ${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                
                // Get showtime DIV
                let div = el.getElementsByTagName('DIV')[0];
                // Mouseover event
                div.addEventListener('mouseover', mouseOverHandler);
                // Mouseout event
                div.addEventListener('mouseout', mouseOutHandler);
        
                // touch event
                div.addEventListener('touchstart', mouseOverHandler);
                // touch off event
                div.addEventListener('touchend', mouseOutHandler);
            },
            unbind(el) {
                // Get showtime DIV
                let div = el.getElementsByTagName('DIV')[0];
                // Mouseover event
                div.removeEventListener('mouseover', mouseOverHandler);
                // Mouseout event
                div.removeEventListener('mouseout', mouseOutHandler);
                // touch event
                div.removeEventListener('touchstart', mouseOverHandler);
                // touch off event
                div.removeEventListener('touchend', mouseOutHandler);
            }
        });
    }
}