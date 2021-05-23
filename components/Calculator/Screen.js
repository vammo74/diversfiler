import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

const Screen = (props) => {
  const inputRef = useRef(null);

  // useEffect(() => {
  // if (props.isCorrect === 'Correct') {
  // inputRef.current.setAttribute('style', 'background-color: #79e36d');
  // setTimeout(() => {
  // inputRef.current.setAttribute('style', 'background-color: #ccd4cb');
  // }, 250);
  // }
  // if (props.isCorrect === 'Wrong') {
  // inputRef.current.setAttribute('style', 'background-color: #f75252');
  // setTimeout(() => {
  // inputRef.current.setAttribute('style', 'background-color: #ccd4cb');
  // }, 250);
  // }
  // });

  return (
    <View className="screen">
      <Text className="product">{props.product}</Text>
      <Text className="inputAnswer" ref={inputRef}></Text>
    </View>
  );
};

export default Screen;
