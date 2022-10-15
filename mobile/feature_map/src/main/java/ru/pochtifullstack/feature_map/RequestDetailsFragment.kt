package ru.pochtifullstack.feature_map

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.feature_map.databinding.FragmentRequestDetailsBinding

class RequestDetailsFragment: Fragment() {

    private val binding by viewBinding (FragmentRequestDetailsBinding::bind)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }
}