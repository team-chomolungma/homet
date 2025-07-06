package com.example.homet.dto

data class Template(
    val id: Long,
    val contents: String
)

data class TemplateSource(
    val template: List<String>
)
