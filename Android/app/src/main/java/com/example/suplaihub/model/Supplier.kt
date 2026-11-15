package com.example.suplaihub.model

data class Supplier(
    val id: Int,
    val name: String,
    val location: String,
    val products: String,
    val moq: String,
    val logoUrl: String? = null
)
