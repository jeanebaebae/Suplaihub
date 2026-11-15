package com.example.suplaihub.model

sealed class HomeItem {
    object Banner : HomeItem()
    object CategoryTitle : HomeItem()
    data class CategoryList(val items: List<Category>) : HomeItem()
    object SupplierTitle : HomeItem()
    data class SupplierItem(val supplier: Supplier) : HomeItem()
    object Spacer : HomeItem()
}