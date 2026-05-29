/**
 * place.js
 * Handles: footer year/last-modified + wind chill calculation
 * Assignment: WDD131 – Place Page
 */

// ── FOOTER: current year & last modified ──────────────────────────────────────
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// ── WIND CHILL ────────────────────────────────────────────────────────────────

/**
 * Calculates the wind chill factor using the Canadian/Metric formula.
 * @param {number} tempC     - Air temperature in °C
 * @param {number} windKmh   - Wind speed in km/h
 * @returns {number} Wind chill index in °C (one decimal place)
 */
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// ── STATIC VALUES matching the displayed weather data ─────────────────────────
const temperature = 10;   // °C
const windSpeed   = 5;    // km/h

// ── WIND CHILL CONDITIONS (Metric) ───────────────────────────────────────────
//   Temperature  ≤ 10 °C
//   Wind speed   > 4.8 km/h
const windChillEl = document.getElementById('wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
  const chill = calculateWindChill(temperature, windSpeed);
  windChillEl.textContent = chill.toFixed(1) + ' °C';
} else {
  windChillEl.textContent = 'N/A';
}