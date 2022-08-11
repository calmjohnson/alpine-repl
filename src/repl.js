import AlpineInstance from "alpinejs"
import {CodeJar} from 'codejar';
import hljs from 'highlight.js';

// Import line numbers helper.
import {withLineNumbers} from 'codejar/linenumbers';

export default () => ({
    activeEditor: AlpineInstance.$persist('html'),
    javascript: AlpineInstance.$persist('console.log("Hello world")'),
    html: AlpineInstance.$persist(`<div x-data="{ count: 0 }">
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

        //Html Editor
        const highlightHtml = editorHtml => {
            // highlight.js does not trims old tags,
            // let's do it by this hack.
            editorHtml.textContent = editorHtml.textContent
            hljs.highlightElement(editorHtml)
        }

        const editorHtml = document.querySelector(".editor-html")
        
        const jarHtml = CodeJar(editorHtml, withLineNumbers(highlightHtml), {tab: "  "})

        // Update code
        jarHtml.updateCode(this.html);

        // Get code
        let codeHtml = jarHtml.toString();

        // Listen to updates
        jarHtml.onUpdate(codeHtml => {
            this.html = codeHtml
        });

        //Javascript Editor
        const highlightJavascript = editorJavascript => {
            // highlight.js does not trims old tags,
            // let's do it by this hack.
            editorJavascript.textContent = editorJavascript.textContent
            hljs.highlightElement(editorJavascript)
        }

        const editorJavascript = document.querySelector(".editor-js")

        const jarJs = CodeJar(editorJavascript, withLineNumbers(highlightJavascript), {tab: "  "})

        // Update code
        jarJs.updateCode(this.javascript);

        // Get code
        let codeJs = jarJs.toString();

        // Listen to updates
        jarJs.onUpdate(codeJs => {
            this.javascript = codeJs
            let script = document.createElement('script')
            script.innerHTML = this.javascript
            document.getElementById('javascript').appendChild(script)
        });
    }
})