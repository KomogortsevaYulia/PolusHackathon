package ru.pochtifullstack.polusmobile.navigation

import android.util.Log
import androidx.navigation.NavController

class BaseNavigation {

    var navController: NavController? = null

    fun bind(navController: NavController) {
        Log.d("anime", "inited ${navController.currentDestination}")
        this.navController = navController
    }

    fun unbind() {
        navController = null
    }
}