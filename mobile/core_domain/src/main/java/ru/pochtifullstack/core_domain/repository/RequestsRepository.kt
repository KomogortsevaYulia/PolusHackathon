package ru.pochtifullstack.core_domain.repository

import androidx.lifecycle.LiveData
import ru.pochtifullstack.core_domain.domain.Request

interface RequestsRepository {

    fun getRequests(): LiveData<List<Request>>

    suspend fun loadRequests()

    suspend fun approveRequest(request: Request)
}