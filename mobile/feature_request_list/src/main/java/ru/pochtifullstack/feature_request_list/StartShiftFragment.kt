package ru.pochtifullstack.feature_request_list

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.feature_request_list.databinding.FragmentStartShiftBinding

class StartShiftFragment : Fragment(R.layout.fragment_start_shift) {

    private val binding by viewBinding(FragmentStartShiftBinding::bind)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        init()
    }

    private fun init() {

    }
}