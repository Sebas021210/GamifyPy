# Guía de despliegue de GamifyPy (costo $0)

Esta guía explica, paso a paso y desde cero, cómo publicar GamifyPy usando solo planes gratuitos:

| Pieza | Servicio | Plan | Qué hace |
|---|---|---|---|
| Base de datos (PostgreSQL) | **Neon** (recomendado) o Supabase | Free | Guarda usuarios, niveles, lecciones, preguntas, insignias |
| Backend (FastAPI) | **Render** | Free | La API: `https://<tu-backend>.onrender.com` |
| Frontend (React + Vite) | **Vercel** | Hobby (gratis) | La página web: `https://<tu-app>.vercel.app` |
| Evaluación de código | OpenAI | Pago por uso (centavos) | `gpt-4o-mini` para retroalimentación |

> **Orden recomendado:** 1) Base de datos → 2) cargar datos → 3) Backend en Render → 4) Frontend en Vercel → 5) conectar los dos (URLs, CORS, Google).
> El backend necesita la URL del frontend y el frontend necesita la URL del backend; por eso al final se "cierra el círculo".

> ⚠️ Los límites de los planes gratuitos cambian con el tiempo. Los números de esta guía son aproximados; confírmalos en la página de precios de cada servicio.

---

## 0. Antes de empezar

### Cuentas que necesitas
Crea (o inicia sesión) con tu cuenta de **GitHub** en todas; así se conectan solas al repositorio:
- https://neon.tech (o https://supabase.com)
- https://render.com
- https://vercel.com
- https://platform.openai.com (para la API key)
- https://console.cloud.google.com (ya lo tienes si configuraste el login con Google)

### Sube los cambios a GitHub
Render y Vercel despliegan **desde GitHub**, así que el código con la URL centralizada debe estar en el repo.

Esta guía usa una rama aparte, **`deploy`**, para no tocar `main` mientras pruebas. Cuando todo funcione, se hace merge a `main` (ver sección 9).

```bash
git checkout -b deploy
git add .
git commit -m "Centralizar URL de la API y preparar despliegue"
git push -u origin deploy
```

> El archivo `.env` está en `.gitignore`, así que tus claves **no** se suben. Las claves se escriben directamente en el panel de cada servicio.

### Variables de entorno que usa el proyecto

**Backend** (ver `backend/.env.example`):

| Variable | Para qué | Ejemplo |
|---|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://user:pass@host/db?sslmode=require` |
| `SECRET_KEY` | Firma los tokens de sesión (JWT) | una cadena larga aleatoria |
| `FRONTEND_URL` | Adónde regresa el login de Google y el enlace del correo de recuperación | `https://gamifypy.vercel.app` |
| `CORS_ORIGINS` | Qué dominios pueden llamar a la API | `https://gamifypy.vercel.app` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Login con Google | — |
| `OPENAI_API_KEY` | Evaluación de ejercicios | `sk-...` |
| `MAIL_USERNAME` / `MAIL_PASSWORD` / `MAIL_FROM` | Envío de PIN y recuperación (Gmail) | — |

**Frontend** (ver `frontend/gamifipy/.env.example`):

| Variable | Para qué | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL del backend, **sin** `/` al final | `https://gamifypy-api.onrender.com` |

Para generar un `SECRET_KEY` seguro:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

---

## 1. Base de datos

### Opción A — Neon (recomendada)

**¿Por qué Neon?** La base de datos se "duerme" cuando nadie la usa (no gasta horas de cómputo) y **se despierta sola** en menos de un segundo cuando llega una consulta. Supabase, en cambio, **pausa el proyecto después de ~7 días sin actividad** y tienes que entrar al panel a reactivarlo manualmente. Para un portafolio que se visita de vez en cuando, eso es un problema.

1. Entra a https://console.neon.tech e inicia sesión con GitHub.
2. **Create project**:
   - *Project name:* `gamifypy`
   - *Postgres version:* la que venga por defecto.
   - *Region:* escoge una en **Estados Unidos (ej. AWS US East, Ohio o Virginia)**. Importante: usa la **misma región aproximada** que usarás en Render (más adelante escogeremos *Ohio* o *Virginia*) para que las consultas sean rápidas.
3. Al crearlo aparece el panel **Connection details** (o botón **Connect**):
   - *Database:* `neondb` (o la que viene por defecto).
   - Activa **Connection pooling** (Pooled connection).
   - Copia la cadena. Se ve así:
     ```
     postgresql://neondb_owner:XXXXXXXX@ep-algo-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
     ```
   Esa cadena completa es tu `DATABASE_URL`. Guárdala; **es secreta**.

> Si al conectar ves un error relacionado con `channel_binding`, borra `&channel_binding=require` del final de la cadena y deja solo `?sslmode=require`.

**Límites del plan gratis (aprox.):** ~0.5 GB de almacenamiento por proyecto (GamifyPy usa unos pocos MB) y un número limitado de horas de cómputo al mes, que solo se consumen mientras la BD está despierta. Con autosuspensión activada (viene por defecto) un portafolio no llega ni cerca del límite.

### Opción B — Supabase

1. Entra a https://supabase.com/dashboard → **New project**.
2. Escoge una contraseña para la base de datos (**guárdala**) y una región en EE. UU. (East).
3. Cuando termine de crearse: botón **Connect** (arriba) → pestaña **Connection string** → **URI**.
4. **Usa el "Session pooler"**, no la conexión directa. La conexión directa de Supabase solo funciona por IPv6 y Render no la soporta. La cadena se ve así:
   ```
   postgresql://postgres.abcdefghij:[TU-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```
   Reemplaza `[TU-PASSWORD]` por tu contraseña y agrega `?sslmode=require` al final.

> Recuerda: en el plan gratis el proyecto se **pausa tras ~7 días sin uso**. Si alguien entra a tu portafolio y la app falla, revisa el panel de Supabase y dale *Restore*.

---

## 2. Crear las tablas y cargar el contenido (desde tu computadora)

Las tablas se crean solas la primera vez que el backend se conecta (`Base.metadata.create_all`). El contenido (niveles, lecciones, preguntas, habilidades e insignias) se carga con un script. Lo más sencillo es hacerlo **una sola vez desde tu computadora**, apuntando a la base de datos en la nube.

1. Crea el archivo **`backend/.env`** (copia `backend/.env.example`) y pon la cadena de Neon/Supabase en `DATABASE_URL`.
   El backend **siempre** lee `backend/.env` (el `.env` de la raíz ya no se usa). Al correr el script verás `🔌 Conectando a: ...`: confirma que sea el host de Neon/Supabase y no `localhost`.
   Si la base ya tiene contenido, el script se detiene sin cambiar nada.
   ```env
   DATABASE_URL=postgresql://neondb_owner:XXXX@ep-...-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   > Nota: antes el código leía `DATABASE_URL_HETZNER`. Ahora lee **`DATABASE_URL`**.

2. Instala las dependencias del backend (si no las tienes):
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Desde la **raíz del proyecto** (no desde `backend/`, porque el script lee las carpetas `Docs/` y `Content/`) ejecuta:
   ```bash
   python -m backend.database.seed_all
   ```
   Esto hace, en orden: categorías y niveles → lecciones de los 14 niveles (`Docs/LevelN.md`) → preguntas de los 14 niveles (`Content/LevelN.json`) → habilidades → insignias.

   Deberías ver varios `✅` y al final `🎉 Base de datos lista.`

> ⚠️ Ejecuta `seed_all` **solo una vez** sobre una base vacía. Las lecciones, preguntas, habilidades e insignias se **agregan**, no se reemplazan; si lo corres dos veces tendrás todo duplicado. Si pasa, lo más rápido es borrar la base en Neon (*Branches → main → Reset* o crear un proyecto nuevo) y volver a correrlo.
>
> El orden importa: el login con Google le da al usuario la insignia con **id 53**, y las preguntas apuntan a lecciones por id. Por eso hay que cargar todo en una base vacía y en este orden.

4. Comprueba en Neon → **Tables** que existan datos en `niveles`, `lecciones`, `preguntas`, `insignias`, etc.

---

## 3. Backend en Render

Render va a construir la imagen con el `Dockerfile` de la raíz del repo y ejecutar la API.

1. Entra a https://dashboard.render.com e inicia sesión con GitHub.
2. **New +** → **Web Service**.
3. **Connect a repository** → autoriza a Render para ver tus repos → escoge `Sebas021210/GamifyPy`.
4. Configura:

   | Campo | Valor |
   |---|---|
   | Name | `gamifypy-api` (esto define la URL: `https://gamifypy-api.onrender.com`) |
   | Language / Runtime | **Docker** |
   | Branch | **`deploy`** |
   | Region | **Ohio (US East)** o **Virginia**, la más cercana a tu región de Neon |
   | Root Directory | *(vacío)* |
   | Dockerfile Path | `./Dockerfile` |
   | Instance Type | **Free** |

5. En **Environment Variables** agrega (botón *Add Environment Variable*):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | tu cadena de Neon/Supabase |
   | `SECRET_KEY` | la clave aleatoria que generaste |
   | `FRONTEND_URL` | por ahora `http://localhost:5173` (lo cambiamos en el paso 5) |
   | `CORS_ORIGINS` | por ahora `*` |
   | `GOOGLE_CLIENT_ID` | el de tu `.env` |
   | `GOOGLE_CLIENT_SECRET` | el de tu `.env` |
   | `OPENAI_API_KEY` | tu API key de OpenAI |
   | `MAIL_USERNAME` | tu correo de Gmail |
   | `MAIL_PASSWORD` | la *contraseña de aplicación* de Gmail |
   | `MAIL_FROM` | tu correo de Gmail |

   > **No** agregues `PORT`: Render la define solo y el `Dockerfile` ya la usa.

6. (Opcional) En **Advanced → Health Check Path** pon `/docs`.
7. Clic en **Deploy Web Service**. La primera vez tarda unos minutos. En la pestaña **Logs** debes ver algo como `Uvicorn running on http://0.0.0.0:10000`.
8. Prueba: abre `https://gamifypy-api.onrender.com/docs`. Debe aparecer la documentación de la API (Swagger). Prueba también `https://gamifypy-api.onrender.com/category-level/niveles`.

### Cosas que debes saber del plan gratis de Render
- **Se duerme tras ~15 minutos sin tráfico.** La primera visita después de eso tarda **~30–60 segundos** en responder (*cold start*). Luego va normal.
- Tienes ~750 horas gratis al mes por cuenta, suficiente para **un** servicio encendido todo el mes.
- Cada `git push` a la rama configurada (`deploy`) redespliega automáticamente (*Auto-Deploy*). Si no quieres eso, desactívalo en *Settings*.
- **Correos (SMTP):** Render ha restringido el tráfico SMTP saliente (puertos 25/465/587) en los servicios **gratuitos**. Si al registrarte **no llega el PIN** o el correo de recuperación, esa es la causa. Soluciones:
  - Usar el **login con Google** o el acceso de invitado (recomendado para el portafolio).
  - Cambiar el envío de correos a una API HTTP con plan gratis (Resend, Brevo, etc.).
  - Subir a un plan de pago de Render (no lo recomiendo solo por esto).

---

## 4. Frontend en Vercel

1. Entra a https://vercel.com e inicia sesión con GitHub.
2. **Add New… → Project** → **Import** el repo `GamifyPy`.
3. Configura:

   | Campo | Valor |
   |---|---|
   | Project Name | `gamifypy` (define la URL: `https://gamifypy.vercel.app` si está libre) |
   | Framework Preset | **Vite** (lo detecta solo) |
   | **Root Directory** | **`frontend/gamifipy`** ← muy importante, clic en *Edit* y escógela |
   | Build Command | `npm run build` (por defecto) |
   | Output Directory | `dist` (por defecto) |

4. En **Environment Variables**:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://gamifypy-api.onrender.com` (tu URL de Render, **sin** `/` al final) |

5. **Deploy**. En uno o dos minutos te da la URL, por ejemplo `https://gamifypy.vercel.app`.

### 4.1 Hacer que Vercel use la rama `deploy`

Al importar el proyecto, Vercel **no** te deja escoger la rama: siempre despliega la rama por defecto del repo (`main`). Ese primer deploy tiene el código viejo (URLs a `gamifypy.online`), así que no va a funcionar. Es normal; hay que decirle a Vercel que use `deploy`.

**¿Por qué no basta con subir la rama?** En Vercel, cualquier rama que no sea la de producción genera un *Preview deployment*, y los previews:
- tienen **protección activada** (quien abra el link debe iniciar sesión en Vercel con acceso al proyecto), así que no sirven para el portafolio;
- tienen una URL larga (`gamifypy-git-deploy-<usuario>.vercel.app`);
- usan variables de entorno del entorno *Preview*, no las de *Production*.

Por eso la solución es convertir `deploy` en la rama de **producción**:

1. En el proyecto de Vercel: **Settings → Environments → Production**.
   (En versiones anteriores del panel está en **Settings → Git → Production Branch**.)
2. En **Branch Tracking**, cambia `main` por **`deploy`** y guarda (*Save*).
3. Verifica que `VITE_API_URL` esté marcada para el entorno **Production** (Settings → Environment Variables).
4. Cambiar la rama no redespliega por sí solo. Lanza un deploy nuevo desde `deploy` con un commit vacío:
   ```bash
   git checkout deploy
   git commit --allow-empty -m "Redeploy en Vercel desde la rama deploy"
   git push
   ```
5. En **Deployments** debe aparecer un deploy nuevo con la etiqueta **Production** y la rama `deploy`. Cuando termine, `https://gamifypy.vercel.app` ya tiene el código nuevo.

> Para confirmar que el frontend llama al backend correcto: abre la página, F12 → pestaña **Network**, y revisa que las peticiones vayan a `https://gamifypy-api.onrender.com/...` y no a `gamifypy.online` ni a `localhost`.

> **Importante:** las variables `VITE_...` se "incrustan" en el código al compilar. Si cambias `VITE_API_URL`, tienes que ir a *Deployments → ⋯ → Redeploy* para que surta efecto.

> El archivo `frontend/gamifipy/vercel.json` hace que rutas como `/auth/callback` o `/reset-password` funcionen al recargar la página (sin él Vercel devolvería 404).

---

## 5. Conectar todo

### 5.1 Actualizar el backend con la URL del frontend
En Render → tu servicio → **Environment**, cambia:

| Key | Value |
|---|---|
| `FRONTEND_URL` | `https://gamifypy.vercel.app` |
| `CORS_ORIGINS` | `https://gamifypy.vercel.app` |

Guarda (*Save, rebuild and deploy*). Si quieres permitir también tu entorno local: `CORS_ORIGINS=https://gamifypy.vercel.app,http://localhost:5173`.

### 5.2 Actualizar Google OAuth
En https://console.cloud.google.com → **APIs y servicios → Credenciales** → tu *ID de cliente OAuth 2.0*:

- **Orígenes autorizados de JavaScript:** agrega `https://gamifypy.vercel.app`
- **URI de redireccionamiento autorizados:** agrega `https://gamifypy-api.onrender.com/auth/callback`

Guarda. Puede tardar unos minutos en aplicarse.

> Si la pantalla de consentimiento de OAuth está en modo **Testing**, solo los correos que agregues como *test users* pueden iniciar sesión con Google. Para que cualquiera pueda, en *Pantalla de consentimiento de OAuth* dale **Publicar app** (con los scopes `openid`, `email`, `profile` no requiere verificación de Google).

### 5.3 Prueba final
1. Abre `https://gamifypy-api.onrender.com/docs` para despertar el backend.
2. Abre `https://gamifypy.vercel.app`.
3. Prueba: login con Google → ver niveles → abrir una lección → resolver un ejercicio de código (usa OpenAI) → ver insignias en el perfil.

Si algo falla, abre las herramientas de desarrollador del navegador (F12 → *Console* y *Network*) y revisa los *Logs* de Render.

---

## 6. Cómo gastar lo mínimo

| Servicio | Costo esperado | Cómo mantenerlo en $0 |
|---|---|---|
| Neon | $0 | Deja activada la autosuspensión (viene por defecto). No agregues tarjeta si no quieres riesgo de cobro. |
| Render | $0 | Usa *Instance Type: Free*. Un solo servicio web. No crees bases de datos en Render (la gratis de Render **expira** a los 30 días; por eso usamos Neon). |
| Vercel | $0 | Plan *Hobby*. Un portafolio personal es uso no comercial, está permitido. |
| OpenAI | centavos | Ver abajo. Es el **único** servicio que puede costar dinero. |
| Dominio | $0 | Usa los subdominios gratis `*.vercel.app` y `*.onrender.com`. Si algún día quieres dominio propio, cuesta ~$10–15/año y se conecta en Vercel → *Settings → Domains*. |

### Controlar el gasto de OpenAI
`gpt-4o-mini` es de los modelos más baratos: cada evaluación cuesta una fracción de centavo. Aun así, protege tu cuenta:

1. https://platform.openai.com → **Settings → Billing**: recarga **créditos prepagados** (por ejemplo $5) y **desactiva el auto-recharge**. Así nunca puedes gastar más de lo que cargaste.
2. **Settings → Limits**: pon un **límite de presupuesto mensual** (ej. $2–5) y un aviso por correo.
3. Crea una **API key exclusiva** para GamifyPy (*API keys → Create new secret key*), así puedes revocarla sin afectar otros proyectos.
4. Si OpenAI retira `gpt-4o-mini` en el futuro, cambia el nombre del modelo en `backend/controllers/evaluation.py` por el modelo económico vigente.

### Evitar la espera del *cold start* (opcional)
- Antes de mostrar el proyecto (entrevista, presentación), abre `https://gamifypy-api.onrender.com/docs` un minuto antes.
- O agrega en tu portafolio un aviso: *"El servidor es gratuito y puede tardar ~1 minuto en despertar la primera vez."*
- Puedes usar un servicio gratis como https://cron-job.org para llamar a `https://gamifypy-api.onrender.com/docs` cada 14 minutos. `/docs` **no** toca la base de datos, así que Neon sigue durmiendo y no gasta horas. Un solo servicio encendido todo el mes (~744 h) cabe en las 750 h gratis de Render.

---

## 7. Desarrollo local

```bash
# Backend (desde la raíz del proyecto; las variables van en backend/.env)
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000

# Frontend (en otra terminal)
cd frontend/gamifipy
cp .env.example .env          # VITE_API_URL=http://localhost:8000
npm install
npm run dev                   # http://localhost:5173
```

> El login con Google **no funciona en local**: `routes/auth.py` fuerza `https` en la URL de callback y `localhost` corre en `http`. Para desarrollo usa el login con correo y contraseña.

---

## 8. Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| La página carga pero no aparecen niveles; en la consola hay error de **CORS** | `CORS_ORIGINS` no incluye tu dominio de Vercel | Revisa el paso 5.1 (sin `/` al final) |
| Peticiones van a `http://localhost:8000` en producción | `VITE_API_URL` no estaba definida al compilar | Agrégala en Vercel y haz **Redeploy** |
| La primera carga tarda ~1 minuto | *Cold start* de Render | Normal en el plan gratis (ver sección 6) |
| Google muestra `redirect_uri_mismatch` | Falta el redirect URI de Render en Google Cloud | Paso 5.2; debe ser exactamente `https://<tu-backend>.onrender.com/auth/callback` |
| Tras el login con Google llega a una página 404 | `FRONTEND_URL` mal configurada o falta `vercel.json` | Revisa paso 5.1 |
| No llega el PIN de registro / correo de recuperación | Render gratis bloquea SMTP, o la contraseña de aplicación de Gmail es inválida | Ver sección 3 |
| Error `could not connect to server` / `SSL` en logs | `DATABASE_URL` incorrecta | Copia de nuevo la cadena *pooled* y verifica `?sslmode=require` |
| Las imágenes de insignias no cargan | `VITE_API_URL` apunta mal | Deben cargar desde `https://<tu-backend>.onrender.com/static/insignias/...` |
| Los ejercicios de código no dan retroalimentación | `OPENAI_API_KEY` inválida o sin saldo | Revisa *Billing* en OpenAI y los logs de Render |
| Datos duplicados | Se corrió `seed_all` dos veces | Resetea la BD y córrelo una sola vez |
| Vercel sigue llamando a `gamifypy.online` | Está desplegando `main` en lugar de `deploy` | Ver sección 4.1 |
| El link de Vercel pide iniciar sesión en Vercel | Estás abriendo un *Preview*, no Production | Usa la URL de producción o cambia la rama de producción (4.1) |

---

## 9. Cuando todo funcione: pasar los cambios a `main`

1. Haz merge de `deploy` a `main`:
   ```bash
   git checkout main
   git pull
   git merge deploy
   git push
   ```
   (O en GitHub abre un *Pull Request* de `deploy` → `main` y dale *Merge*.)
2. **Render:** tu servicio → **Settings → Build & Deploy → Branch** → cambia a `main` → guarda. Redespliega solo.
3. **Vercel:** **Settings → Environments → Production → Branch Tracking** → cambia a `main` → guarda. Luego redespliega (*Deployments → ⋯ → Redeploy* sobre el último deploy, o haz cualquier push a `main`).
4. Si ya no la necesitas, borra la rama:
   ```bash
   git branch -d deploy
   git push origin --delete deploy
   ```
