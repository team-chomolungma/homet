package com.example.homet.config

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import io.github.cdimascio.dotenv.dotenv
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AwsS3Config {

    @Bean
    fun amazonS3(): AmazonS3 {

        val dotenv = dotenv {
            directory = "./"
            ignoreIfMissing = true
        }

        val accessKey = dotenv["AWS_ACCESS_KEY_ID"] ?: throw IllegalArgumentException("AWS_ACCESS_KEY_ID is not set")
        val secretKey =
            dotenv["AWS_SECRET_ACCESS_KEY"] ?: throw IllegalArgumentException("AWS_SECRET_ACCESS_KEY is not set")

        System.getenv("AWS_SECRET_ACCESS_KEY") ?: throw IllegalArgumentException("AWS_SECRET_ACCESS_KEY is not set")

        val credentials = BasicAWSCredentials(accessKey, secretKey)

        return AmazonS3ClientBuilder.standard()
            .withRegion("us-east-1")
            .withCredentials(AWSStaticCredentialsProvider(credentials))
            .build()
    }
}
