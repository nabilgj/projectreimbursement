package com.revature.controllers;

import com.revature.models.LoginObject;
import com.revature.models.User;
import com.revature.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.utils.LoggingUtil;
import io.javalin.http.Handler;

import java.util.List;

public class UserController {

    private UserService uServ;
    private ObjectMapper om;
    public UserController(UserService uServ){
        this.uServ=uServ;
        this.om = new ObjectMapper();
    }


    public Handler handleRegister = (ctx) -> {
        User u = om.readValue(ctx.body(), User.class);

        //check to see if username or email is already taken
        boolean isTaken = false;
        for (User currentUser: uServ.getAllUsers()){
            if((u.getUsername().equals(currentUser.getUsername())) || (u.getEmail().equals(currentUser.getEmail()))){
                isTaken = true;
            }
        }
        if(isTaken == false){
            uServ.registerUser(u.getUsername(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getPassword(), u.getRole_id());
            ctx.status(201);
            ctx.result(om.writeValueAsString("user created as " + u.getEmail()));
        }else{
            ctx.status(409);
            ctx.result("Username or email already taken");
        }
    };

    public Handler handleLogin = (ctx) -> {
        LoginObject lo = om.readValue(ctx.body(), LoginObject.class);


        User u = uServ.getUserByEmailOrUsername(lo.getEmailOrUsername());
        System.out.println("coming from controller line 46" + u);

        if(u == null || !lo.getPassword().equals(u.getPassword())){
            ctx.status(403);
            ctx.result("Email/Username or password incorrect");
        } else {
            //logged in successfully, set up session
            u = uServ.loginUser(lo);
            ctx.req.getSession().setAttribute("user_id", u.getUser_id());
            ctx.req.getSession().setAttribute("username", u.getUsername());
            ctx.req.getSession().setAttribute("role", u.getRole());
            ctx.status(200);
            ctx.result(om.writeValueAsString(u));
        }
    };

    public Handler handleLogout = (ctx) ->{
        ctx.req.getSession().setAttribute("user_id", null);
        ctx.req.getSession().setAttribute("username", null);
        ctx.req.getSession().setAttribute("role", null);
        ctx.status(205);
        ctx.result("Oh you logged out! Have a great day.");
    };

    public Handler handleGetAllUsers = (ctx) ->{

        List<User> userList = uServ.getAllUsers();
        if((ctx.req.getSession().getAttribute("user_id") == null) ||
                (ctx.req.getSession().getAttribute("role").equals("Employee"))) {

            ctx.status(403);
            ctx.result("Must be logged in as Manager to view all accounts");
        } else if (ctx.req.getSession().getAttribute("role").equals("FinanceManager")){

            List<User> allUsers = uServ.getAllUsers();
            ctx.status(200);
            ctx.result(om.writeValueAsString(allUsers));
        } else{
            ctx.status(404);
            LoggingUtil.logger.warn("User has done something weird");
            ctx.result("You did something weird");
        }
    };

    public Handler handleUpdateUser = (ctx) ->{
        User currentInfo = uServ.getUserByEmailOrUsername((String)ctx.req.getSession().getAttribute("username"));
        if(ctx.req.getSession().getAttribute("username") == null ||
                !ctx.req.getSession().getAttribute("username").equals(currentInfo.getUsername())) {
            ctx.status(401);
            ctx.result("You must be logged in as the correct user to update user info");
        }
        else if(ctx.req.getSession().getAttribute("username").equals(currentInfo.getUsername())){
            User u = om.readValue(ctx.body(), User.class);
            u = uServ.updateUserInfo(u);
            ctx.status(200);
            ctx.result(om.writeValueAsString(u));
        }
    };

    public Handler handleVerifyLogin = (ctx) ->{
        if(ctx.req.getSession().getAttribute("username") == null){
            ctx.status(403);
        } else{
            User u = uServ.getUserByEmailOrUsername((String)ctx.req.getSession().getAttribute("username"));
            ctx.result(om.writeValueAsString(u));
        }
    };

    public Handler handleGetMyInfo = (ctx) ->{
        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(403);
            ctx.result("Must be logged in to view your requests");
        }else {
            User u = uServ.getUserByEmailOrUsername((String) ctx.req.getSession().getAttribute("username"));
            ctx.status(200);
            ctx.result(om.writeValueAsString(u));
        }
    };

}