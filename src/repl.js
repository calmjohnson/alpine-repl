import AlpineInstance from "alpinejs"
import {CodeJar} from 'codejar';
import hljs from 'highlight.js';

// Import line numbers helper.
import {withLineNumbers} from 'codejar/linenumbers';

export default () => ({
    code: AlpineInstance.$persist(`<div x-data="{ count: 0 }">
    <button x-on:click="count++">Increment</button>
 
    <span x-text="count"></span>
</div>`),

    errors: [],
    
    clearConsole() {
        console.clear();
        this.errors = [];
    },

    init() {  
        window.addEventListener('error', (event) => {
            //log.textContent = `${log.textContent}${event.type}: ${event.message}\n`;
            console.log(event)
            this.errors.push(event.message) 
            console.log(event.message)
            //console.log(this.errors.message)
        });

        const highlight = editor => {
            // highlight.js does not trims old tags,
            // let's do it by this hack.
            editor.textContent = editor.textContent
            hljs.highlightElement(editor)
        }

        const editor = document.querySelector(".editor")
        editor.style.height = "550px"
       

        const jar = CodeJar(editor, withLineNumbers(highlight), {tab: "  "})

        // Update code
        jar.updateCode(this.code);

        // Get code
        let code = jar.toString();

        // Listen to updates
        jar.onUpdate(code => {
            this.code = code
            var newdiv = document.createElement('div');

            var p = document.createElement('p');
            p.innerHTML = "Dynamically added text";
            newdiv.appendChild(p);

            var script = document.createElement('script');
            script.innerHTML = "console.log('i am here');";
            newdiv.appendChild(script);

            document.getElementById('result').appendChild(newdiv);
        });
    }
})