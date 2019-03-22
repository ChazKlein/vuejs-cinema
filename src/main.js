import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

// Data calls for API
import VueResource from 'vue-resource';
Vue.use(VueResource);

// Import Moment Timezone with moment variable. Add it to "data" constructor
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
// Create an Object and define property for Vue protoype (to use moment-timezone anywhere)
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });


new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment()
    },
    methods: {
        checkFilter(category, title, checked) {
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
            
        }
    },
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
    }
})