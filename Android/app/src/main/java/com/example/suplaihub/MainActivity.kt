package com.example.suplaihub

import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.suplaihub.adapter.HomeAdapter
import com.example.suplaihub.model.Category
import com.example.suplaihub.model.HomeItem
import com.example.suplaihub.model.Supplier

class MainActivity : AppCompatActivity() {

    private lateinit var homeAdapter: HomeAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        // 1. Setup HomeAdapter (satu adapter untuk semua)
        homeAdapter = HomeAdapter(
            onDetailSupplier = { supplier ->
                Toast.makeText(this, "Detail: ${supplier.name}", Toast.LENGTH_SHORT).show()
            },
            onCategoryClick = { category ->
                // category sekarang bertipe Kategori
                Toast.makeText(this, "Kategori: ${category.name}", Toast.LENGTH_SHORT).show()
            }
        )

        // 2. Pasang ke mainRecyclerView (yang ada di activity_main.xml)
        findViewById<RecyclerView>(R.id.mainRecyclerView).apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = homeAdapter
        }

        // 3. Load data
        loadMockData()
    }

    private fun loadMockData() {
        // Data Kategori (nanti bisa dari API)
        val listKategori = listOf(
            Category(1, "Bahan Baku"),
            Category(2, "Kemasan"),
            Category(3, "Logistik"),
            Category(4, "Mesin")
        )

        // Data Supplier (nanti bisa dari API)
        val listSupplier = listOf(
            Supplier(
                id = 1,
                name = "PT Sumber Makmur Plastindo",
                location = "Jakarta Barat",
                products = "Bahan Baku Plastik, HDPE, PP & Pelet",
                moq = "100 kg"
            ),
            Supplier(
                id = 2,
                name = "CV Berkah Kemasan Mandiri",
                location = "Tangerang",
                products = "Karton Box Corrugated, Custom Logo",
                moq = "500 pcs"
            )
        )

        // Susun urutan section dari atas ke bawah
        val items = mutableListOf<HomeItem>()

        items.add(HomeItem.Banner)                    // Section Banner
        items.add(HomeItem.CategoryTitle)             // Judul "Kategori Suplai"
        items.add(HomeItem.CategoryList(listKategori))// List Kategori (horizontal)
        items.add(HomeItem.SupplierTitle)             // Judul "Supplier Unggulan"

        // List Supplier (bisa ditambah berapapun)
        listSupplier.forEach { supplier ->
            items.add(HomeItem.SupplierItem(supplier))
        }

        items.add(HomeItem.Spacer)                    // Jarak bawah

        // Kirim ke adapter
        homeAdapter.setData(items)
    }
}