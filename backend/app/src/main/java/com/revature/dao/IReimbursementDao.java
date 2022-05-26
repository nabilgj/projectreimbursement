package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementResolver;

import java.util.List;

public interface IReimbursementDao {

    //create
    void createReimbursement(Reimbursement r);

    //read
    List<Reimbursement> getAllPendingReimbursements();
    List<Reimbursement> getAllResolvedReimbursements();
    List<Reimbursement> getAllReimbursementsByEmployee(int userId);
    List<Reimbursement> getAllPendingRequestsByEmployee(int userId);
    List<Reimbursement> getAllResolvedRequestsByEmployee(int userId);

    //update
    Reimbursement updateReimbursement(Reimbursement r);
    void  resolveReimbursement(ReimbursementResolver rr);

    //delete
    void deleteReimbursement(int reimbursementId);
}
