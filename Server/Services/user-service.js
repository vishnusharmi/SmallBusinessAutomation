const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const userModel = require('../Models/user');
const Documents = require("../Models/documents");
const employeeModel = require("../Models/EmployeeModel");
const companyModel = require("../Models/companies");

const bcrypt = require("bcryptjs");
const { accessSync } = require("fs");


exports.registerUser = async (data, files) => {
  try {

    if (!data.email || !data.password || !data.role) {
      return { message: "Missing required fields (email, password, role)" };
    }

    const existingUser = await userModel.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      return { message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = await userModel.create({
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    let additionalData = null;

    if (data.role === "employee") {
      additionalData = await employeeModel.create({
        userId: userData.id,
        company_id: data.company_id,
        first_name: data.first_name,
        last_name: data.last_name,
        position: data.position,
        department: data.department,
        phone_number: data.phone_number,
        employment_history: data.employment_history,
      });
    } else if (data.role === "admin" || "super-admin") {
      additionalData = await companyModel.create({
        userId: userData.id,
        companyName: data.companyName,
        industry: data.industry,
        address: data.address,
      });
    }

    let documentResponse = null;

    if (files && files.path) {
      const uploadResult = await cloudinaryUpload.uploader.upload(files.path, {
        resource_type: "auto",
        folder: "user_uploads",
      });

      documentResponse = await Documents.create({
        empId: userData.id,
        documentType: files.mimetype,
        file_path: uploadResult.url,
      });
    }

    return {
      message: "User created successfully",
      data: { user: userData, additionalData, document: documentResponse },
    };
  } catch (error) {
    console.error("Error in registerUser:", error);
    return { message: "Something went wrong", error: error.message };
  }
};

exports.getAllusers = async () => {
  try {
    const getUsers = await userModel.findAll({
      include: [
        {
          model: Documents
        },
      ],

    });
    return getUsers;
  } catch (error) {
    console.log(error);
  }
};

//get user by id

exports.getUserbyid = async (id) => {
  try {
    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,
        }
      ],


    })
    return getuser;

  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;

  }
}

//update user by id

exports.updateUserById = async (id, data, documentPath) => {

  try {

    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,
        }
      ],
    });

    console.log(getuser.Document.id, 'docicici');

    let file_url = getuser.Document.id


    const result = await cloudinaryUpload.uploader.upload(documentPath, {
      resource_type: "auto",
      folder: "user_uploads",
    });

    console.log(result, 'resultttt');


    const updatedUser = await userModel.update(data, { where: { id } });

    if (!updatedUser) {
      throw new error(' user not found')
    }

    const docResponse = await Documents.update({ file_path: result.url }, { where: { id: file_url } });

    console.log(docResponse, 'responss');


    return updatedUser;
  } catch (error) {
    throw error;
  }
};

//delete user

exports.deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.destroy({ where: { id } });

    return deletedUser;
  }
  catch (error) {
    console.log(error);

  }
}