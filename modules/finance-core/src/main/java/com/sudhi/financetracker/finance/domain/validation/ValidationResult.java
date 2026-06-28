package com.sudhi.financetracker.finance.domain.validation;

import java.util.List;

public record ValidationResult(

        boolean valid,

        List<String> errors

) {

}