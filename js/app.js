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

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const badgeUnggulan = produk.unggulan
    ? '<span class="product-badge">Unggulan</span>'
    : "";

  return `
    <article class="js-product-card">
      ${badgeUnggulan}
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);

  produkUmkm.forEach((produk) => {
    console.log("Debug item:", produk.nama, "| Stok:", produk.stok);
  });

  const markup = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markup;
  ringkasan.textContent = `${produkTersedia.length} dari ${produkUmkm.length} produk sedang tersedia.`;

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);