package com.revature.models;

import java.sql.Date;

public class Reimbursement {

    private int id;
    private double amount;
    private Date submittedDate;
    private Date resolvedDate;
    private String description;
    private int reimbursementAuthorId;
    private int reimbursementResolverId;
    private int reimbursementStatusId;
    private int reimbursementTypeId;

    private String reimbursementStatus;
    private String reimbursementType;

    public Reimbursement() {
    }


    public Reimbursement(double amount, Date submittedDate, String description, int reimbursementAuthorId, int reimbursementStatusId, int reimbursementTypeId) {
        this.amount = amount;
        this.submittedDate = submittedDate;
        this.description = description;
        this.reimbursementAuthorId = reimbursementAuthorId;
        this.reimbursementStatusId = reimbursementStatusId;
        this.reimbursementTypeId = reimbursementTypeId;

        if(reimbursementStatusId == 1){
            this.reimbursementStatus = "Pending";
        } else if(reimbursementStatusId == 2) {
            this.reimbursementStatus = "Approved";
        } else if(reimbursementStatusId == 3) {
            this.reimbursementStatus = "Denied";
        }
        if(reimbursementTypeId == 1){
            this.reimbursementType = "Lodging";
        } else if(reimbursementTypeId == 2){
            this.reimbursementType = "Food";
        } else if(reimbursementTypeId == 3){
            this.reimbursementType = "Travel";
        } else if(reimbursementTypeId == 4){
            this.reimbursementType = "Other";
        }

    }

    public Reimbursement(int id, double amount, Date submittedDate, Date resolvedDate, String description, int reimbursementAuthorId, int reimbursementResolverId, int reimbursementStatusId, int reimbursementTypeId) {
        this.id = id;
        this.amount = amount;
        this.submittedDate = submittedDate;
        this.resolvedDate = resolvedDate;
        this.description = description;
        this.reimbursementAuthorId = reimbursementAuthorId;
        this.reimbursementResolverId = reimbursementResolverId;
        this.reimbursementStatusId = reimbursementStatusId;
        this.reimbursementTypeId = reimbursementTypeId;

        if(reimbursementStatusId == 1){
            this.reimbursementStatus = "Pending";
        } else if(reimbursementStatusId == 2) {
            this.reimbursementStatus = "Approved";
        } else if(reimbursementStatusId == 3) {
            this.reimbursementStatus = "Denied";
        }
        if(reimbursementTypeId == 1){
            this.reimbursementType = "Lodging";
        } else if(reimbursementTypeId == 2){
            this.reimbursementType = "Food";
        } else if(reimbursementTypeId == 3){
            this.reimbursementType = "Travel";
        } else if(reimbursementTypeId == 4){
            this.reimbursementType = "Other";
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }

    public Date getResolvedDate() {
        return resolvedDate;
    }

    public void setResolvedDate(Date resolvedDate) {
        this.resolvedDate = resolvedDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReimbursementAuthorId() {
        return reimbursementAuthorId;
    }

    public void setReimbursementAuthorId(int reimbursementAuthorId) {
        this.reimbursementAuthorId = reimbursementAuthorId;
    }

    public int getReimbursementResolverId() {
        return reimbursementResolverId;
    }

    public void setReimbursementResolverId(int reimbursementResolverId) {
        this.reimbursementResolverId = reimbursementResolverId;
    }

    public int getReimbursementStatusId() {
        return reimbursementStatusId;
    }

    public void setReimbursementStatusId(int reimbursementStatusId) {
        this.reimbursementStatusId = reimbursementStatusId;
    }

    public int getReimbursementTypeId() {
        return reimbursementTypeId;
    }

    public void setReimbursementTypeId(int reimbursementTypeId) {
        this.reimbursementTypeId = reimbursementTypeId;
    }

    public String getReimbursementStatus() {
        return reimbursementStatus;
    }

    public void setReimbursementStatus(String reimbursementStatus) {
        this.reimbursementStatus = reimbursementStatus;
    }

    public String getReimbursementType() {
        return reimbursementType;
    }

    public void setReimbursementType(String reimbursementType) {
        this.reimbursementType = reimbursementType;
    }


    @Override
    public String toString() {
        return "Reimbursement{" +
                "id=" + id +
                ", amount=" + amount +
                ", submittedDate=" + submittedDate +
                ", resolvedDate=" + resolvedDate +
                ", description='" + description + '\'' +
                ", reimbursementAuthorId=" + reimbursementAuthorId +
                ", reimbursementResolverId=" + reimbursementResolverId +
                ", reimbursementStatusId=" + reimbursementStatusId +
                ", reimbursementTypeId=" + reimbursementTypeId +
                ", reimbursementStatus='" + reimbursementStatus + '\'' +
                ", reimbursementType='" + reimbursementType + '\'' +
                '}';
    }
}
