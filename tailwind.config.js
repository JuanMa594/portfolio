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
          border: '#232323',     // Bordes sutiles modernos
          hover: '#333333',      // Fondos en eventos hover
          
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