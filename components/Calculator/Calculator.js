import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import NumberPad from './NumberPad';
import Screen from './Screen';

const Calculator = (props) => {
  const [started, setStarted] = useState(false);
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [isCorrect, setIsCorrect] = useState('');
  const [digits, setDigits] = useState('');
  const [timerFlag, setTimerFlag] = useState('stop');

  const bar = useRef();

  const generateProducts = () => {
    const newProducts = [];
    for (let n = 2; n < 11; n++) {
      for (let m = 2; m < 11; m++) {
        if (
          !newProducts.includes(n + ' ✕ ' + m) &&
          !newProducts.includes(m + ' ✕ ' + n)
        ) {
          newProducts.push(n + ' ✕ ' + m);
        }
      }
    }
    return newProducts;
  };

  const generateProduct = () => {
    let productsArray = [...products];
    if (productsArray.length < 1) {
      productsArray = generateProducts();
      props.onChangeLevel(props.level + 1);
    }
    if (productsArray.length >= 50) {
      productsArray = generateProducts();
      if (props.level > 1) {
        props.onChangeLevel(props.level - 1);
      }
    }
    const randomIndex = Math.floor(Math.random() * productsArray.length);
    const newProduct = productsArray.splice(randomIndex, 1);
    setProduct(newProduct[0]);
    setProducts([...productsArray]);
  };

  const startHandler = () => {
    if (!started) {
      setStarted(true);
      setTimerFlag('start');
      generateProduct();
      console.log(started);
      console.log(product);
      console.log(products);
    }
  };

  const stopHandler = () => {
    if (started) {
      setDigits('');
      setProducts([product, ...products]);
      setStarted(false);
      setTimerFlag('stop');
    }
  };

  const checkProductHandler = (answer) => {
    const numbers = product.split(' ✕ ');
    const result = parseInt(numbers[0]) * parseInt(numbers[1]);
    if (parseInt(answer) === result) {
      setDigits('');
      setIsCorrect('Correct');
      setTimeout(() => {
        setIsCorrect('');
      }, 250);
      generateProduct();
      if (timerFlag === 'reset-on') {
        setTimerFlag('reset-off');
      } else {
        setTimerFlag('reset-on');
      }
    } else {
      setIsCorrect('Wrong');
      setProducts([product, ...products]);
      if (products.length >= 50) {
        generateProduct();
      }
      setTimeout(() => {
        setIsCorrect('');
      }, 250);
    }
  };

  const deleteHandler = () => {
    if (digits.length > 0 && started) {
      setDigits((prevDigits) => prevDigits.slice(0, -1));
      console.log(digits);
    }
  };

  const enterHandler = () => {
    if (digits.length < 0 && started) {
      checkProductHandler(digits);
      setStarted(true);
    }
  };

  const enteredDigitsHandler = (newDigit) => {
    if (digits.length < 3 && started) {
      setDigits((prevDigits) => prevDigits + newDigit);
      console.log(digits);
    }
  };

  // cyonst manualEnterHandler = (newDigits) => {
  // if (started) {
  // if (newDigits.length < 4) {
  // setDigits(newDigits);
  // }
  // }
  // };

  // useEffect(() => {
  // let barFillHeight = Math.round((products.length / 50) * 100) + '%';

  // bar.current.setAttribute(
  // 'style',
  // `height: ${barFillHeight}; background-color: #4826b9; transition: all 0.3s ease-out`
  // );
  // }, [products, product]);

  return (
    <View className="calculator">
      <Screen
        started={started}
        product={product}
        onCheckProduct={checkProductHandler}
        isCorrect={isCorrect}
        digits={digits}
      />
      <View className="calculator__body">
        <View className="scoreBoard">
          <View className="bar__inner">
            <View className="bar__fill" ref={bar}></View>
          </View>
          <Text className="level">{`Level: ${props.level}`}</Text>
        </View>
        <NumberPad
          className="numberPad"
          digits={digits}
          onEnteredDigit={enteredDigitsHandler}
          onDelete={deleteHandler}
          onEnter={enterHandler}
        />
        <Button
          className="start"
          onPress={!started ? startHandler : stopHandler}
          title={!started ? 'START' : 'STOP'}
        />
      </View>
    </View>
  );
};

export default Calculator;
