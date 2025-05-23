import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const secret = process.env.RECAPTCHA_SECRET;

const verifyRecaptcha = async (token) => {
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret,
        response: token
      }
    });

    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA error:', error.message);
    return false;
  }
};

export default verifyRecaptcha;
