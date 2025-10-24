// encryptPasswords.js
import bcrypt from 'bcrypt';
import { sequelize, User } from './models/index.js';

async function encryptExistingPasswords() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD');

    // Obtener todos los usuarios con query raw (para evitar hooks)
    const [users] = await sequelize.query('SELECT * FROM users');

    console.log(`📋 Encontrados ${users.length} usuarios`);

    for (const user of users) {
      // Verificar si la contraseña ya está hasheada
      if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
        const plainPassword = user.password;
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        
        // Actualizar directamente con query (sin hooks)
        await sequelize.query(
          'UPDATE users SET password = :password WHERE id = :id',
          {
            replacements: { password: hashedPassword, id: user.id }
          }
        );
        
        console.log(`✅ Usuario "${user.username}"`);
        console.log(`   Password original: ${plainPassword}`);
        console.log(`   Password hasheado: ${hashedPassword.substring(0, 30)}...`);
      } else {
        console.log(`⏭️  Usuario "${user.username}" - Ya encriptado`);
      }
    }

    console.log('\n✅ Proceso completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

encryptExistingPasswords();