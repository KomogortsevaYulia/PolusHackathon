package ru.pochtifullstack.core_data.repository

import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_domain.repository.RequestsRepository

class RequestsRepositoryImpl: RequestsRepository {

    override fun getRequests(): List<Request> {
        TODO("Not yet implemented")
    }

    override fun approveRequest(request: Request) {
        TODO("Not yet implemented")
    }
}