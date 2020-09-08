import * as bcrypt from "bcrypt";

export const generateHash = function(password: String) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

export const validPassword = function(password: String, currentPassword: string) {
	return bcrypt.compareSync(password, currentPassword)
}