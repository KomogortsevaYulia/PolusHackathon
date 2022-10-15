package ru.pochtifullstack.polusmobile.navigation

import androidx.navigation.NavController

class BaseNavigation {

    var navController: NavController? = null

    fun bind(navController: NavController) {
        this.navController = navController
    }

    fun unbind() {
        navController = null
    }
}