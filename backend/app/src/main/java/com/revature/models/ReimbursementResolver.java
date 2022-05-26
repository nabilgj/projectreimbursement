package com.revature.models;

public class ReimbursementResolver {

    private int resolverId;
    private int reimbursementId;
    private int status;

    public ReimbursementResolver() {
    }

    public ReimbursementResolver(int reimbursementId, int status) {
        this.reimbursementId = reimbursementId;
        this.status = status;
    }

    public ReimbursementResolver(int resolverId, int reimbursementId, int status) {
        this.reimbursementId = reimbursementId;
        this.status = status;
    }


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    public int getResolverId() {
        return resolverId;
    }

    public void setResolverId(int resolverId) {
        this.resolverId = resolverId;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }



    @Override
    public String toString() {
        return "ReimbursementResolver{" +
                "resolverId=" + resolverId +
                ", reimbursementId=" + reimbursementId +
                ", status=" + status +
                '}';
    }

}
