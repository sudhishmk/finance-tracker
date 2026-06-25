package com.sudhi.financetracker.finance.repository;

import com.sudhi.financetracker.finance.model.Expense;

import java.util.List;

public interface ExpenseRepository {

    void save(Expense expense);

    List<Expense> findByMonth(String month);

    void update(Long id, Expense updated);

    void delete(Long id);
}
