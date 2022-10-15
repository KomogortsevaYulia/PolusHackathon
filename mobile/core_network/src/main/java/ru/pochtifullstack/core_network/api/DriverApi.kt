package ru.pochtifullstack.core_network.api

import retrofit2.http.*
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_network.api.dto.DriverShift

interface DriverApi {

    @GET("request/byCar/{id}")
    suspend fun getRequestsByCar(
        @Path("id") id: Int
    )

    @POST("working-shift")
    suspend fun startShift(
        @Body driverShift: DriverShift
    )

    @PATCH("working-shift/{vehicle_id}")
    suspend fun endShift(
        @Path("vehicle_id") vehicleId: Int
    )

    @GET("car/{id}")
    suspend fun getCarInfo(
        @Path("id") id: Int
    ): CarInfo
}