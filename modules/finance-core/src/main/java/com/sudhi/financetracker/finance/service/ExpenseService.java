package com.sudhi.financetracker.finance.service;

import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public void addExpense(Expense expense) {
        repository.save(expense);
    }

    public List<Expense> getMonthlyExpenses(String month) {
        return repository.findByMonth(month);
    }

    public static String deriveMonth(Expense expense) {
        return expense.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM"));
    }
    public void updateExpense(Long id, Expense updated) {
        repository.update(id, updated);
    }
    
    public void deleteExpense(Long id) {
        repository.delete(id);
    }
}
