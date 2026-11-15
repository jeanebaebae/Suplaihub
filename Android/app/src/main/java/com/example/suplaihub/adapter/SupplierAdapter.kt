package com.example.suplaihub.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.suplaihub.R
import com.example.suplaihub.model.Supplier

class SupplierAdapter(
    private val onDetailClick: (Supplier) -> Unit
) : RecyclerView.Adapter<SupplierAdapter.ViewHolder>() {

    private val items = mutableListOf<Supplier>()

    fun setData(newItems: List<Supplier>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvName: TextView = itemView.findViewById(R.id.tvSupplierName)
        val tvLocation: TextView = itemView.findViewById(R.id.tvSupplierLocation)
        val tvProducts: TextView = itemView.findViewById(R.id.tvSupplierProducts)
        val tvMoq: TextView = itemView.findViewById(R.id.tvSupplierMoq)
        val btnDetail: Button = itemView.findViewById(R.id.btnDetail)
        val ivLogo: ImageView = itemView.findViewById(R.id.ivSupplierLogo)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_supplier, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.tvName.text = item.name
        holder.tvLocation.text = item.location
        holder.tvProducts.text = item.products
        holder.tvMoq.text = "MOQ: ${item.moq}"

        // Kalau pakai Glide/Coil untuk load gambar dari URL:
        // Glide.with(holder.itemView).load(item.logoUrl).into(holder.ivLogo)

        holder.btnDetail.setOnClickListener { onDetailClick(item) }
    }

    override fun getItemCount() = items.size
}