/* =====================================================================
   SinoVita — inline SVG illustrations for raw-material categories.
   Pure vector, no external assets, license-clean (original artwork).
   Each function returns an SVG string sized to fill its container.
   Palette: navy #1A2B4A, red #C8181E, gold #C9960C, light #EEF2F7
   ===================================================================== */
(function () {
  const ill = {};

  /* ---- 1. PLANT EXTRACTS : leaf + powder mound ---- */
  ill.extracts = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <defs><linearGradient id="ex-pw" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8FB96B"/><stop offset="1" stop-color="#5E8B3E"/></linearGradient></defs>
    <ellipse cx="110" cy="128" rx="74" ry="14" fill="#1A2B4A" opacity="0.08"/>
    <path d="M52 128 Q110 86 168 128 Z" fill="url(#ex-pw)"/>
    <path d="M52 128 Q110 96 168 128" fill="none" stroke="#4A7030" stroke-width="1.5" opacity="0.4"/>
    <g>
      <path d="M120 96 C120 60 150 40 178 36 C176 70 150 92 124 96 Z" fill="#6FA348"/>
      <path d="M120 96 C140 70 162 52 178 36" fill="none" stroke="#3E6B25" stroke-width="2"/>
      <path d="M132 78 L150 68 M128 86 L142 80 M140 70 L158 56" stroke="#3E6B25" stroke-width="1.3" opacity="0.6"/>
    </g>
    <g transform="translate(58,58)">
      <path d="M0 40 C0 14 18 0 36 -2 C34 24 16 40 4 42 Z" fill="#8FB96B"/>
      <path d="M0 40 C14 22 28 10 36 -2" fill="none" stroke="#4A7030" stroke-width="1.6"/>
    </g>
    <circle cx="92" cy="120" r="2.4" fill="#4A7030" opacity="0.5"/>
    <circle cx="128" cy="122" r="2" fill="#4A7030" opacity="0.5"/>
  </svg>`;

  /* ---- 2. MINERAL CHELATES : flask + crystals ---- */
  ill.minerals = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <ellipse cx="110" cy="138" rx="66" ry="11" fill="#1A2B4A" opacity="0.08"/>
    <path d="M96 34 H124 V60 L150 116 Q156 130 142 130 H78 Q64 130 70 116 L96 60 Z"
          fill="#DDE9F4" stroke="#1A2B4A" stroke-width="2.4"/>
    <path d="M84 96 L136 96 L150 116 Q156 130 142 130 H78 Q64 130 70 116 Z" fill="#2C6FB0" opacity="0.55"/>
    <rect x="92" y="26" width="36" height="10" rx="3" fill="#1A2B4A"/>
    <circle cx="98" cy="112" r="3.2" fill="#fff" opacity="0.7"/>
    <circle cx="120" cy="120" r="2.4" fill="#fff" opacity="0.6"/>
    <g stroke="#C9960C" stroke-width="2" fill="#E8B73A">
      <path d="M150 120 l8 -14 l8 14 l-8 8 Z"/>
      <path d="M168 132 l6 -10 l6 10 l-6 6 Z" opacity="0.85"/>
      <path d="M44 128 l7 -12 l7 12 l-7 7 Z" opacity="0.9"/>
    </g>
  </svg>`;

  /* ---- 3. AMINO ACIDS / VITAMINS : molecule + tablet ---- */
  ill.amino = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <ellipse cx="110" cy="138" rx="64" ry="11" fill="#1A2B4A" opacity="0.08"/>
    <g stroke="#1A2B4A" stroke-width="2.4">
      <line x1="70" y1="58" x2="104" y2="44"/>
      <line x1="104" y1="44" x2="138" y2="60"/>
      <line x1="138" y1="60" x2="138" y2="96"/>
      <line x1="138" y1="96" x2="104" y2="112"/>
      <line x1="104" y1="112" x2="70" y2="96"/>
      <line x1="70" y1="96" x2="70" y2="58"/>
      <line x1="138" y1="60" x2="168" y2="48"/>
    </g>
    <g>
      <circle cx="70" cy="58" r="9" fill="#C8181E"/>
      <circle cx="104" cy="44" r="9" fill="#1A2B4A"/>
      <circle cx="138" cy="60" r="9" fill="#C9960C"/>
      <circle cx="138" cy="96" r="9" fill="#1A2B4A"/>
      <circle cx="104" cy="112" r="9" fill="#C8181E"/>
      <circle cx="70" cy="96" r="9" fill="#1A2B4A"/>
      <circle cx="168" cy="48" r="7" fill="#C9960C"/>
    </g>
    <ellipse cx="70" cy="120" rx="20" ry="13" fill="#F0F3F8" stroke="#1A2B4A" stroke-width="2"/>
    <line x1="58" y1="120" x2="82" y2="120" stroke="#1A2B4A" stroke-width="1.6"/>
  </svg>`;

  /* ---- 4. EMPTY CAPSULES : two capsules ---- */
  ill.capsules = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <ellipse cx="110" cy="136" rx="70" ry="12" fill="#1A2B4A" opacity="0.08"/>
    <g transform="rotate(-24 110 80)">
      <rect x="40" y="62" width="86" height="34" rx="17" fill="#C8181E"/>
      <rect x="83" y="62" width="43" height="34" rx="17" fill="#F4D7A0"/>
      <rect x="83" y="62" width="20" height="34" fill="#F4D7A0"/>
      <ellipse cx="60" cy="73" rx="10" ry="4" fill="#fff" opacity="0.25"/>
    </g>
    <g transform="rotate(16 120 110)">
      <rect x="92" y="104" width="78" height="30" rx="15" fill="#1A2B4A"/>
      <rect x="131" y="104" width="39" height="30" rx="15" fill="#DDE4EE"/>
      <rect x="131" y="104" width="18" height="30" fill="#DDE4EE"/>
      <ellipse cx="110" cy="113" rx="9" ry="3.4" fill="#fff" opacity="0.2"/>
    </g>
  </svg>`;

  /* ---- 5. PACKAGING : jar with cap ---- */
  ill.packaging = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <ellipse cx="110" cy="140" rx="52" ry="10" fill="#1A2B4A" opacity="0.08"/>
    <rect x="80" y="30" width="60" height="20" rx="4" fill="#1A2B4A"/>
    <rect x="84" y="48" width="52" height="6" fill="#11203a"/>
    <rect x="76" y="54" width="68" height="84" rx="8" fill="#C8181E"/>
    <rect x="76" y="54" width="68" height="84" rx="8" fill="url(#jarsh)"/>
    <defs><linearGradient id="jarsh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="0.3" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <rect x="86" y="74" width="48" height="44" rx="3" fill="#fff" opacity="0.92"/>
    <line x1="94" y1="86" x2="126" y2="86" stroke="#1A2B4A" stroke-width="3"/>
    <line x1="94" y1="96" x2="126" y2="96" stroke="#C9960C" stroke-width="2.4"/>
    <line x1="94" y1="104" x2="116" y2="104" stroke="#9aa3b2" stroke-width="2"/>
  </svg>`;

  /* ---- 6. OEM / PRIVATE LABEL : tag + gear ---- */
  ill.oem = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
    <ellipse cx="110" cy="138" rx="60" ry="11" fill="#1A2B4A" opacity="0.08"/>
    <g transform="rotate(-18 100 84)">
      <path d="M64 50 H120 L150 80 L116 114 L64 114 Z" fill="#C9960C"/>
      <path d="M64 50 H120 L150 80 L116 114 L64 114 Z" fill="none" stroke="#9c7409" stroke-width="2"/>
      <circle cx="80" cy="64" r="7" fill="#fff"/>
      <circle cx="80" cy="64" r="3" fill="#1A2B4A"/>
      <line x1="96" y1="74" x2="128" y2="74" stroke="#fff" stroke-width="3" opacity="0.85"/>
      <line x1="92" y1="88" x2="120" y2="88" stroke="#fff" stroke-width="3" opacity="0.6"/>
    </g>
    <g transform="translate(150,96)" fill="#1A2B4A">
      <path d="M0 -16 l4 0 l2 6 l6 2 l4 -4 l3 3 l-4 4 l2 6 l6 2 l0 4 l-6 2 l-2 6 l4 4 l-3 3 l-4 -4 l-6 2 l-2 6 l-4 0 l-2 -6 l-6 -2 l-4 4 l-3 -3 l4 -4 l-2 -6 l-6 -2 l0 -4 l6 -2 l2 -6 l-4 -4 l3 -3 l4 4 l6 -2 Z"/>
      <circle cx="0" cy="0" r="6" fill="#EEF2F7"/>
    </g>
  </svg>`;

  /* ---- GALLERY: factory / QC / packing / logistics (line style on navy) ---- */
  ill.gFactory = `
  <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
    <path d="M40 120 V70 l28 18 V70 l28 18 V70 l28 18 V120 Z"/>
    <line x1="40" y1="120" x2="160" y2="120"/>
    <rect x="52" y="100" width="12" height="20" stroke-width="2.4"/>
    <rect x="80" y="100" width="12" height="20" stroke-width="2.4"/>
    <rect x="108" y="100" width="12" height="20" stroke-width="2.4"/>
    <path d="M40 70 V52 h10 v10" stroke-width="2.4"/>
    <path d="M150 70 c0 -10 8 -10 8 -20" stroke-width="2" opacity="0.6"/>
  </svg>`;
  ill.gQC = `
  <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
    <path d="M92 44 h16 v22 l20 44 a8 8 0 0 1 -8 12 H80 a8 8 0 0 1 -8 -12 l20 -44 Z"/>
    <line x1="84" y1="96" x2="116" y2="96" stroke-width="2.4"/>
    <circle cx="96" cy="108" r="3" fill="#fff" stroke="none"/>
    <circle cx="106" cy="116" r="2.4" fill="#fff" stroke="none"/>
    <line x1="86" y1="44" x2="114" y2="44" stroke-width="2.4"/>
  </svg>`;
  ill.gPacking = `
  <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
    <path d="M60 70 l40 -20 l40 20 v40 l-40 20 l-40 -20 Z"/>
    <path d="M60 70 l40 20 l40 -20"/>
    <line x1="100" y1="90" x2="100" y2="130"/>
    <path d="M80 60 l40 20" stroke-width="2.2" opacity="0.6"/>
  </svg>`;
  ill.gLogistics = `
  <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
    <path d="M44 104 h78 l-6 22 H50 Z"/>
    <path d="M122 104 V88 h22 l14 16 v22 h-36 Z"/>
    <circle cx="70" cy="132" r="8"/>
    <circle cx="138" cy="132" r="8"/>
    <line x1="50" y1="92" x2="100" y2="92" stroke-width="2.2" opacity="0.6"/>
  </svg>`;

  /* inject into any element with data-ill="key" */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-ill]').forEach(function (el) {
      const k = el.getAttribute('data-ill');
      if (ill[k]) el.innerHTML = ill[k];
    });
  });
})();
