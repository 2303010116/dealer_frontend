// ============================================================
// DEALER MOBIL — booking.js
// Booking form, validation, localStorage, SweetAlert
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Resolve selected car ----
  const id = parseInt(getUrlParam('id'));
  let selectedMobil = getMobilById(id) || dummyMobil[0];

  // ---- Render car selector ----
  const mobilSelect = document.getElementById('mobilSelect');
  if (mobilSelect) {
    dummyMobil.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.nama_mobil} — ${formatRupiah(m.harga)}`;
      if (m.id === selectedMobil.id) opt.selected = true;
      mobilSelect.appendChild(opt);
    });

    mobilSelect.addEventListener('change', () => {
      selectedMobil = getMobilById(parseInt(mobilSelect.value)) || dummyMobil[0];
      updateSummary();
      updateTotal();
    });
  }

  // ---- Render summary card ----
  function updateSummary() {
    const el = document.getElementById('bookingSummaryCard');
    if (!el) return;
    el.innerHTML = `
      <img src="${selectedMobil.gambar}" alt="${selectedMobil.nama_mobil}">
      <div class="summary-info">
        <div class="summary-badge">${selectedMobil.badge}</div>
        <h3>${selectedMobil.nama_mobil}</h3>
        <div class="summary-specs">
          <span><i class="fa-solid fa-car-side"></i> ${selectedMobil.merk}</span>
          <span><i class="fa-solid fa-gears"></i> ${selectedMobil.transmisi}</span>
          <span><i class="fa-solid fa-calendar"></i> ${selectedMobil.tahun}</span>
          <span><i class="fa-solid fa-gas-pump"></i> ${selectedMobil.bahan_bakar}</span>
        </div>
        <div class="summary-price">
          <small>Harga per unit</small>
          <strong>${formatRupiah(selectedMobil.harga)}</strong>
        </div>
      </div>
    `;
  }

  // ---- Update total ----
  function updateTotal() {
    const qty = parseInt(document.getElementById('jumlah')?.value) || 1;
    const total = selectedMobil.harga * qty;
    const el = document.getElementById('totalHarga');
    if (el) el.textContent = formatRupiah(total);
    const priceEl = document.getElementById('hargaPerUnit');
    if (priceEl) priceEl.textContent = formatRupiah(selectedMobil.harga);
  }

  // Qty change
  const qtyInput = document.getElementById('jumlah');
  if (qtyInput) {
    qtyInput.addEventListener('input', updateTotal);
  }

  // Initial render
  updateSummary();
  updateTotal();

  // ---- Pre-fill tanggal min = today ----
  const tanggalInput = document.getElementById('tanggal_booking');
  if (tanggalInput) {
    const today = new Date().toISOString().split('T')[0];
    tanggalInput.min = today;
    tanggalInput.value = today;
  }

  // ---- VALIDATION ----
  function validateField(input) {
    const value = input.value.trim();
    const errEl = document.getElementById('err_' + input.id);

    let msg = '';

    if (input.required && !value) {
      msg = 'Field ini wajib diisi.';
    } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      msg = 'Format email tidak valid.';
    } else if (input.id === 'no_hp' && value && !/^[0-9+\-\s]{8,15}$/.test(value)) {
      msg = 'Nomor HP tidak valid.';
    } else if (input.id === 'jumlah' && (parseInt(value) < 1 || parseInt(value) > 10)) {
      msg = 'Jumlah harus antara 1 – 10.';
    }

    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = msg ? 'block' : 'none';
    }
    input.classList.toggle('is-invalid', !!msg);
    input.classList.toggle('is-valid', !msg && !!value);
    return !msg;
  }

  // Live validation
  document.querySelectorAll('#bookingForm [required], #bookingForm #jumlah').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => validateField(input));
  });

  // ---- SUBMIT ----
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const fields = ['nama', 'email', 'no_hp', 'alamat', 'jumlah', 'metode', 'tanggal_booking'];
      let valid = true;

      fields.forEach(fid => {
        const el = document.getElementById(fid);
        if (el && !validateField(el)) valid = false;
      });

      if (!valid) {
        showAlert('error', 'Form Belum Lengkap', 'Mohon lengkapi semua field yang diperlukan dengan benar.');
        return;
      }

      // Build booking object
      const booking = {
        id: 'BK-' + Date.now(),
        tanggal: new Date().toLocaleString('id-ID'),
        tanggal_booking: document.getElementById('tanggal_booking').value,
        mobil: {
          id: selectedMobil.id,
          nama: selectedMobil.nama_mobil,
          merk: selectedMobil.merk,
          harga: selectedMobil.harga,
          gambar: selectedMobil.gambar
        },
        pelanggan: {
          nama: document.getElementById('nama').value.trim(),
          email: document.getElementById('email').value.trim(),
          no_hp: document.getElementById('no_hp').value.trim(),
          alamat: document.getElementById('alamat').value.trim()
        },
        jumlah: parseInt(document.getElementById('jumlah').value),
        metode: document.getElementById('metode').value,
        total: selectedMobil.harga * parseInt(document.getElementById('jumlah').value),
        status: 'Pending'
      };

      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem('bookingList') || '[]');
      saved.push(booking);
      localStorage.setItem('bookingList', JSON.stringify(saved));

      // Success alert
      showAlert('success', 'Booking Berhasil! 🎉',
        `Terima kasih <strong>${booking.pelanggan.nama}</strong>! Booking Anda untuk <strong>${booking.mobil.nama}</strong> telah berhasil dikirim. Tim kami akan segera menghubungi Anda.`,
        () => { window.location.href = 'mobil.html'; }
      );
    });
  }

  // Load existing bookings count badge
  const saved = JSON.parse(localStorage.getItem('bookingList') || '[]');
  const badge = document.getElementById('bookingCount');
  if (badge && saved.length > 0) {
    badge.textContent = saved.length;
    badge.style.display = 'inline';
  }
});

// ---- SweetAlert-like modal ----
function showAlert(type, title, message, callback) {
  // Remove old
  const old = document.getElementById('sweetModal');
  if (old) old.remove();

  const icons = {
    success: { icon: 'fa-circle-check', color: '#16a34a', bg: 'rgba(22,163,74,.1)' },
    error:   { icon: 'fa-circle-xmark', color: '#dc2626', bg: 'rgba(220,38,38,.1)' },
    warning: { icon: 'fa-triangle-exclamation', color: '#d97706', bg: 'rgba(217,119,6,.1)' },
    info:    { icon: 'fa-circle-info', color: '#2563eb', bg: 'rgba(37,99,235,.1)' }
  };

  const cfg = icons[type] || icons.info;

  const modal = document.createElement('div');
  modal.id = 'sweetModal';
  modal.innerHTML = `
    <div class="sweet-overlay" onclick="closeSweetModal()"></div>
    <div class="sweet-box">
      <div class="sweet-icon" style="background:${cfg.bg}; color:${cfg.color};">
        <i class="fa-solid ${cfg.icon}"></i>
      </div>
      <h3 class="sweet-title">${title}</h3>
      <p class="sweet-msg">${message}</p>
      <button class="sweet-btn" onclick="closeSweetModal()" style="background:${cfg.color};">
        OK
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  window._sweetCallback = callback || null;

  // Trigger animation
  requestAnimationFrame(() => modal.querySelector('.sweet-box').classList.add('visible'));
}

window.closeSweetModal = function() {
  const modal = document.getElementById('sweetModal');
  if (modal) {
    modal.querySelector('.sweet-box').classList.remove('visible');
    setTimeout(() => {
      modal.remove();
      if (window._sweetCallback) {
        window._sweetCallback();
        window._sweetCallback = null;
      }
    }, 300);
  }
};
