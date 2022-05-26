package com.revature.dao;

import com.revature.models.User;
import com.revature.utils.ConnectionSingleton;

import java.util.ArrayList;
import java.util.List;
import java.sql.*;

public class UserDaoJDBC implements IUserDao{

    public ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();


    @Override
    public void createUser(User u) {
        Connection c = cs.getConnection();

        String role = u.getRole();

        String sql1 = "INSERT into users (username, firstName, lastName, email, password, role_id) values (?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement p = c.prepareStatement(sql1);
            p.setString(1, u.getUsername());
            p.setString(2, u.getFirstName());
            p.setString(3, u.getLastName());
            p.setString(4, u.getEmail());
            p.setString(5, u.getPassword());
            p.setInt(6, u.getRole_id());

            p.execute();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> getAllUsers() {
        Connection c = cs.getConnection();

        String sql = "SELECT * from users";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            User u = null;
            List<User> userList = new ArrayList<>();
            while(rs.next()) {
                u = new User(rs.getInt(1), rs.getString(2),
                        rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7));
                userList.add(u);
            }
            return userList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public User getUserByEmailOrUsername(String emailOrUsername) {
        Connection c = cs.getConnection();

        String sql = "SELECT * from users where username = ? or email = ?";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, emailOrUsername);
            ps.setString(2, emailOrUsername);

            ResultSet rs = ps.executeQuery();
            User u = null;
            while(rs.next()){
                u = new User(rs.getInt(1), rs.getString(2),
                        rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7));
            }
            return u;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public User updateUser(User u) {
        Connection c = cs.getConnection();

        String sql = "update users " +
                "set username = ?, " + //index 1
                "firstName = ?, " + //index 2
                "lastName = ?, " + //index 3
                "email = ?, " +
                "password = ?, " +
                "role_id = ? " +
                "where user_id = ?";
        try{
            PreparedStatement p = c.prepareStatement(sql);

            p.setString(1, u.getUsername());
            p.setString(2, u.getFirstName());
            p.setString(3, u.getLastName());
            p.setString(4, u.getEmail());
            p.setString(5, u.getPassword());
            p.setInt(6, u.getRole_id());
            p.setInt(7, u.getUser_id());

            p.execute();
            User updatedUser = new User(u.getUser_id(), u.getUsername(), u.getFirstName(),u.getLastName(),u.getEmail(),u.getPassword(),u.getRole_id());

            return updatedUser;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void deleteUserByEmailOrUsername(String emailOrUsername) {
        Connection c = cs.getConnection();

        String sql = "delete from users where username = ? or email = ?";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, emailOrUsername);
            ps.setString(2, emailOrUsername);

            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

}