// ============================================================
// DEALER MOBIL — detail.js
// Car detail page logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const id = parseInt(getUrlParam('id'));
  const mobil = getMobilById(id);

  if (!mobil) {
    document.getElementById('detailContent').innerHTML = `
      <div class="empty-state" style="margin:60px auto; max-width:500px;">
        <i class="fa-solid fa-car-side"></i>
        <h3>Mobil Tidak Ditemukan</h3>
        <p>Mobil yang Anda cari tidak tersedia.</p>
        <a href="mobil.html" class="btn btn-primary" style="margin-top:18px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Daftar Mobil
        </a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${mobil.nama_mobil} | Dealer Mobil`;

  // Render breadcrumb
  const bc = document.getElementById('breadcrumbName');
  if (bc) bc.textContent = mobil.nama_mobil;

  // Render main detail content
  const content = document.getElementById('detailContent');
  if (!content) return;

  // Build related cars (same tipe or merk, exclude current)
  const related = dummyMobil
    .filter(m => m.id !== mobil.id && (m.merk === mobil.merk || m.tipe === mobil.tipe))
    .slice(0, 3);

  content.innerHTML = `
    <div class="detail-grid">

      <!-- IMAGE PANEL -->
      <div class="detail-image-panel animate-on-scroll">
        <div class="detail-gallery">
          <div class="detail-gallery-main">
            <img id="mainImg" src="${mobil.gambar}" alt="${mobil.nama_mobil}">
            <div class="detail-badge">${mobil.badge}</div>
          </div>
          <div class="detail-thumbs" id="thumbsRow">
            ${[mobil.gambar, mobil.gambar, mobil.gambar].map((g, i) => `
              <div class="thumb ${i===0?'active':''}" onclick="changeImg(this, '${g}')">
                <img src="${g}" alt="Foto ${i+1}">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- QUICK SPECS -->
        <div class="quick-specs">
          <div class="qs-item">
            <i class="fa-solid fa-car-side"></i>
            <div><small>Merk</small><strong>${mobil.merk}</strong></div>
          </div>
          <div class="qs-item">
            <i class="fa-solid fa-gears"></i>
            <div><small>Transmisi</small><strong>${mobil.transmisi}</strong></div>
          </div>
          <div class="qs-item">
            <i class="fa-solid fa-gas-pump"></i>
            <div><small>Bahan Bakar</small><strong>${mobil.bahan_bakar}</strong></div>
          </div>
          <div class="qs-item">
            <i class="fa-solid fa-calendar"></i>
            <div><small>Tahun</small><strong>${mobil.tahun}</strong></div>
          </div>
        </div>
      </div>

      <!-- INFO PANEL -->
      <div class="detail-info-panel animate-on-scroll">

        <div class="breadcrumb" style="margin-bottom:16px;">
          <a href="index.html"><i class="fa-solid fa-house"></i></a>
          <i class="fa-solid fa-chevron-right" style="font-size:10px;"></i>
          <a href="mobil.html">Mobil</a>
          <i class="fa-solid fa-chevron-right" style="font-size:10px;"></i>
          <span id="breadcrumbName">${mobil.nama_mobil}</span>
        </div>

        <div class="detail-merk-tag">${mobil.merk} · ${mobil.tipe}</div>
        <h1 class="detail-title">${mobil.nama_mobil}</h1>

        <div class="detail-price">
          <small>Harga</small>
          <h2>${formatRupiah(mobil.harga)}</h2>
          <span class="badge-success">
            <i class="fa-solid fa-circle-check"></i> Stok Tersedia (${mobil.stok} unit)
          </span>
        </div>

        <!-- TABS -->
        <div class="detail-tabs">
          <div class="detail-tabs-nav">
            <button class="tab-btn active" data-tab="spesifikasi">
              <i class="fa-solid fa-list"></i> Spesifikasi
            </button>
            <button class="tab-btn" data-tab="deskripsi">
              <i class="fa-solid fa-align-left"></i> Deskripsi
            </button>
          </div>

          <div class="tab-content active" id="tab-spesifikasi">
            <div class="spec-table">
              ${[
                ['fa-car','Nama Mobil', mobil.nama_mobil],
                ['fa-car-side','Merk', mobil.merk],
                ['fa-tag','Tipe', mobil.tipe],
                ['fa-calendar','Tahun', mobil.tahun],
                ['fa-palette','Warna', mobil.warna],
                ['fa-engine','Mesin', mobil.mesin],
                ['fa-gears','Transmisi', mobil.transmisi],
                ['fa-gas-pump','Bahan Bakar', mobil.bahan_bakar],
                ['fa-boxes-stacked','Stok', `${mobil.stok} unit`],
              ].map(([ico, label, val]) => `
                <div class="spec-row">
                  <div class="spec-key"><i class="fa-solid ${ico}"></i> ${label}</div>
                  <div class="spec-val">${val}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="tab-content" id="tab-deskripsi">
            <p class="detail-desc">${mobil.deskripsi}</p>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="detail-actions">
          <a href="booking.html?id=${mobil.id}" class="btn btn-primary btn-lg" style="flex:1;">
            <i class="fa-solid fa-calendar-check"></i> Booking Sekarang
          </a>
          <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(mobil.nama_mobil)}"
             target="_blank" class="btn-wa">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="mobil.html" class="btn btn-dark btn-lg" style="flex:0 0 auto;">
            <i class="fa-solid fa-arrow-left"></i> Kembali
          </a>
        </div>

      </div>
    </div>

    <!-- RELATED -->
    ${related.length ? `
    <div class="related-section">
      <div class="section-title" style="text-align:left; margin-bottom:30px;">
        <span class="subtitle">Rekomendasi</span>
        <h2 style="font-size:28px;">Mobil Serupa</h2>
      </div>
      <div class="grid-auto">
        ${related.map(m => buildMobilCard(m)).join('')}
      </div>
    </div>` : ''}
  `;

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  initScrollAnimations();
});

// Change gallery main image
window.changeImg = function(thumb, src) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
};
