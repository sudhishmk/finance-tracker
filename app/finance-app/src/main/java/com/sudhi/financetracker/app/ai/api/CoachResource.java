package com.sudhi.financetracker.app.ai.api;

import java.util.List;

import com.sudhi.finance.analytics.ai.coach.model.CoachRequest;
import com.sudhi.finance.analytics.ai.coach.model.CoachResponse;
import com.sudhi.finance.analytics.ai.coach.model.FinancialSnapshot;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import com.sudhi.finance.analytics.ai.service.LLMService;

import com.sudhi.finance.analytics.ai.coach.service.FinancialCoachService;
import com.sudhi.finance.analytics.ai.coach.service.FinancialSnapshotService;
import com.sudhi.finance.analytics.ai.provider.LLMProvider;

import jakarta.inject.Inject;

@Path("/api/v1/coach")
public class CoachResource {

    @Inject
    LLMProvider provider;

    @Inject
    FinancialContextAssembler assembler;

    @GET
    @Path("/review-test")
    public CoachResponse review_test() {
        return new CoachResponse(
                List.of("Placeholder"),
                List.of("Placeholder"),
                List.of("Placeholder"),
                List.of("Placeholder"));
    }


    @GET
    @Path("/review")
    @Produces(MediaType.APPLICATION_JSON)

    public CoachResponse review( @QueryParam("month") String month) throws Exception {

        FinancialSnapshot snapshot = assembler.build(month);

        CoachRequest request = new CoachRequest(snapshot);

        FinancialCoachService service = new FinancialCoachService( new LLMService( provider));

        return service.review( request);

    }

}