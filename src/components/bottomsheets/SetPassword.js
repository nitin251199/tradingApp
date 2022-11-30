import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Dimension, Fonts} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, HelperText, TextInput} from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';

export default function SetPassword(props) {
  const [show, setShow] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [showNewPass, setShowNewPass] = React.useState(true);
  const [showConfirmPass, setShowConfirmPass] = React.useState(true);
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isValidPassword = () => {
    if (password.length) return password.length < 8;
  };

  const checkConfirmPass = () => {
    return confirmPassword.length && password != confirmPassword;
  };

  const checkSubmitStatus = () => {
    if (password.length > 0 && confirmPassword.length > 0) {
      return isValidPassword() || checkConfirmPass();
    }
    return true;
  };

  const checkOTP = () => {
    if (otp != props.realOtp) {
      return setOtpError(true);
    }
    setShow(false);
  };

  const submitMobile = async () => {
    setLoading(true);
    props.setPassword(password);
    await props.handleRegister(password);
    setLoading(false);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Verify Mobile Number</Text>
        <TouchableOpacity onPress={props.onRequestClose}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={Color.graylight}
          />
        </TouchableOpacity>
      </View>
      {show ? (
        <View style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.label}>OTP sent to +91-{props.phone}</Text>
            <TouchableOpacity
              onPress={() => {
                props.onRequestClose();
              }}>
              <Text
                style={{
                  ...styles.label,
                  color: Color.secondary,
                  fontSize: 14,
                  fontFamily: Fonts.secondaryBold,
                }}>
                Change ?
              </Text>
            </TouchableOpacity>
          </View>
          <OTPTextView
            autoFocus
            handleTextChange={text => {
              setOtp(text);
              setOtpError(false);
            }}
            containerStyle={styles.textInputContainer}
            textInputStyle={{
              ...styles.roundedTextInput,
              borderColor: otpError ? Color.red : Color.white,
              color: Color.white,
            }}
            inputCount={4}
            offTintColor={otpError ? Color.error : Color.graylight}
            tintColor={otpError ? Color.error : Color.secondary}
          />
          <HelperText
            padding="none"
            type="error"
            visible={otpError}
            style={{display: otpError ? 'flex' : 'none'}}>
            Invalid OTP !
          </HelperText>
          <Button
            onPress={() => checkOTP()}
            style={{
              backgroundColor: Color.secondary,
              marginTop: 20,
              borderRadius: 5,
            }}
            labelStyle={{color: '#000'}}
            contentStyle={{
              height: 55,
              alignItems: 'center',
            }}
            mode="contained">
            Verify
          </Button>
        </View>
      ) : (
        <View style={{margin: 10}}>
          <Text style={styles.label}>Enter New Password</Text>
          <TextInput
            mode="outlined"
            secureTextEntry={showNewPass}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowNewPass(prev => !prev)}
              />
            }
            left={<TextInput.Icon icon="key" />}
            value={password}
            autoFocus
            outlineColor={'#ccc'}
            error={isValidPassword()}
            onChangeText={text => {
              setPassword(text);
            }}
            activeOutlineColor={Color.secondary}
            style={styles.input}
            label="New Password"
          />
          <HelperText
            padding="none"
            type="error"
            visible={isValidPassword()}
            style={{display: isValidPassword() ? 'flex' : 'none'}}>
            Password must be atleast of 8 digits !
          </HelperText>
          <TextInput
            mode="outlined"
            value={confirmPassword}
            secureTextEntry={showConfirmPass}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowConfirmPass(prev => !prev)}
              />
            }
            left={<TextInput.Icon icon="key" />}
            outlineColor={'#ccc'}
            error={checkConfirmPass()}
            onChangeText={text => setConfirmPassword(text)}
            activeOutlineColor={Color.secondary}
            style={styles.input}
            label="Confirm Password"
          />
          <HelperText
            padding="none"
            type="error"
            visible={checkConfirmPass()}
            style={{display: checkConfirmPass() ? 'flex' : 'none'}}>
            Passwords don't match !
          </HelperText>
          <Button
            onPress={() => submitMobile()}
            loading={loading}
            disabled={checkSubmitStatus()}
            color={Color.secondary}
            style={{
              marginTop: 20,
              borderRadius: 5,
              backgroundColor: checkSubmitStatus() ? '#999' : Color.secondary,
            }}
            labelStyle={{
              color: '#000',
            }}
            contentStyle={{
              height: 55,
              alignItems: 'center',
            }}
            mode="contained">
            Register
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.secondaryRegular,
    fontSize: 12,
    color: Color.secondary,
    // margin: 10,
  },
  input: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 18,
    marginTop: 10,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  textInputContainer: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: Dimension.window.width,
    // alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.secondaryBold,
    color: Color.secondary,
    padding: 10,
  },
  searchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 8,
  },
});
