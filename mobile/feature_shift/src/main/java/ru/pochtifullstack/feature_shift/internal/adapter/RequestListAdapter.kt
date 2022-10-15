package ru.pochtifullstack.feature_shift.internal.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.RequestItemBinding

interface OnRequestItemClickListener {

    fun onRequestItemClicked()
}

internal class RequestListAdapter(
    private val onRequestItemClickListener: OnRequestItemClickListener
): RecyclerView.Adapter<RequestListViewHolder>() {

    var requests = mutableListOf<Request>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RequestListViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return RequestListViewHolder(inflater, parent, onRequestItemClickListener)
    }

    override fun onBindViewHolder(holder: RequestListViewHolder, position: Int) {
        val request = requests[position]
        holder.bind(request)
    }

    override fun getItemCount(): Int = requests.size
}

internal class RequestListViewHolder(
    inflater: LayoutInflater,
    parent: ViewGroup,
    private val onRequestItemClickListener: OnRequestItemClickListener
): RecyclerView.ViewHolder(inflater.inflate(R.layout.request_item, parent, false)) {

    private val binding by viewBinding(RequestItemBinding::bind)

    fun bind(request: Request) {
        binding.apply {
            tvRequestCustomer.text = request.customer
            tvRequestTime.text = request.time
            tvRequestDate.text = request.date
            tvRequestFrom.text = request.from
            tvRequestTo.text = request.to

            binding.root.setOnClickListener {
                onRequestItemClickListener.onRequestItemClicked()
            }
        }
    }
}