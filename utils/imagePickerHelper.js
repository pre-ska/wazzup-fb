import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirebaseApp } from './firebaseConfig';

export const launchImagePicker = async () => {
  await checkMediaPermissions();

  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

const checkMediaPermissions = async () => {
  if (Platform.OS !== 'web') {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return Promise.reject('we need permission to access your photos');
    }

    return Promise.resolve();
  }
};

export const uploadImageAsync = async (uri) => {
  const app = getFirebaseApp();

  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const pathFolder = 'profilePics';
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`); // ref je iz firebase/storage!!!

  const result = await uploadBytes(storageRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(storageRef); // vrati natrag url od uplodane slike da se odmah koristi u appu
};
