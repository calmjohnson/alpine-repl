import Alpine from 'alpinejs'

import repl from './repl.js'
 

import persist from '@alpinejs/persist'
Alpine.plugin(persist)

window.Alpine = Alpine

Alpine.data('repl', repl)

Alpine.start()