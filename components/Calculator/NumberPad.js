import React from 'react';
import { Button, View } from 'react-native';

const NumberPad = (props) => {
  const pressHandler = (digit) => {
    console.log(digit);
    props.onEnteredDigit(digit);
  };
  const deleteHandler = () => {
    console.log('delete');
    props.onDelete();
  };
  const enterHandler = () => {
    console.log('enter');
    props.onEnter();
  };
  return (
    <View className="numberPad">
      <View>
        <Button
          className="digit"
          onPress={() => {
            pressHandler(7);
          }}
          title="7"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(8);
          }}
          title="8"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(9);
          }}
          title="9"
        />
      </View>
      <View>
        <Button
          className="digit"
          onPress={() => {
            pressHandler(4);
          }}
          title="4"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(5);
          }}
          title="5"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(6);
          }}
          title="6"
        />
      </View>
      <View>
        <Button
          className="digit"
          onPress={() => {
            pressHandler(1);
          }}
          title="1"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(2);
          }}
          title="2"
        />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(3);
          }}
          title="3"
        />
      </View>
      <View className="lastRow">
        <Button className="del" onPress={deleteHandler} title="del" />
        <Button
          className="digit"
          onPress={() => {
            pressHandler(0);
          }}
          title="0"
        />
        <Button className="enter" onClick={enterHandler} title="enter" />
      </View>
    </View>
  );
};

export default NumberPad;
