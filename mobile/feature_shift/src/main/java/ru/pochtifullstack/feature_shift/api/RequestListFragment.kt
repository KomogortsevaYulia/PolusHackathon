package ru.pochtifullstack.feature_shift.api

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.View
import android.widget.Toast
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import dagger.Lazy
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.FragmentApproveVehicleBinding
import ru.pochtifullstack.feature_shift.databinding.FragmentRequestListBinding
import ru.pochtifullstack.feature_shift.internal.ShiftComponentViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModelFactory
import ru.pochtifullstack.feature_shift.internal.adapter.OnRequestItemClickListener
import ru.pochtifullstack.feature_shift.internal.adapter.RequestListAdapter
import javax.inject.Inject

class RequestListFragment : Fragment(R.layout.fragment_request_list) {

    @Inject
    internal lateinit var shiftViewModelFactory: Lazy<ShiftViewModelFactory>

    private val binding by viewBinding(FragmentRequestListBinding::bind)
    private val shiftViewModel: ShiftViewModel by viewModels {
        shiftViewModelFactory.get()
    }

    private val componentViewModel: ShiftComponentViewModel by viewModels()

    private var adapter = RequestListAdapter(object : OnRequestItemClickListener {

        override fun onRequestItemClicked() {
            TODO("Not yet implemented")
        }
    })

    override fun onAttach(context: Context) {
        componentViewModel.shiftComponent.inject(this)

        super.onAttach(context)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        init()
    }

    private fun init() {
        shiftViewModel.getRequests().observe(viewLifecycleOwner) {
            adapter.requests = it
            binding.rcvRequests.adapter = adapter
            binding.rcvRequests.adapter?.notifyDataSetChanged()
        }

        binding.btnChangeVehicle.setOnClickListener {
            shiftViewModel.moveBackToScaner()
        }

        binding.btnEndShift.setOnClickListener {
            shiftViewModel.moveBackToShift()
        }

        shiftViewModel.loadVehicleRequests()
    }
}