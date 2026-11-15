"use strict";

const produkUmkm = [
  {
    nama: "Kopi Tubruk Signature",
    kategori: "Kopi",
    harga: 45000,
    stok: 12,
    unggulan: true,
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Kopi",
    harga: 22000,
    stok: 4,
    unggulan: false,
  },
  {
    nama: "Paket Seduh Rumahan",
    kategori: "Bundling",
    harga: 75000,
    stok: 0,
    unggulan: false,
  },
  {
    nama: "Biji Kopi Arabika Pekalongan",
    kategori: "Kopi",
    harga: 85000,
    stok: 8,
    unggulan: false,
  },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card");

  const badgeUnggulan = produk.unggulan
    ? '<span class="product-badge">Unggulan</span>'
    : "";
  if (badgeUnggulan) {
    card.insertAdjacentHTML("beforeend", badgeUnggulan);
  }

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("button");
  removeButton.style.marginTop = "0.5rem";
  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(title, category, price, stock, removeButton);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.style.gridColumn = "1 / -1";
  empty.style.padding = "1rem";
  empty.style.border = "1px dashed #94a3b8";
  empty.style.borderRadius = "1rem";
  empty.style.textAlign = "center";
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

const produkGrid = document.querySelector("#produk-dinamis");
const produkStatus = document.querySelector("#produk-ringkasan");
const tombolFilter = document.querySelectorAll("[data-filter]");

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    return;
  }

  const produkTampil =
    kategoriAktif === "Semua"
      ? produkUmkm
      : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} dari ${produkUmkm.length} produk ditampilkan.`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderProduk();
});