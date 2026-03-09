# English in Wonderland Ecosystem

Este proyecto es un ecosistema educativo y de servicios de traducción digital, desarrollado con **Next.js 15**, **React 19**, **Tailwind CSS v4** y **TypeScript**.

## Requisitos Previos

- Node.js 18.17 o superior
- npm

## Instalación

1. Clona el repositorio o navega a la carpeta del proyecto:
   ```bash
   cd english-in-wonderland
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

- **`/src/app`**: Rutas de la aplicación (App Router).
  - `/education`: Vertical educativa (Cursos, Método, Tienda).
  - `/translations`: Vertical de traducciones.
  - `/campus`: Área privada de alumnos (Login).
  - `/legal`: Términos y condiciones.
- **`/src/components`**: Componentes reutilizables.
  - `ui/`: Botones, inputs, tarjetas (Primitives).
  - `layout/`: Header, Footer.
- **`/src/lib`**: Utilidades y configuración.

## Características Clave

- **Multivertical**: Separación clara entre Educación y Traducciones.
- **Diseño Premium**: Uso de Glassmorphism, animaciones suaves y tipografía moderna (Outfit).
- **Ecommerce Ready**: Estructura para tienda digital en `/education/store`.
- **Responsive**: Totalmente adaptado a móviles y escritorio.
