package ru.pochtifullstack.core_network.api

import retrofit2.http.GET

interface DriverApi {

    @GET("")
    fun test()
}