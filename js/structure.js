const { createApp } = Vue;

const customHeader = {
    template: `
        <div>
        </div>
        `,
};

const customFooter = {
    template: `
        <div>
        </div>
        `,
};

const headerApp = Vue.createApp({
    components: {
        'custom-header': customHeader,
    }
}).mount('#encabezado');

const footerApp = Vue.createApp({
    components: {
        'custom-footer': customFooter,
    }
}).mount('#pie');