package com.example.suplaihub.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.suplaihub.R
import com.example.suplaihub.model.Category

class CategoryAdapter(
    private val onClick: (Category) -> Unit
) : RecyclerView.Adapter<CategoryAdapter.ViewHolder>() {

    private val items = mutableListOf<Category>()

    fun setData(newItems: List<Category>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvName: TextView = itemView.findViewById(R.id.tvCategoryName)
        val ivIcon: ImageView = itemView.findViewById(R.id.ivCategoryIcon)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_category, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.tvName.text = item.name
        holder.ivIcon.setImageResource(android.R.drawable.ic_menu_gallery)

        holder.itemView.setOnClickListener { onClick(item) }
    }

    override fun getItemCount() = items.size
}