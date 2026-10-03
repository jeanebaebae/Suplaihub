import { type Request, type Response } from "express";
import { supabase } from '../config/db.js';
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";


