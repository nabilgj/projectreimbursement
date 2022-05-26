/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package com.revature;

import com.revature.controllers.ReimbursementController;
import com.revature.controllers.UserController;
import com.revature.dao.*;
import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementResolver;
import com.revature.models.User;
import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.revature.services.ReimbursementService;
import com.revature.services.UserService;
import io.javalin.Javalin;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Driver {


    private static final IUserDao uDao = new UserDaoJDBC();
    private static final UserService uServ = new UserService(uDao);
    private static final IReimbursementDao rDao = new ReimbursementDaoJDBC();
    private static final ReimbursementService rServ = new ReimbursementService(rDao);

    public static void main(String[] args) {


        UserController uc = new UserController(uServ);
        ReimbursementController rc = new ReimbursementController(rServ);


        // configure Javalin server
        Javalin server = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
        });

        server.before(ctx -> ctx.header("Access-Control-Allow-Credentials", "true"));
        server.before(ctx -> ctx.header("Access-Control-Expose-Headers", "*"));

        server.routes(() ->{
            path("users", () -> {
                post("/register", uc.handleRegister);
                post("/login", uc.handleLogin);
                delete("/logout", uc.handleLogout);
                get("/getAllUsers", uc.handleGetAllUsers);
                post("/update", uc.handleUpdateUser);
                get("/{username}", uc.handleGetMyInfo);
                get("/verifyLogin", uc.handleVerifyLogin);
                //delete("/deleteUser{id}", uc.handleDeleteUser);
            });
            path("reimbursements", () -> {
                post("/createRequest", rc.handleCreateRequest);
                post("/resolveRequest", rc.handleResolveRequest);


                get("/getAllPendingByUser", rc.handleGetAllPendingByUser);
                get("/getAllResolvedByUser", rc.handleGetAllResolvedByUser);


                get("/getAllPending", rc.handleGetAllPending);
                get("/getAllResolved", rc.handleGetAllResolved);
                get("/getAllRequestsByEmployee/{id}", rc.handleGetAllRequestsByEmployee);
            });


        });
        server.start(8000);

    }





        /*

        User FinanceManager = new User("jj_link", "Joseph", "Link", "jj_link@email.com", "password", 1);
        uDao.createUser(FinanceManager);

        User createEmployee = new User("j_doe", "John", "Doe", "jdoe@email.com", "pa$$word", 2);
        uDao.createUser(createEmployee);



        User fm = uDao.getUserByEmailOrUsername("jj_link");
        System.out.println("Testing get user by userNameorEmail:  " + fm.toString());

        System.out.println("Testing Get all users:  " + uDao.getAllUsers());

        //uDao.deleteUserByEmailOrUsername("jj_link@email.com");
        //System.out.print(uDao.getAllUsers());

        User updatedUser = new User(fm.getUser_id(), fm.getUsername(), "Broseph", fm.getLastName(), fm.getEmail(), fm.getPassword(), fm.getRole_id());
        uDao.updateUser(updatedUser);
        System.out.println("Printing updated user: " + updatedUser.toString());


        //test create reimbursements
        Date d = new Date(Instant.now().toEpochMilli());
        Reimbursement r1 = new Reimbursement(1000, d, "bought an Xbox", 1, 1, 4);
        rDao.createReimbursement(r1);

        d = new Date(Instant.now().toEpochMilli());
        Reimbursement r2 = new Reimbursement(1000, d, "bought a Laptop", 2, 1, 4);
        rDao.createReimbursement(r2);



        //test read methods

        //test get all pending requests
        List<Reimbursement> pendingList = new ArrayList<>();
        pendingList = rDao.getAllPendingReimbursements();
        System.out.println("List of all pending requests: " + pendingList);

        //test get all resolved requests
        List<Reimbursement> resolvedList = new ArrayList<>();
        resolvedList = rDao.getAllResolvedReimbursements();
        System.out.println("List of all resolved requests: " + resolvedList);

        //test get reimbursements by employee
        List<Reimbursement> rList = rDao.getAllReimbursementsByEmployee(1);
        System.out.println("List of all Reimbursements by employee 1: " + rList);


        //test update reimbursement
        d = new Date(Instant.now().toEpochMilli());
        Reimbursement updatedReimbursement = new Reimbursement(1000, d, "Bought some Yeezys", 1, 1, 4);
        updatedReimbursement.setId(1);
        rDao.updateReimbursement(updatedReimbursement);


        //test resolve reimbursement
        rDao.resolveReimbursement(new ReimbursementResolver(1,2,3));

        //test get all resolved requests
        resolvedList = new ArrayList<>();
        resolvedList = rDao.getAllResolvedReimbursements();
        System.out.println("List of all resolved requests: " + resolvedList);

        //test delete reimbursement
        rDao.deleteReimbursement(1);

    }
         */
}
