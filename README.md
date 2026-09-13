# Remesas Control

Aplicación web ligera para registrar operaciones de remesas Perú → Venezuela y estimar USDT mediante tasa y factor de optimización.

## Stack
- Frontend: HTML5, CSS3, JavaScript ES Modules
- Tooling: Vite + ESLint + Vitest
- Persistencia: localStorage (MVP, sin datos sensibles)
- CI/CD: GitHub Actions + GitHub Pages

## Arquitectura
```text
Usuario → UI/Vite → Calculadora → localStorage
                  ↓
             GitHub Actions
          lint → test → build
                  ↓
             staging (Pages)
```

## Instalación
```bash
npm install
npm run dev
```

## Calidad
```bash
npm run lint
npm test
npm run build
```

## Flujo Git
- `main`: producción.
- `staging`: integración y preproducción.
- `feature/*`: desarrollo aislado.
- Commits con Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `ci:`, `chore:`.
- Cada cambio funcional debe llegar mediante Pull Request asociado a un Issue.

## Seguridad y gobierno
Activar en Settings → Security: Dependabot alerts, Dependabot security updates y Secret scanning. En Settings → Branches/Rulesets, proteger `main` y exigir Pull Request, CI verde y al menos una aprobación antes de merge.

## Contribución
1. Crear Issue.
2. Crear `feature/<nombre>` desde `main`.
3. Hacer commits pequeños y verificables.
4. Abrir PR con `Closes #<issue>`.
5. Resolver comentarios de revisión.
6. Esperar CI y aprobación.
7. Merge a `main` mediante squash merge.

## API
El MVP no expone API HTTP. La lógica de conversión se ejecuta en el cliente. Si se incorpora backend, documentar endpoints, autenticación, errores y ejemplos en `docs/api.md`.

## Limitaciones
No usar localStorage para información bancaria, credenciales, documentos de identidad ni otros datos sensibles. Las tasas son introducidas por el usuario y no representan cotizaciones en tiempo real.
