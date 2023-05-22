const { createApp } = Vue;

const customFooter = {
    template: `
        <div v-on:click="CambiarNombre()" v-on:mouseout="VolverNombre()">
            <h1>Componente creado por <span id="nombre">{{nombre}}</span></h1>
        </div>
        `,
    data() {
        return {
            nombre: 'Toribio'
        }
    },
    methods: {
        CambiarNombre() {
            this.nombre = "Gimeno";
        },
        VolverNombre() {
            if (this.nombre != "Toribio") {
                this.nombre = "Toribio";
            }
        },
    }
};

const app = Vue.createApp({
    components: {
        'custom-footer': customFooter,
    }
}).mount('#pie');