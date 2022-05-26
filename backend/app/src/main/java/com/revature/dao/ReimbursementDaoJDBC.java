package com.revature.dao;

import com.revature.models.Reimbursement;

import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.revature.models.ReimbursementResolver;
import com.revature.models.User;
import com.revature.utils.ConnectionSingleton;

public class ReimbursementDaoJDBC implements IReimbursementDao{

    public ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

    @Override
    public void createReimbursement(Reimbursement r) {
        Connection c = cs.getConnection();

        String sql = "INSERT into reimbursements (amount, submitted_date, description, " +
                "reimbursement_author, reimbursement_status_id, reimbursement_type_id) " +
                "values (?, ?, ?, ?, ?, ?)";

        try{
            PreparedStatement p = c.prepareStatement(sql);

            p.setDouble(1, r.getAmount());
            p.setDate(2, r.getSubmittedDate());
            p.setString(3, r.getDescription());
            p.setInt(4, r.getReimbursementAuthorId());
            p.setInt(5, r.getReimbursementStatusId());

            //cheat to fix frontend glitch
            if(r.getReimbursementTypeId() == 0){
                r.setReimbursementTypeId(1);
            }
            p.setInt(6, r.getReimbursementTypeId());

            p.execute();
        } catch(SQLException e){
            e.printStackTrace();
        }

    }

    @Override
    public List<Reimbursement> getAllPendingReimbursements() {
        Connection c = cs.getConnection();

        String sql = "SELECT * from reimbursements where reimbursement_status_id = 1 ORDER BY reimbursement_id DESC";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            Reimbursement r = null;
            List<Reimbursement> pendingList = new ArrayList<>();
            while(rs.next()) {
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2),
                        rs.getDate(3), rs.getDate(4), rs.getString(5),
                        rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
                pendingList.add(r);
            }
            return pendingList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Reimbursement> getAllResolvedReimbursements() {
        Connection c = cs.getConnection();

        String sql = "SELECT * from reimbursements where reimbursement_status_id = 2 or reimbursement_status_id = 3 ORDER BY reimbursement_id DESC";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            Reimbursement r = null;
            List<Reimbursement> resolvedList = new ArrayList<>();
            while(rs.next()) {
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2),
                        rs.getDate(3), rs.getDate(4), rs.getString(5),
                        rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
                resolvedList.add(r);
            }
            return resolvedList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Reimbursement> getAllReimbursementsByEmployee(int userId) {
        Connection c = cs.getConnection();

        String sql = "SELECT * from reimbursements where reimbursement_author = ? ORDER BY reimbursement_id DESC";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1,userId);
            ResultSet rs = ps.executeQuery();
            Reimbursement r = null;
            List<Reimbursement> rList = new ArrayList<>();
            while(rs.next()) {
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2),
                        rs.getDate(3), rs.getDate(4), rs.getString(5),
                        rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
                rList.add(r);
            }
            return rList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Reimbursement> getAllPendingRequestsByEmployee(int userId){

        Connection c = cs.getConnection();

        String sql = "SELECT * from reimbursements where reimbursement_author = ? and reimbursement_status_id = ? ORDER BY reimbursement_id DESC";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1,userId);
            ps.setInt(2, 1);
            ResultSet rs = ps.executeQuery();
            Reimbursement r = null;
            List<Reimbursement> rList = new ArrayList<>();
            while(rs.next()) {
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2),
                        rs.getDate(3), rs.getDate(4), rs.getString(5),
                        rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
                rList.add(r);
            }
            return rList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<Reimbursement> getAllResolvedRequestsByEmployee(int userId){
        Connection c = cs.getConnection();

        String sql = "SELECT * from reimbursements where reimbursement_author = ? and (reimbursement_status_id = ? or reimbursement_status_id = ?) ORDER BY reimbursement_id DESC";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1,userId);
            ps.setInt(2, 2);
            ps.setInt(3, 3);
            ResultSet rs = ps.executeQuery();
            Reimbursement r = null;
            List<Reimbursement> rList = new ArrayList<>();
            while(rs.next()) {
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2),
                        rs.getDate(3), rs.getDate(4), rs.getString(5),
                        rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
                rList.add(r);
            }
            return rList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Reimbursement updateReimbursement(Reimbursement r) {
        Connection c = cs.getConnection();

        String sql = "update reimbursements " +
                "set amount = ?, " + //index 1
                "submitted_date = ?, " + //index 2
                "description = ?, " +
                "reimbursement_author = ?, " +
                "reimbursement_status_id = ?, " +
                "reimbursement_type_id = ? " +
                "where reimbursement_id = ?";

        try{
            PreparedStatement p = c.prepareStatement(sql);

            p.setDouble(1, r.getAmount());
            p.setDate(2, r.getSubmittedDate());
            p.setString(3, r.getDescription());
            p.setInt(4, r.getReimbursementAuthorId());
            p.setInt(5, r.getReimbursementStatusId());
            p.setInt(6, r.getReimbursementTypeId());
            p.setInt(7, r.getId());

            p.execute();

            return r;

        } catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void resolveReimbursement(ReimbursementResolver rr){

        Connection c = cs.getConnection();

        String sql = "update reimbursements " +
                "set resolved_date = ?, " + //index 1
                "reimbursement_resolver = ?, " + //index 2
                "reimbursement_status_id = ?" +
                "where reimbursement_id = ?";

        try{
            PreparedStatement p = c.prepareStatement(sql);

            Date d = new Date(Instant.now().toEpochMilli());

            p.setDate(1, d);
            p.setInt(2, rr.getResolverId());
            p.setInt(3, rr.getStatus());
            p.setInt(4, rr.getReimbursementId());


            p.execute();

        } catch(SQLException e){
            e.printStackTrace();
        }

    }

    @Override
    public void deleteReimbursement(int reimbursementId) {

        Connection c = cs.getConnection();

        String sql = "delete from reimbursements where reimbursement_id = ?";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1,reimbursementId);

            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
}
