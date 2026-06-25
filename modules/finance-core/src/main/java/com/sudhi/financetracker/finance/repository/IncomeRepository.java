package com.sudhi.financetracker.finance.repository;

import com.sudhi.financetracker.finance.model.Income;

import java.util.List;

public interface IncomeRepository {

    void save(Income income);

    List<Income> findByMonth(String month);

    void update(Long id, Income income);

    void delete(Long id);


}
