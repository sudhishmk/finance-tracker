package com.sudhi.financetracker.app.factory;

import com.sudhi.finance.analytics.ai.provider.LLMProvider;
import com.sudhi.financetracker.app.ai.provider.OpenAICompatibleProvider;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class LLMFactory {

@Inject
OpenAICompatibleProvider provider;

public LLMProvider provider(){

return provider;

}

}
