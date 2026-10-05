#!/usr/bin/env node
/**
 * Prueba el token que despierta al worker del detector de bots.
 *
 * El `repository_dispatch` que manda /api/tools/serp-farm/analyze es lo único que hace
 * que un análisis salga al instante; sin él, el job espera al cron de GitHub, que en
 * este repo viene demorando horas. Pero la API no puede avisar si el token falla: una
 * respuesta 401 o 403 se ve igual que un éxito desde el navegador.
 *
 * Este script hace exactamente la misma llamada que hace el sitio y dice qué contestó
 * GitHub, para saber si el token sirve ANTES de cargarlo en Netlify.
 *
 * Uso:
 *   node scripts/probar-dispatch.mjs <token>
 *   GITHUB_DISPATCH_TOKEN=<token> node scripts/probar-dispatch.mjs
 *
 * Si sale bien, dispara una corrida real del worker (procesa la cola si hay algo).
 */

const REPO = 'Ezzeorazi/mi-portafolio';
const EVENT = 'serp-farm-job';

const token = process.argv[2] || process.env.GITHUB_DISPATCH_TOKEN;

if (!token) {
  console.error(`
Falta el token.

  node scripts/probar-dispatch.mjs <token>

Se crea en GitHub → Settings → Developer settings → Personal access tokens →
Fine-grained tokens, con acceso al repo ${REPO} y permiso "Contents: Read and write".
`);
  process.exit(1);
}

console.log(`Probando el disparo del worker en ${REPO}…\n`);

const res = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'serp-farm-detector',
  },
  body: JSON.stringify({ event_type: EVENT }),
});

const body = await res.text();

// GitHub contesta 204 sin cuerpo cuando acepta el dispatch.
if (res.status === 204) {
  console.log('✓ El token funciona. GitHub aceptó el disparo (204).');
  console.log('');
  console.log('  Cargalo en Netlify como GITHUB_DISPATCH_TOKEN y hacé un redeploy:');
  console.log('  Site configuration → Environment variables → Add a variable.');
  console.log('');
  console.log('  Mirá la corrida que acabás de disparar:');
  console.log(`  https://github.com/${REPO}/actions/workflows/serp-farm-worker.yml`);
  process.exit(0);
}

const diagnostico = {
  401: 'El token no es válido o está vencido. Generá uno nuevo.',
  403: 'El token es válido pero no tiene permiso para disparar workflows. Le falta "Contents: Read and write" sobre este repo (si es un token clásico, el scope "repo").',
  404: 'GitHub no ve el repo con ese token: suele ser un fine-grained token al que no se le dio acceso a este repositorio en particular.',
  422: 'El repo existe y el token sirve, pero GitHub rechazó el evento. Revisá que el workflow tenga "repository_dispatch: types: [serp-farm-job]".',
};

console.error(`✗ GitHub rechazó el disparo (HTTP ${res.status}).`);
console.error('');
console.error(`  ${diagnostico[res.status] || 'Respuesta inesperada de GitHub.'}`);
if (body) console.error(`\n  Respuesta: ${body.slice(0, 300)}`);
process.exit(1);
