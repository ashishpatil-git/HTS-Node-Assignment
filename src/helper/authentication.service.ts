import bcrypt from "bcrypt";

export const generateHash = (password: string) => {
  return bcrypt.genSalt(1).then(salt=>{
    let hashedpass = bcrypt.hash(password, salt);
    return hashedpass;
  })
};

export const verifyHash = async(password: string,hashedPass:string) => {
    let isMatched = await bcrypt.compare(password, hashedPass);
    return isMatched;
}