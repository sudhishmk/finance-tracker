package com.sudhi.financetracker.app.repository;

import com.sudhi.financetracker.app.persistence.IncomeEntity;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.repository.IncomeRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class IncomeRepositoryImpl implements IncomeRepository {

    @Override
    @Transactional
    public void save(Income income) {
        IncomeEntity entity = new IncomeEntity();
        entity.date = income.date();
        entity.month = income.date().toString().substring(0, 7);
        entity.source = income.source();
        entity.amount = income.amount();
        entity.persist();
    }

    @Override
    public List<Income> findByMonth(String month) {
        return IncomeEntity.list("month", month)
                .stream()
                .map(e -> {
                    IncomeEntity ent = (IncomeEntity) e;
                    return new Income(ent.id,ent.date, ent.source, ent.amount);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void update(Long id, Income updated) {
        IncomeEntity entity = IncomeEntity.findById(id);
        entity.source = updated.source();
        entity.amount = updated.amount();
        entity.date = updated.date();
    }

    @Transactional
    public void delete(Long id) {
        IncomeEntity.deleteById(id);
    }

}
