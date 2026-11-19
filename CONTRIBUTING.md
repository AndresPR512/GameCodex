# GameCodex — Guía de trabajo con Git y GitHub

Para mantener organizado el desarrollo de GameCodex, cada integrante trabajará en una rama independiente y solicitará que sus cambios sean revisados antes de incorporarlos a `main`.

## 1. Preparación inicial (solo la primera vez)

Cada integrante debe tener instalado Git y Visual Studio Code, y acceso al repositorio:

https://github.com/AndresPR512/GameCodex

Desde la terminal, configurar su identidad:

`git config --global user.name "Nombre Apellido"`

`git config --global user.email "correo-asociado-a-github"`

Utilizar el correo asociado y verificado en su cuenta de GitHub, o su dirección privada `noreply`.

Clonar el repositorio:

`git clone https://github.com/AndresPR512/GameCodex.git`

Entrar a la carpeta:

`cd GameCodex`

Abrir el proyecto en VS Code:

`code .`

Estos pasos solamente necesitan realizarse la primera vez.

## 2. Antes de comenzar una tarea

Asegurarse de tener los últimos cambios del proyecto:

`git switch main`

`git pull origin main`

Después, crear una rama para la tarea correspondiente:

`git switch -c feature/HU-04-catalogo`

Reemplazar el nombre de ejemplo por el código y descripción de la tarea asignada.

**Importante:** cada nueva rama debe crearse desde la versión actualizada de `main`, no desde otra rama de trabajo.

## 3. Verificar la rama actual

Antes de modificar cualquier archivo, ejecutar:

`git branch --show-current`

El comando debe mostrar el nombre de la rama de trabajo, no `main`.

También puede verificarse con:

`git status`

En VS Code, el nombre de la rama aparece en la barra inferior.

## 4. Desarrollar y registrar los cambios

Trabajar en los archivos correspondientes a la tarea asignada.

Para consultar qué archivos fueron modificados:

`git status`

Cuando haya un avance significativo, agregar los archivos correspondientes:

`git add .`

Revisar los cambios preparados y registrar el commit:

`git commit -m "feat: crear estructura del catalogo"`

Los commits deben describir los cambios realizados. Se recomienda hacer varios commits pequeños durante el desarrollo y evitar agrupar todo el trabajo en uno solo.

## 5. Subir los cambios a GitHub

Para publicar una rama nueva por primera vez:

`git push -u origin feature/HU-04-catalogo`

En los siguientes commits de esa misma rama, normalmente bastará con:

`git push`

## 6. Crear un Pull Request

Cuando la funcionalidad esté lista:

1. Entrar al repositorio en GitHub.
2. Abrir **Pull requests**.
3. Crear un nuevo Pull Request desde la rama de trabajo hacia `main`.
4. Escribir un título descriptivo.
5. Explicar brevemente los cambios realizados.
6. Solicitar la revisión del líder del equipo.

El líder revisará los cambios y podrá aprobarlos o solicitar correcciones.

Cuando el líder sea el autor del Pull Request, otro integrante realizará la revisión.

## 7. Después de la aprobación

Una vez aprobado e integrado el Pull Request:

- Comprobar que los cambios aparezcan en `main`.
- Eliminar la rama remota si ya no se necesita.
- Adjuntar el enlace del Pull Request a la tarjeta correspondiente de Trello.
- Mover la tarjeta a **Terminado**, siempre que cumpla sus criterios de aceptación.

Para empezar una nueva tarea, regresar a `main`, actualizarla y crear una nueva rama.

## Reglas importantes

- No desarrollar directamente sobre `main`.
- No realizar commits de cambios ajenos desde cuentas propias.
- No modificar archivos de otros módulos sin coordinarlo.
- Realizar al menos cinco commits propios en dos semanas diferentes.
- Mantener las tarjetas de Trello actualizadas.
- Comunicar cualquier conflicto, error o dificultad al equipo.
- No eliminar una rama con trabajo pendiente de integrar.