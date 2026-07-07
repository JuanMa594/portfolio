/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Grises / Estructura
          canvas: '#0F0F0F',     // Fondo general de la app
          surface: '#1A1A1A',    // Fondo de tarjetas, navbar, etc.
          secondary: '#1E222B',  //Fondo de elementos secundarios, como el terminal
          border: '#232323',     // Bordes sutiles modernos
          hover: '#333333',      // Fondos en eventos hover
          
          //Typography
          primaryText: '#F8F9FA',  // Texto principal
          secondaryText: '#A0A0A0', // Texto secundario

          // Azules Profundos
          navy: {
            deep: '#011142',     // Para degradés oscuros atmosféricos
            medium: '#011C6B',   // Estados activos / Tags de filtros
            light: '#01258F',
          },
          
          // Azules de Acción (Acentos)
          primary: '#0231BD',    // Botón primario / Enlaces
          accent: '#023BE6',     // El azul eléctrico para resaltar detalles clave
        }
      }
    },
  },
  plugins: [],
}