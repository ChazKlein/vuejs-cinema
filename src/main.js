import Vue from 'vue';
import './style.scss';

// Data calls for API
import VueResource from 'vue-resource';
Vue.use(VueResource);

// Import Moment Timezone with moment variable. Add it to "data" constructor
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
// Create an Object and define property for Vue protoype (to use moment-timezone anywhere)
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });

// Import checkFilter because it is a global method now
import { checkFilter } from './util/bus';
import { setDay } from './util/bus';
// Event bus for passing/emitting props anywhere
const bus = new Vue();
// Then pass that into a prototype in bus
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus} });

// Import Vue Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// Router import and constructor
import routes from './util/routes';
const router = new VueRouter({ routes });

// Custom Tooltip plugin
import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        // Create listener for Bus on global level
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router
});


