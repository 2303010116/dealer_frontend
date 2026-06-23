// ============================================================
// DEALER MOBIL - app.js
// Data dummy, utilities, navbar, loading, back-to-top
// ============================================================

// ============================================================
// DUMMY DATA MOBIL (12+ kendaraan)
// ============================================================
const dummyMobil = [
  {
    id: 1,
    nama_mobil: "Mitsubishi Xpander",
    merk: "Mitsubishi",
    tipe: "MPV",
    tahun: 2023,
    warna: "Putih Pearl",
    mesin: "1.5L MIVEC",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 285000000,
    stok: 5,
    gambar: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    deskripsi: "Mitsubishi Xpander hadir sebagai MPV modern dengan desain sporty dan kabin lega. Dilengkapi mesin 1.5L MIVEC bertenaga tinggi, transmisi otomatis halus, serta fitur keselamatan terkini. Cocok untuk keluarga aktif yang membutuhkan kenyamanan dan gaya sekaligus.",
    badge: "BEST SELLER",
    featured: true
  },
  {
    id: 2,
    nama_mobil: "Toyota Fortuner",
    merk: "Toyota",
    tipe: "SUV",
    tahun: 2024,
    warna: "Hitam Metalik",
    mesin: "2.4L Diesel Turbo",
    transmisi: "Automatic",
    bahan_bakar: "Solar",
    harga: 580000000,
    stok: 3,
    gambar: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=600&q=80",
    deskripsi: "Toyota Fortuner adalah SUV tangguh yang menggabungkan kemewahan dengan kemampuan off-road. Mesin diesel turbo 2.4L memberikan torsi besar, sementara interior mewah memanjakan penumpang. Pilihan terbaik untuk petualangan maupun mobilitas perkotaan.",
    badge: "NEW 2024",
    featured: true
  },
  {
    id: 3,
    nama_mobil: "Honda Civic",
    merk: "Honda",
    tipe: "Sedan",
    tahun: 2023,
    warna: "Merah Sonic",
    mesin: "1.5L VTEC Turbo",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 450000000,
    stok: 4,
    gambar: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
    deskripsi: "Honda Civic generasi terbaru hadir dengan desain yang lebih sporty dan aerodinamis. Ditenagai mesin 1.5L VTEC Turbo yang efisien namun bertenaga. Fitur Honda Sensing memberikan keamanan berkendara tingkat tinggi.",
    badge: "SPORTY",
    featured: true
  },
  {
    id: 4,
    nama_mobil: "Daihatsu Sigra",
    merk: "Daihatsu",
    tipe: "LCGC",
    tahun: 2023,
    warna: "Silver",
    mesin: "1.0L DOHC",
    transmisi: "Manual",
    bahan_bakar: "Bensin",
    harga: 140000000,
    stok: 8,
    gambar: "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=600&q=80",
    deskripsi: "Daihatsu Sigra adalah pilihan cerdas untuk keluarga yang mengutamakan efisiensi. Kabin 7-penumpang dengan harga terjangkau menjadikannya salah satu LCGC terlaris. Perawatan mudah dan suku cadang melimpah.",
    badge: "HEMAT",
    featured: false
  },
  {
    id: 5,
    nama_mobil: "Toyota Avanza",
    merk: "Toyota",
    tipe: "MPV",
    tahun: 2023,
    warna: "Putih",
    mesin: "1.3L Dual VVT-i",
    transmisi: "Manual",
    bahan_bakar: "Bensin",
    harga: 215000000,
    stok: 6,
    gambar: "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?w=600&q=80",
    deskripsi: "Toyota Avanza tetap menjadi pilihan utama keluarga Indonesia dengan desain terbaru yang lebih modern. Mesin Dual VVT-i irit bahan bakar, suspensi nyaman, dan kabin luas untuk 7 penumpang.",
    badge: "READY",
    featured: true
  },
  {
    id: 6,
    nama_mobil: "Suzuki Ertiga",
    merk: "Suzuki",
    tipe: "MPV",
    tahun: 2023,
    warna: "Biru Metalik",
    mesin: "1.5L K15B",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 235000000,
    stok: 4,
    gambar: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80",
    deskripsi: "Suzuki Ertiga terbaru hadir dengan desain elegan dan teknologi Smart Hybrid yang menghemat bahan bakar. Kabin lega 7-penumpang dengan fitur keselamatan lengkap menjadi daya tarik utamanya.",
    badge: "HYBRID",
    featured: false
  },
  {
    id: 7,
    nama_mobil: "Mitsubishi Pajero Sport",
    merk: "Mitsubishi",
    tipe: "SUV",
    tahun: 2024,
    warna: "Putih Diamond",
    mesin: "2.4L MIVEC Diesel",
    transmisi: "Automatic",
    bahan_bakar: "Solar",
    harga: 690000000,
    stok: 2,
    gambar: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80",
    deskripsi: "Mitsubishi Pajero Sport menghadirkan kemewahan bercampur ketangguhan. Mesin diesel MIVEC 2.4L bertenaga besar, sistem 4WD canggih, dan interior premium menjadikan Pajero Sport sebagai SUV premium terbaik.",
    badge: "PREMIUM",
    featured: true
  },
  {
    id: 8,
    nama_mobil: "Honda Brio",
    merk: "Honda",
    tipe: "Hatchback",
    tahun: 2023,
    warna: "Merah",
    mesin: "1.2L i-VTEC",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 175000000,
    stok: 7,
    gambar: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    deskripsi: "Honda Brio RS hadir dengan tampilan sporty yang memukau. Mesin i-VTEC efisien namun responsif, cocok untuk mobilitas perkotaan. Fitur Honda SENSING memberikan keamanan ekstra dalam berkendara.",
    badge: "CITY CAR",
    featured: false
  },
  {
    id: 9,
    nama_mobil: "Toyota Rush",
    merk: "Toyota",
    tipe: "SUV",
    tahun: 2023,
    warna: "Hitam",
    mesin: "1.5L Dual VVT-i",
    transmisi: "Manual",
    bahan_bakar: "Bensin",
    harga: 260000000,
    stok: 5,
    gambar: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    deskripsi: "Toyota Rush adalah SUV kompak yang sempurna untuk petualangan keluarga. Ground clearance tinggi, tampilan gagah, dan kabin luas 7-penumpang menjadikannya pilihan favorit pecinta SUV di Indonesia.",
    badge: "SUV KELUARGA",
    featured: false
  },
  {
    id: 10,
    nama_mobil: "BMW 3 Series",
    merk: "BMW",
    tipe: "Sedan",
    tahun: 2024,
    warna: "Putih Alpine",
    mesin: "2.0L TwinPower Turbo",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 875000000,
    stok: 2,
    gambar: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    deskripsi: "BMW 3 Series adalah simbol kesempurnaan berkendara. Mesin TwinPower Turbo 2.0L memberikan performa luar biasa, sementara interior mewah dengan teknologi iDrive terkini memanjakan setiap perjalanan Anda.",
    badge: "LUXURY",
    featured: true
  },
  {
    id: 11,
    nama_mobil: "Wuling Almaz",
    merk: "Wuling",
    tipe: "SUV",
    tahun: 2023,
    warna: "Silver",
    mesin: "1.5L Turbo",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 310000000,
    stok: 6,
    gambar: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80",
    deskripsi: "Wuling Almaz hadir sebagai SUV modern dengan teknologi canggih. Dilengkapi voice command berbahasa Indonesia, layar infotainment besar, dan fitur ADAS terlengkap di kelasnya.",
    badge: "SMART SUV",
    featured: false
  },
  {
    id: 12,
    nama_mobil: "Hyundai Tucson",
    merk: "Hyundai",
    tipe: "SUV",
    tahun: 2024,
    warna: "Abu-abu",
    mesin: "2.0L MPi",
    transmisi: "Automatic",
    bahan_bakar: "Bensin",
    harga: 420000000,
    stok: 3,
    gambar: "https://images.unsplash.com/photo-1609520505218-7421df82076e?w=600&q=80",
    deskripsi: "Hyundai Tucson terbaru hadir dengan desain futuristik yang memukau. Interior mewah dengan panoramic sunroof, kursi berventilasi, dan teknologi keselamatan terkini menjadikannya SUV premium terbaik di kelasnya.",
    badge: "FUTURISTIC",
    featured: false
  }
];

// ============================================================
// HELPERS
// ============================================================
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function getMobilById(id) {
  return dummyMobil.find(m => m.id === parseInt(id)) || null;
}

function getUrlParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// ============================================================
// LOADING SCREEN
// ============================================================
function initLoadingScreen() {
  const loader = document.getElementById("loadingScreen");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });
}

// ============================================================
// NAVBAR: transparent → solid on scroll
// ============================================================
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Mark active link
  document.querySelectorAll(".nav-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Scroll effect
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Mobile toggle
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const icon = toggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
    document.addEventListener("click", e => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
        const icon = toggle.querySelector("i");
        icon.className = "fa-solid fa-bars";
      }
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          menu.classList.remove("active");
          const icon = toggle.querySelector("i");
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  // Search form in navbar
  const navSearchForm = document.getElementById("navSearchForm");
  if (navSearchForm) {
    navSearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const val = document.getElementById("navSearchInput").value.trim();
      window.location.href = `mobil.html${val ? "?cari=" + encodeURIComponent(val) : ""}`;
    });
  }
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
function initScrollAnimations() {
  const items = document.querySelectorAll(".animate-on-scroll");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach(el => observer.observe(el));
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(el => observer.observe(el));
}

// ============================================================
// SHARED CARD BUILDER (used by index + mobil pages)
// ============================================================
function buildMobilCard(mobil, showBookingBtn = true) {
  return `
    <div class="card animate-on-scroll">
      <div class="card-image">
        <img src="${mobil.gambar}" alt="${mobil.nama_mobil}" loading="lazy">
        <div class="card-badge">${mobil.badge}</div>
      </div>
      <div class="card-body">
        <div class="car-top">
          <h3>${mobil.nama_mobil}</h3>
          <div class="year"><i class="fa-solid fa-calendar"></i> ${mobil.tahun}</div>
        </div>
        <div class="car-meta">
          <div class="meta-item"><i class="fa-solid fa-car-side"></i> ${mobil.merk}</div>
          <div class="meta-item"><i class="fa-solid fa-car"></i> ${mobil.tipe}</div>
        </div>
        <div class="specs">
          <div class="spec-box">
            <h5>Transmisi</h5>
            <p>${mobil.transmisi}</p>
          </div>
          <div class="spec-box">
            <h5>Bahan Bakar</h5>
            <p>${mobil.bahan_bakar}</p>
          </div>
        </div>
        <div class="price">
          <small>Harga Mulai</small>
          <h2>${formatRupiah(mobil.harga)}</h2>
        </div>
        <div class="card-action">
          <a href="detail-mobil.html?id=${mobil.id}" class="btn-detail">
            <i class="fa-solid fa-eye"></i> Detail
          </a>
          ${showBookingBtn ? `
          <a href="booking.html?id=${mobil.id}" class="btn-booking">
            <i class="fa-solid fa-calendar-check"></i> Booking
          </a>` : ""}
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// INIT ALL ON DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initNavbar();
  initBackToTop();
  initScrollAnimations();
  initCounters();
});
