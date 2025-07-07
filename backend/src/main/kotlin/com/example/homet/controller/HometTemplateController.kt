package com.example.homet.controller

import com.example.homet.dto.Template
import com.example.homet.dto.TemplateSource
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/homet/template")
class HometTemplateController{
    @GetMapping
    fun getTemplate(): ResponseEntity<Map<String,List<Template>>>{
        val inputStream = javaClass.classLoader.getResourceAsStream("json/homet-template.json")
        val json = inputStream?.bufferedReader()?.use { it.readText() }

        val source = jacksonObjectMapper().readValue(json, TemplateSource::class.java)
        val templateList = source.template.mapIndexed { index, text ->
            Template(id = index + 1L, contents = text)
        }

        return ResponseEntity.ok(mapOf("result" to templateList))
    }
}
