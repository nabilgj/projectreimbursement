package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementCreator;
import com.revature.models.ReimbursementResolver;
import com.revature.services.ReimbursementService;
import io.javalin.http.Handler;

import java.util.List;

public class ReimbursementController {

    private ReimbursementService rServ;
    private ObjectMapper om;

    public ReimbursementController(ReimbursementService rServ){
        this.rServ = rServ;
        this.om = new ObjectMapper();
    }

    public Handler handleCreateRequest = (ctx) -> {

        ReimbursementCreator rc = om.readValue(ctx.body(), ReimbursementCreator.class);

        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(403);
            ctx.result("Must be logged in to create request");
        }

        else if(rc.getAmount() <= 0){
            ctx.status(409);
            ctx.result("Reimbursement amount must be > 0");
        }
        else {
            int author_id = (int) ctx.req.getSession().getAttribute("user_id");
            rServ.createReimbursement(rc, author_id);
            ctx.status(201);
            ctx.result(om.writeValueAsString(rc));
        }

    };

    public Handler handleResolveRequest = (ctx) -> {

        ReimbursementResolver rr = om.readValue(ctx.body(), ReimbursementResolver.class);
        if((ctx.req.getSession().getAttribute("user_id") == null) ||
                (ctx.req.getSession().getAttribute("role").equals("Employee"))) {

            ctx.status(403);
            ctx.result("Must be logged in as Manager to resolve reimbursement request");

        } else if (ctx.req.getSession().getAttribute("role").equals("FinanceManager")){

            int resolverId = (int) ctx.req.getSession().getAttribute("user_id");
            rr.setResolverId(resolverId);
            rServ.resolveReimbursement(rr);
            ctx.status(200);
            ctx.result("Reimbursement request resolved successfully");
            ctx.result(om.writeValueAsString(rr));
        }

    };

    public Handler handleGetAllPendingByUser = (ctx) -> {
        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(403);
            ctx.result("Must be logged in to view your requests");
        }else {
            int userId = (int) ctx.req.getSession().getAttribute("user_id");
            List<Reimbursement> allPending = rServ.getAllPendingByUser(userId);
            ctx.status(200);
            ctx.result(om.writeValueAsString(allPending));
        }
    };

    public Handler handleGetAllResolvedByUser = (ctx) -> {
        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(403);
            ctx.result("Must be logged in to view your requests");
        }else {
            int userId = (int) ctx.req.getSession().getAttribute("user_id");
            List<Reimbursement> allResolved = rServ.getAllResolvedByUser(userId);
            ctx.status(200);
            ctx.result(om.writeValueAsString(allResolved));
        }
    };

    public Handler handleGetAllPending = (ctx) -> {


        if((ctx.req.getSession().getAttribute("user_id") == null) ||
                (ctx.req.getSession().getAttribute("role").equals("Employee"))) {
            ctx.status(403);
            ctx.result("Must be logged in as Manager to view all pending requests");
        } else {
            List<Reimbursement> allPending = rServ.getAllPendingRequests();
            ctx.status(200);
            ctx.result(om.writeValueAsString(allPending));
        }
    };

    public Handler handleGetAllResolved = (ctx) -> {

        if((ctx.req.getSession().getAttribute("user_id") == null) ||
                (ctx.req.getSession().getAttribute("role").equals("Employee"))) {
            ctx.status(403);
            ctx.result("Must be logged in as Manager to view all resolved requests");
        } else {
            List<Reimbursement> allResolved = rServ.getAllResolvedRequests();
            ctx.status(200);
            ctx.result(om.writeValueAsString(allResolved));
        }
    };

    public Handler handleGetAllRequestsByEmployee = (ctx) -> {
        int userId = Integer.parseInt(ctx.pathParam("id"));


        if((ctx.req.getSession().getAttribute("user_id") == null) ||
                (ctx.req.getSession().getAttribute("role").equals("Employee"))) {
            ctx.status(403);
            ctx.result("Must be logged in as a Manager to view all request by user id " + userId);
        }else {
            List<Reimbursement> allRequests = rServ.getAllReimbursementsByEmployee(userId);
            ctx.status(200);
            ctx.result(om.writeValueAsString(allRequests));
        }
    };


}
