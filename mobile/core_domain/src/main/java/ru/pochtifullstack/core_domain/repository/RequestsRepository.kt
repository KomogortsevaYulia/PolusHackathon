package ru.pochtifullstack.core_domain.repository

import ru.pochtifullstack.core_domain.domain.Request

interface RequestsRepository {

    suspend fun getRequests(): List<Request>

    suspend fun approveRequest(request: Request)
}