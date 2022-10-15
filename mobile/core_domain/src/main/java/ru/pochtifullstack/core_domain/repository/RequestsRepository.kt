package ru.pochtifullstack.core_domain.repository

import ru.pochtifullstack.core_domain.domain.Request

interface RequestsRepository {

    fun getRequests(): List<Request>

    fun approveRequest(request: Request)
}