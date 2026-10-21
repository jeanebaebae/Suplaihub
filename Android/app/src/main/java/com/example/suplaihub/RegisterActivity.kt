package com.example.suplaihub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        // 1. Ambil referensi tombol daftar dari layout
        val btnRegister = findViewById<Button>(R.id.btnRegister)

        // 2. Buat aksi saat tombol diklik
        btnRegister.setOnClickListener {
            // (Opsional) Di sini nanti kamu bisa taruh validasi:
            // Misal: cek apakah email kosong, password kurang dari 8 karakter, dll.

            // Tampilkan pesan sukses (karena ini simulasi pendaftaran)
            Toast.makeText(this, "Pendaftaran Berhasil! Silakan Login.", Toast.LENGTH_LONG).show()

            // 3. Pindah ke halaman Login
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)

            // 4. Hapus halaman Register dari riwayat (back stack)
            // Agar jika user menekan tombol 'Back' di HP, dia tidak kembali ke halaman register,
            // melainkan keluar dari aplikasi atau kembali ke Splash.
            finish()
        }
    }
}