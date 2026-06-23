// ============================================================
// DEALER MOBIL — mobil.js
// Car listing, search, filter, render
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- State ---
  let currentFilter = {
    cari: getUrlParam('cari') || '',
    transmisi: getUrlParam('transmisi') || '',
    merk: getUrlParam('merk') || ''
  };

  // --- DOM refs ---
  const searchInput   = document.getElementById('searchInput');
  const transmisiSel  = document.getElementById('transmisiFilter');
  const merkSel       = document.getElementById('merkFilter');
  const gridEl        = document.getElementById('mobilGrid');
  const resultCount   = document.getElementById('resultCount');
  const searchForm    = document.getElementById('searchForm');

  // --- Populate filter inputs from URL params ---
  if (searchInput && currentFilter.cari)     searchInput.value  = currentFilter.cari;
  if (transmisiSel && currentFilter.transmisi) transmisiSel.value = currentFilter.transmisi;
  if (merkSel && currentFilter.merk)          merkSel.value      = currentFilter.merk;

  // --- Populate merk dropdown ---
  if (merkSel) {
    const brands = [...new Set(dummyMobil.map(m => m.merk))].sort();
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      if (b === currentFilter.merk) opt.selected = true;
      merkSel.appendChild(opt);
    });
  }

  // --- Filter function ---
  function getFiltered() {
    return dummyMobil.filter(m => {
      const q = currentFilter.cari.toLowerCase();
      const matchSearch = !q ||
        m.nama_mobil.toLowerCase().includes(q) ||
        m.merk.toLowerCase().includes(q) ||
        m.tipe.toLowerCase().includes(q);
      const matchTrans = !currentFilter.transmisi ||
        m.transmisi === currentFilter.transmisi;
      const matchMerk  = !currentFilter.merk ||
        m.merk === currentFilter.merk;
      return matchSearch && matchTrans && matchMerk;
    });
  }

  // --- Render ---
  function render() {
    const results = getFiltered();

    if (resultCount) resultCount.textContent = `${results.length} Mobil Ditemukan`;

    if (!results.length) {
      gridEl.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-car-side"></i>
          <h3>Mobil Tidak Ditemukan</h3>
          <p>Coba ubah kata kunci atau reset filter pencarian.</p>
          <button onclick="resetFilter()" class="btn btn-primary" style="margin-top:18px;">
            <i class="fa-solid fa-rotate-left"></i> Reset Filter
          </button>
        </div>`;
      return;
    }

    gridEl.innerHTML = results.map(m => buildMobilCard(m)).join('');
    initScrollAnimations();
  }

  // --- Search form submit ---
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      currentFilter.cari = searchInput ? searchInput.value.trim() : '';
      currentFilter.transmisi = transmisiSel ? transmisiSel.value : '';
      currentFilter.merk = merkSel ? merkSel.value : '';
      render();
    });
  }

  // --- Live search on input ---
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentFilter.cari = searchInput.value.trim();
      render();
    });
  }

  // --- Dropdown change ---
  if (transmisiSel) transmisiSel.addEventListener('change', () => {
    currentFilter.transmisi = transmisiSel.value;
    render();
  });

  if (merkSel) merkSel.addEventListener('change', () => {
    currentFilter.merk = merkSel.value;
    render();
  });

  // --- Reset ---
  window.resetFilter = function() {
    currentFilter = { cari: '', transmisi: '', merk: '' };
    if (searchInput)  searchInput.value  = '';
    if (transmisiSel) transmisiSel.value = '';
    if (merkSel)      merkSel.value      = '';
    render();
  };

  // --- Initial render ---
  render();
});
