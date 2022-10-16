package ru.pochtifullstack.feature_shift.internal.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.RequestItemBinding

interface OnRequestItemClickListener {

    fun onRequestItemClicked(request: Request)
}

internal class RequestListAdapter(
    private val onRequestItemClickListener: OnRequestItemClickListener
): RecyclerView.Adapter<RequestListViewHolder>() {

    var requests = listOf<Request>()

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
            tvRequestTitle.text = request.type
            tvRequestCustomer.text = request.client.name
            //tvRequestTime.text = request.
            //tvRequestDate.text = request.date
            tvStatus.text = request.status
            tvRequestFrom.text = request.firstPlace
            tvRequestTo.text = request.secondPlace

            binding.root.setOnClickListener {
                onRequestItemClickListener.onRequestItemClicked(request)
            }
        }
    }
}