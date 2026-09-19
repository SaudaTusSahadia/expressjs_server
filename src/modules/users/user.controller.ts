import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.servive";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email);
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "data inserted successfully",
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

  res.status(201).json({
    success: true,
    message: "Data received successfully",
  });
}

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result.rows
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  
  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const result = await userServices.updateUser(name, email, req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userServices.deleteUser(req.params.id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}

export const userController ={
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}