package com.example.homet.filter

import com.example.homet.repository.SessionRepository
import com.example.homet.service.SessionService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
data class AuthFilter(
    private val sessionService: SessionService,
): OncePerRequestFilter() {
    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        val path = request.servletPath
        return path.startsWith("/api/auth/login")
                || path.startsWith("/api/auth/signup")
    }
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ){
        val token = request.cookies?.find{it.name == "SESSION_TOKEN"}?.value?.takeIf { it.isNotBlank() }

        if(token == null || !sessionService.isValidSession(token)) {
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            return
        }
        filterChain.doFilter(request, response)
    }
}
