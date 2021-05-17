import bcrypt from 'bcrypt';

async function encryptPassword(pass: string){
	const password = await bcrypt.hash(pass, 10);
    
    return password;
}

export default encryptPassword;