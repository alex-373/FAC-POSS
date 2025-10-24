import { Router } from "express";
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const router = Router();

// Generar JWT
const generateToken = (userId, username, role) => {
  return jwt.sign(
    { id: userId, username, role },
    process.env.JWT_SECRET || 'tu_clave_secreta_super_segura',
    { expiresIn: '24h' }
  );
};

// Enviar código 2FA por email
async function enviarCodigo(email) {
  const codigo = crypto.randomInt(100000, 999999).toString();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alexarenas373@gmail.com",
      pass: "sszl hpgx tfos hfle"
    }
  });

  await transporter.sendMail({
    from: '"Soporte POS" <alexarenas373@gmail.com>',
    to: email,
    subject: "Tu código de verificación",
    text: `Tu código de ingreso es: ${codigo}`
  });

  return codigo;
}

// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son requeridos'
      });
    }

    const user = await User.findOne({ 
      where: { username, isActive: true } 
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const token = generateToken(user.id, user.username, user.role);

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// 📝 REGISTER
export const register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Validaciones
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Usuario, email y contraseña son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar si existe
    const existingUser = await User.findOne({ 
      where: { username } 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Verificar email duplicado
    const existingEmail = await User.findOne({ 
      where: { email } 
    });
    
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Crear usuario (el password se encripta automáticamente en el hook)
    const newUser = await User.create({
      username,
      password,
      email,
      role: role || 'user'
    });

    // Enviar código de verificación (opcional)
    let codigo = null;
    if (email) {
      try {
        codigo = await enviarCodigo(email);
        console.log(`📧 Código enviado a ${email}: ${codigo}`);
      } catch (emailError) {
        console.error('Error al enviar email:', emailError);
        // No fallar el registro si falla el email
      }
    }

    // Generar token
    const token = generateToken(newUser.id, newUser.username, newUser.role);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      ...(codigo && { codigo }) // Solo incluir si se generó
    });

  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message
    });
  }
};

// ✅ VERIFY TOKEN
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'tu_clave_secreta_super_segura'
    );
    
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username', 'email', 'role', 'isActive']
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no válido'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};


router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyToken);

export default router;