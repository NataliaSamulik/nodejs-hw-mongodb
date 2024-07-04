import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const saveFile = async (file) => {
  let photoUrl;

  if (env(ENV_VARS.ENABLE_CLOUDINARY) === 'true') {
    photoUrl = await saveFileToCloudinary(file);
  } else {
    photoUrl = saveFileToUploadDir(file);
  }

  return photoUrl;
};