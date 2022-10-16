package ru.pochtifullstack.polusmobile

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatDelegate
import androidx.fragment.app.add
import androidx.fragment.app.commit
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import by.kirich1409.viewbindingdelegate.viewBinding
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.feature_auth.api.AuthFragment
import ru.pochtifullstack.polusmobile.databinding.ActivityMainBinding
import ru.pochtifullstack.polusmobile.navigation.BaseNavigation
import javax.inject.Inject

class MainActivity : AppCompatActivity() {

    private val binding by viewBinding(ActivityMainBinding::bind)

    @Inject
    lateinit var baseNavigation: BaseNavigation

    override fun onCreate(savedInstanceState: Bundle?) {
        App.INSTANCE.appComponent.inject(this)

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)

        setupNavigation()
    }

    private fun setupNavigation() {
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.fragment_container) as NavHostFragment
        val navController = navHostFragment.navController
        baseNavigation.bind(navController)
    }

    override fun onDestroy() {
        baseNavigation.unbind()
        super.onDestroy()
    }
}