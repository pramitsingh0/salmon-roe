const sharp = require("sharp");
const firebaseStorage = require("firebase/storage");
const fireStotrage = firebaseStorage.getStorage();

function modifyFileName(file) {
  const timestamp = Date.now();
  const name = file.originalname.split(".")[0];
  const fileName = `${name}_${timestamp}.webp`;
  return fileName;
}

const imageUpload = async (file, username, folder) => {
  const fileName = modifyFileName(file);
  const commpressedImage = await sharp(file.buffer)
    .webp({ quality: 25 })
    .toBuffer();

  const storageRef = firebaseStorage.ref(
    fireStotrage,
    `${username}/${folder}/${fileName}`
  );
  const metaData = {
    contentType: file.mimetype,
  };
  const snapshort = await firebaseStorage.uploadBytesResumable(
    storageRef,
    commpressedImage,
    metaData
  );
  const downloadUrl = await firebaseStorage.getDownloadURL(snapshort.ref);
  return downloadUrl;
};

module.exports = imageUpload;
