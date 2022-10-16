package ru.pochtifullstack.feature_auth.api

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import dagger.Lazy
import jp.wasabeef.blurry.Blurry
import jp.wasabeef.glide.transformations.BlurTransformation
import ru.pochtifullstack.feature_auth.R
import ru.pochtifullstack.feature_auth.databinding.FragmentAuthBinding
import ru.pochtifullstack.feature_auth.internal.AuthComponentViewModel
import ru.pochtifullstack.feature_auth.internal.AuthViewModel
import ru.pochtifullstack.feature_auth.internal.AuthViewModelFactory
import javax.inject.Inject
import ru.pochtifullstack.core_style.R as styleModule


class AuthFragment : Fragment(R.layout.fragment_auth) {

    @Inject
    internal lateinit var authViewModelFactory: Lazy<AuthViewModelFactory>

    private val binding by viewBinding(FragmentAuthBinding::bind)
    private val authViewModel: AuthViewModel by viewModels {
        authViewModelFactory.get()
    }
    private val componentViewModel: AuthComponentViewModel by viewModels()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        componentViewModel.authComponent.inject(this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (authViewModel.getLoginState()) {
            authViewModel.navigateToRequestList()
            return
        }

        authViewModel.setLogout()

        init()
    }

    private fun init() {
        binding.apply {
            btnAuthLogin.setOnClickListener {
                authViewModel.navigateFurther()
            }

            Glide.with(this@AuthFragment)
                .load(styleModule.drawable.background_white_30)
                .apply(RequestOptions.bitmapTransform(BlurTransformation(50)))
                .into(binding.authBackgroundBlur)
        }
    }
}