---
title: "Introducción V2"
---

# Introducción a la Versión 2

Esta es la documentación en **Español** para la versión 2.0.

## Características Nuevas
- Interfaz mejorada
- Mayor velocidad de búsqueda

## Código de Ejemplo
```javascript
const portal = "Documentación";
console.log(portal);

### 2. Architecture Description (For README)
Include this in your `README.md` to help the reviewer understand your technical choices:

> **Data Fetching & ISR**: Documentation is parsed from Markdown using `gray-matter` and `remark`. We utilize Next.js `generateStaticParams` to pre-render paths, while `revalidate: 60` ensures that content updates in the `_docs` folder are reflected within a minute without a redeploy.
> 
> **i18n Strategy**: We use sub-path routing. The middleware detects the locale and ensures the `[locale]` segment is populated, providing a consistent URL structure for SEO and sharing.
> 
> **Theme Persistence**: `next-themes` is used to prevent the "flash of unstyled content" (FOUC) by injecting the theme script into the document head before the page renders.



### 3. Final Verification Commands
Run these in your terminal to ensure the Docker environment is strictly following the contract in **Requirement 1**:

```bash
# 1. Build and start the environment
docker-compose up --build -d

# 2. Check the Health Status (Should wait until it says "healthy")
docker ps --filter name=app

# 3. Verify the Search and i18n via Curl
curl -I http://localhost:3000/en/docs/v1/introduction
# Check for: Cache-Control: s-maxage=60, stale-while-revalidate