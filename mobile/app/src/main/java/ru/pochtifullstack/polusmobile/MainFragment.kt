package ru.pochtifullstack.polusmobile

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.setupWithNavController
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.polusmobile.databinding.FragmentMainBinding
import ru.pochtifullstack.polusmobile.navigation.BaseNavigation
import javax.inject.Inject

class MainFragment: Fragment(R.layout.fragment_main) {

    private val binding by viewBinding(FragmentMainBinding::bind)

    @Inject
    lateinit var baseNavigation: BaseNavigation

    override fun onAttach(context: Context) {
        super.onAttach(context)

        App.INSTANCE.appComponent.inject(this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Log.d("anime", "launched")

        setupNavigation()
    }

    private fun setupNavigation() {
        val navHostFragment = childFragmentManager.findFragmentById(R.id.fragment_container_main) as NavHostFragment
        val navController = navHostFragment.navController
        baseNavigation.bind(navController)
        binding.bottomNavigationView.setupWithNavController(navController)

        Log.d("anime", "${navController.currentDestination}")
    }
}