package com.sudhi.financetracker.app.repository;

import com.sudhi.financetracker.app.persistence.ExpenseEntity;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ExpenseRepositoryImpl implements ExpenseRepository {

    @Override
    @Transactional
    public void save(Expense expense) {
        ExpenseEntity entity = new ExpenseEntity();
        entity.date = expense.getDate();
        entity.month = expense.getDate().toString().substring(0, 7);
        entity.description = expense.getDescription();
        entity.amount = expense.getAmount();
        entity.category = expense.getCategory();
        entity.paymentMode = expense.getPaymentMode();
        entity.account = expense.getAccount();
        entity.valueScore = expense.getValueScore();
        entity.persist();
    }

    @Override
    public List<Expense> findByMonth(String month) {
        return ExpenseEntity.list("month", month)
                .stream()
                .map(e -> {
                    ExpenseEntity ent = (ExpenseEntity) e;
                    return new Expense(
                            ent.id,
                            ent.date,
                            ent.description,
                            ent.amount,
                            ent.category,
                            ent.paymentMode,
                            ent.account,
                            ent.valueScore
                    );
                })
                .collect(Collectors.toList());
    }
    @Transactional
    public void update(Long id, Expense updated) {
        ExpenseEntity entity = ExpenseEntity.findById(id);
        if (entity == null) {
            throw new NotFoundException("Expense not found");
        }

        entity.date = updated.getDate();
        entity.description = updated.getDescription();
        entity.amount = updated.getAmount();
        entity.category = updated.getCategory();
        entity.paymentMode = updated.getPaymentMode();
        entity.account = updated.getAccount();
        entity.valueScore = updated.getValueScore();
    }

    @Transactional
    public void delete(Long id) {
        ExpenseEntity.deleteById(id);
    }
}
