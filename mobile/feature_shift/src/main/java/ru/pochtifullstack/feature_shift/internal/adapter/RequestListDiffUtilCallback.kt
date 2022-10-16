package ru.pochtifullstack.feature_shift.internal.adapter

import androidx.recyclerview.widget.DiffUtil
import ru.pochtifullstack.core_domain.domain.Request

internal class RequestListDiffUtilCallback(
    private var oldList: List<Request>,
    private var newList: List<Request>
): DiffUtil.Callback() {

    override fun getOldListSize(): Int = oldList.size

    override fun getNewListSize(): Int = newList.size

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].id == newList[newItemPosition].id
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition] == newList[newItemPosition]
    }
}