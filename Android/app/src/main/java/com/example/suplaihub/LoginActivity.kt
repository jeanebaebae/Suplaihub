package com.example.suplaihub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val btnKeRegister = findViewById<Button>(R.id.btnKeRegister) // Deklarasi tombol baru

        // Logika Tombol Masuk
        btnLogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }

        // Logika Tombol Pindah ke Register
        btnKeRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
            // Tidak perlu finish() di sini, agar user bisa menekan tombol 'back'
            // untuk kembali ke halaman Login jika batal daftar.
        }
    }
}