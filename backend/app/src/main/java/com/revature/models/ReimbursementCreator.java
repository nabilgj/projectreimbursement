package com.revature.models;

import java.sql.Date;

public class ReimbursementCreator {

    private int amount;
    private String submitted_date;
    private String description;
    private int reimbursementType;

    public ReimbursementCreator() {
    }

    public ReimbursementCreator(int amount, String description, int reimbursementType) {
        this.amount = amount;
        this.description = description;
        this.reimbursementType = reimbursementType;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReimbursementType() {
        return reimbursementType;
    }

    public void setReimbursementType(int reimbursementType) {
        this.reimbursementType = reimbursementType;
    }

    @Override
    public String toString() {
        return "ReimbursementCreator{" +
                "amount=" + amount +
                ", description='" + description + '\'' +
                ", reimbursementType=" + reimbursementType +
                '}';
    }
}
