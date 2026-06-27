package com.sudhi.financetracker.app.ai.client;

import  com.sudhi.financetracker.app.ai.dto.OpenAIRequest;
import  com.sudhi.financetracker.app.ai.dto.OpenAIResponse;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.HeaderParam;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("/v1")
@RegisterRestClient(configKey = "openai")
public interface OpenAIClient {

    @POST
    @Path("/chat/completions")

    OpenAIResponse generate(

            OpenAIRequest request,

            @HeaderParam("Authorization")
            String authorization

    );

}
