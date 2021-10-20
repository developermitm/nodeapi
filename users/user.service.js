const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    verifyotp,
    resendOTP
};

async function authenticate(params) {
    const user = await db.User.scope('withHash').findOne({ where: { mobile_no: params.mobile_no } });

    if (!user){
        await db.User.create(params);
        let successData = ({'status' : 'success', "status_code": 200, message: 'Register successfully !', otp : params.user_otp});
        return { ...omitHash(successData) };
    }

    if(user.is_verify == 0){
        let successData = ({'status' : 'error', "status_code": 400, "error_type": "INVALID_PARAM", message: 'Please verify OTP to Login !'});
        return { ...omitHash(successData) };
    }
   
    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    const successData = 
        {
            'status' : 'success',
            "status_code": 200,
            "message": "Logged in successfully",
            "data" : user.get(),
            "token" : token
        }
                     
        return successData;
   // return { ...omitHash(successData), token };

}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { mobile_no: params.mobile_no } })) {
        const successData =  { "status": "error", "status_code": 400,  "error_type": "INVALID_PARAM", "message": 'Mobile No "' + params.mobile_no + '" is already taken'};
        return successData;
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function verifyotp(params){
    
    const user = await db.User.findOne({ where: { mobile_no: params.mobile_no, user_otp : params.otp } });
    if(user){
        Object.assign(user, {is_verify : 1});
        await user.save();
        const successData = { 'status' : 'success',  "status_code": 200, "message": "OTP verification successfully !", 'is_verified' : 1 }
        return successData;
    }
    else{
        const successData =  { "status": "error", "status_code": 400,  "error_type": "INVALID_PARAM", "message": 'Invalid OTP  ' + params.otp + ' ',  'is_verified' : 0 };
        return successData;
    }
}

async function resendOTP(params){
    const user = await db.User.scope('withHash').findOne({ where: { mobile_no: params.mobile_no } });
    if (!user){
        const successData =  { "status": "error", "status_code": 400, "error_type": "INVALID_PARAM",  "message": 'Mobile Number is incorrect'};
        return successData;
    }
    Object.assign(user, params);
    await user.save();

    const successData =  {"status": "success", "status_code": 200, "message": 'OTP resend successfully',"otp" : params.user_otp };
    return successData;
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.mobile_no && user.mobile_no !== params.mobile_no;
    if (usernameChanged && await db.User.findOne({ where: { mobile_no: params.mobile_no } })) {
        throw 'Username "' + params.mobile_no + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}