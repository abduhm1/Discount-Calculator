// Memilih elemen-elemen dari DOM
        const inputHarga = document.getElementById('harga-pembelian');
        const displayHargaAwal = document.getElementById('harga-awal');
        const displayDiskon = document.getElementById('diskon');
        const displayTotalBayar = document.getElementById('total-bayar');
        // Elemen baru untuk potongan harga
        const displayPotonganHarga = document.getElementById('potonganHarga');

        // Fungsi untuk memformat angka menjadi format mata uang Rupiah
        function formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(angka);
        }

        // Fungsi utama untuk menghitung diskon dan total
        function hitungTotal() {
            // Ambil nilai dari input, ubah ke angka. Jika kosong/invalid, anggap 0.
            const hrgPembelian = parseFloat(inputHarga.value) || 0;

            // Logika diskon: jika harga pembelian >= 100000, diskon 10%, jika tidak 0%.
            const persenDiskon = hrgPembelian >= 100000 ? 10 : 0;
            
            // Hitung nilai diskon dalam Rupiah
            const potongan = hrgPembelian * (persenDiskon / 100);

            // Hitung total harga setelah diskon
            const totalSetelahDiskon = hrgPembelian - potongan;

            // Tampilkan hasil ke elemen-elemen di halaman HTML
            displayHargaAwal.textContent = formatRupiah(hrgPembelian);
            displayDiskon.textContent = `${persenDiskon}%`;
            // Tampilkan potongan harga ke elemen baru
            displayPotonganHarga.textContent = formatRupiah(potongan);
            displayTotalBayar.textContent = formatRupiah(totalSetelahDiskon);
            
            // Logika baru untuk mengubah warna badge diskon
            let discountBadge = document.getElementById('diskon');
            if (persenDiskon > 0) {
                discountBadge.style.backgroundColor = '#4caf50'; // Hijau
                discountBadge.style.color = 'white';
            } else {
                discountBadge.style.backgroundColor = '#e2e8f0'; // Abu-abu
                discountBadge.style.color = '#4b5563';
            }
        }

        // Tambahkan event listener ke input. Setiap kali user mengetik, jalankan fungsi hitungTotal.
        inputHarga.addEventListener('input', hitungTotal);

        // Panggil fungsi hitungTotal saat halaman pertama kali dimuat untuk menampilkan hasil awal
        document.addEventListener('DOMContentLoaded', hitungTotal);