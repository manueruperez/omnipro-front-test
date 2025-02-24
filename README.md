# Omnipro Front Test

Esta es una aplicación web de gestión de tareas desarrollada como prueba técnica para Frontend Developer. La aplicación permite a los usuarios administrar proyectos y tareas de forma rápida, escalable y con una experiencia de usuario optimizada.

## Descripción del Proyecto

La aplicación cuenta con las siguientes funcionalidades:

- **Gestión de Tareas:** Crear, editar, eliminar y marcar tareas como completadas. Cada tarea posee título (obligatorio), descripción, fecha de vencimiento, estado y prioridad.
- **Gestión de Proyectos:** Crear, renombrar y eliminar proyectos, organizando las tareas correspondientes a cada uno.
- **Filtros y Ordenación:** Permite filtrar tareas por estado (pendiente/completada) y prioridad, y ordenarlas según la fecha de vencimiento.
- **Persistencia de Datos:** Los datos se almacenan utilizando Local Storage para mantener la información entre recargas.
- **UI/UX y Accesibilidad:** Diseño limpio, responsive y accesible, con feedback visual (mensajes de éxito/error, loaders, etc.) y compatibilidad con tecnologías asistivas.

## Arquitectura Utilizada

La aplicación fue desarrollada siguiendo una **arquitectura atómica**, en la que se dividen los componentes en:

- **Átomos:** Componentes básicos (botones, inputs, etc.).
- **Moléculas:** Conjuntos de átomos que forman elementos funcionales.
- **Organismos:** Componentes complejos compuestos por moléculas y átomos.
- **Templates:** Estructuras de página que integran organismos de forma coherente.

Además, se creó una carpeta `modules` que se encarga de manejar toda la lógica de la aplicación (por ejemplo, proyectos, tareas, home, not found y theme).

## Decisiones Técnicas Clave

- **Gestión de Estado:** Se utilizó **Redux** para el manejo de la información, lo que simplifica la manipulación de datos y mejora el rendimiento.
- **Testing:** Se empleó **Vitest** para las pruebas, aprovechando su integración directa con Vite.
- **Componentes y Estilos:** Se configuró **Ant Design** y **Tailwind CSS** para un desarrollo más rápido y eficaz, manteniendo al mismo tiempo la personalización de componentes a través de la arquitectura atómica.
- **Routing:** Se usó **React Router** para gestionar la navegación de la aplicación.

## Cómo Ejecutar el Proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/omnipro-front-test.git
   cd omnipro-front-test
   ```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar la aplicación en modo desarrollo:**

```bash
npm run dev
```

4. **Ejecutar las pruebas:**

```bash
npm run test
```

## Despliegue

La aplicación ha sido desplegada en Netlify. Puedes acceder a ella a través del siguiente enlace:
https://omnipro-front-test.netlify.app/

## Repositorio Público

El código fuente está disponible en el siguiente repositorio:
https://github.com/tu-usuario/omnipro-front-test

## Customizacion de colores

para poder cambiar los colores de la aplicacion se puede realizar configurando los siguientes archivos:

colors.css
theme.ts
