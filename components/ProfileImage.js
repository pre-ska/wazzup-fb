import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import userImage from '../assets/images/userImage.jpeg';
import colors from '../constants/colors';
import {
  launchImagePicker,
  uploadImageAsync,
} from '../utils/imagePickerHelper';
import { updateSignedInUserData } from '../utils/actions/authActions';
import { updateSignedInUserDataAction } from '../store/authSlice';

const ProfileImage = (props) => {
  const dispatch = useDispatch();

  const source = props.uri ? { uri: props.uri } : userImage;

  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);

  const userId = props.userId;

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) {
        return;
      }

      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri);
      setIsLoading(false);
      if (!uploadUrl) {
        throw new Error(`Could not upload image`);
      }

      const newData = { profilePicture: uploadUrl };

      await updateSignedInUserData(userId, newData);
      dispatch(updateSignedInUserDataAction({ newData }));

      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Image
          source={image}
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
        />
      )}

      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={15} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.gray,
    borderWidth: 1,
  },

  editIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
