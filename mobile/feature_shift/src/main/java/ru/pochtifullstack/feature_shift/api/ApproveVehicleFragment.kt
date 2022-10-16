package ru.pochtifullstack.feature_shift.api

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import by.kirich1409.viewbindingdelegate.viewBinding
import com.google.android.material.snackbar.Snackbar
import dagger.Lazy
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.FragmentApproveVehicleBinding
import ru.pochtifullstack.feature_shift.databinding.FragmentStartShiftBinding
import ru.pochtifullstack.feature_shift.internal.ShiftComponentViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModelFactory
import javax.inject.Inject

class ApproveVehicleFragment: Fragment(R.layout.fragment_approve_vehicle) {

    @Inject
    internal lateinit var shiftViewModelFactory: Lazy<ShiftViewModelFactory>

    private val binding by viewBinding(FragmentApproveVehicleBinding::bind)
    private val shiftViewModel: ShiftViewModel by viewModels {
        shiftViewModelFactory.get()
    }

    private val componentViewModel: ShiftComponentViewModel by viewModels()

    override fun onAttach(context: Context) {
        componentViewModel.shiftComponent.inject(this)

        super.onAttach(context)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        init()
    }

    private fun init() {
        binding.btnVehicleStartShift.setOnClickListener {
            shiftViewModel.startShift()
        }

        shiftViewModel.carInfoLiveData.observe(viewLifecycleOwner) {
            binding.tvVehicleName.text = it.subType
            binding.tvVehicleCode.text = it.name
            binding.ivVehicle.visibility = View.VISIBLE
        }

        shiftViewModel.errorLiveData.observe(viewLifecycleOwner) {
            Snackbar.make(binding.root, "Нет доступа к интернету", Snackbar.LENGTH_SHORT).show()
        }

        shiftViewModel.getCarInfo()
    }
}