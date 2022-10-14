package ru.pochtifullstack.feature_auth.api

import android.content.Context
import android.os.Bundle
import android.view.View
import dagger.Lazy
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.feature_auth.R
import ru.pochtifullstack.feature_auth.databinding.FragmentAuthBinding
import ru.pochtifullstack.feature_auth.internal.AuthViewModel
import ru.pochtifullstack.feature_auth.internal.AuthViewModelFactory
import ru.pochtifullstack.feature_auth.internal.di.AuthComponent
import javax.inject.Inject


class AuthFragment : Fragment(R.layout.fragment_auth) {

    @Inject
    internal lateinit var authViewModelFactory: Lazy<AuthViewModelFactory>

    private val binding by viewBinding(FragmentAuthBinding::bind)
    private val authViewModel: AuthViewModel by viewModels {
        authViewModelFactory.get()
    }
    private val componentViewModel: AuthComponent by viewModels()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        componentViewModel.inject(this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        init()
    }

    private fun init() {
        binding.btnAuthLogin.setOnClickListener {
            authViewModel.navigateFurther()
        }
    }
}