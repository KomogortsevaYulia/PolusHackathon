package ru.pochtifullstack.feature_map

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.fragment.app.Fragment
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.feature_map.databinding.FragmentRequestDetailsBinding

class RequestDetailsFragment: Fragment() {

    private val binding by viewBinding (FragmentRequestDetailsBinding::bind)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Toast.makeText(requireContext(), "URA", Toast.LENGTH_SHORT).show()

        init()
    }

    private fun init() {
        binding.apply {
            tvRequestName.text = requireArguments().getString("taskName")
            tvCustomer.text = requireArguments().getString("customer")
            tvFrom.text = requireArguments().getString("firstPlace")
            tvTo.text = requireArguments().getString("secondPlace")
        }
    }
}