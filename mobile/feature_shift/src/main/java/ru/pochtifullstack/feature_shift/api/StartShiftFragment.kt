package ru.pochtifullstack.feature_shift.api

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.View
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import dagger.Lazy
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.FragmentStartShiftBinding
import ru.pochtifullstack.feature_shift.internal.ShiftComponentViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModelFactory
import javax.inject.Inject

class StartShiftFragment : Fragment(R.layout.fragment_start_shift) {

    @Inject
    internal lateinit var shiftViewModelFactory: Lazy<ShiftViewModelFactory>

    private val binding by viewBinding(FragmentStartShiftBinding::bind)
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
        binding.btnStartShift.setOnClickListener {
            shiftViewModel.moveToRequestList()
        }
    }
}