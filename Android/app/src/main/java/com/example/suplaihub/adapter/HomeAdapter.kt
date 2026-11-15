package com.example.suplaihub.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.suplaihub.R
import com.example.suplaihub.model.Category
import com.example.suplaihub.model.HomeItem
import com.example.suplaihub.model.Supplier

class HomeAdapter(
    private val onDetailSupplier: (Supplier) -> Unit,
    private val onCategoryClick: (Category) -> Unit
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    private val items = mutableListOf<HomeItem>()

    fun setData(newItems: List<HomeItem>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    override fun getItemViewType(position: Int): Int = when (items[position]) {
        is HomeItem.Banner        -> TYPE_BANNER
        is HomeItem.CategoryTitle -> TYPE_CATEGORY_TITLE
        is HomeItem.CategoryList  -> TYPE_CATEGORY_LIST
        is HomeItem.SupplierTitle -> TYPE_SUPPLIER_TITLE
        is HomeItem.SupplierItem  -> TYPE_SUPPLIER_ITEM
        is HomeItem.Spacer        -> TYPE_SPACER
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            TYPE_BANNER         -> BannerVH(inflater.inflate(R.layout.item_section_banner, parent, false))
            TYPE_CATEGORY_TITLE -> CategoryTitleVH(inflater.inflate(R.layout.item_section_title_category, parent, false))
            TYPE_CATEGORY_LIST  -> CategoryListVH(inflater.inflate(R.layout.item_section_category_list, parent, false))
            TYPE_SUPPLIER_TITLE -> SupplierTitleVH(inflater.inflate(R.layout.item_section_title_supplier, parent, false))
            TYPE_SUPPLIER_ITEM  -> SupplierVH(inflater.inflate(R.layout.item_supplier, parent, false))
            else                -> SpacerVH(inflater.inflate(R.layout.item_section_spacer, parent, false))
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (val item = items[position]) {
            is HomeItem.CategoryList -> (holder as CategoryListVH).bind(item.items)
            is HomeItem.SupplierItem -> (holder as SupplierVH).bind(item.supplier)
            else -> { /* banner, title, spacer tidak butuh bind data */ }
        }
    }

    override fun getItemCount() = items.size

    // ================= ViewHolders =================
    class BannerVH(v: View) : RecyclerView.ViewHolder(v)
    class CategoryTitleVH(v: View) : RecyclerView.ViewHolder(v)
    class SupplierTitleVH(v: View) : RecyclerView.ViewHolder(v)
    class SpacerVH(v: View) : RecyclerView.ViewHolder(v)

    inner class CategoryListVH(view: View) : RecyclerView.ViewHolder(view) {
        private val rv: RecyclerView = view.findViewById(R.id.rvCategoryInner)
        private val adapter = CategoryAdapter { category -> onCategoryClick(category) }

        init {
            rv.layoutManager = LinearLayoutManager(itemView.context, LinearLayoutManager.HORIZONTAL, false)
            rv.adapter = adapter
        }

        fun bind(list: List<com.example.suplaihub.model.Category>) {
            adapter.setData(list)
        }
    }

    inner class SupplierVH(view: View) : RecyclerView.ViewHolder(view) {
        private val tvName: TextView = view.findViewById(R.id.tvSupplierName)
        private val tvLocation: TextView = view.findViewById(R.id.tvSupplierLocation)
        private val tvProducts: TextView = view.findViewById(R.id.tvSupplierProducts)
        private val tvMoq: TextView = view.findViewById(R.id.tvSupplierMoq)
        private val btnDetail: Button = view.findViewById(R.id.btnDetail)

        fun bind(s: Supplier) {
            tvName.text = s.name
            tvLocation.text = s.location
            tvProducts.text = s.products
            tvMoq.text = "MOQ: ${s.moq}"
            btnDetail.setOnClickListener { onDetailSupplier(s) }
        }
    }

    companion object {
        private const val TYPE_BANNER = 0
        private const val TYPE_CATEGORY_TITLE = 1
        private const val TYPE_CATEGORY_LIST = 2
        private const val TYPE_SUPPLIER_TITLE = 3
        private const val TYPE_SUPPLIER_ITEM = 4
        private const val TYPE_SPACER = 5
    }
}