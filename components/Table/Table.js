import React, { useRef, useEffect } from 'react';


let horizontalColorMemory = [];
let verticalColorMemory = [];
let crossover = 0;

const generateTableData = () => {
  let tableData = [];
  let rowData;
  let _key = 0;
  let _value;
  let _type;
  let _function;
  let _id;
  let Obj;

  for (let x = 9; x >= 0; x--) {
    rowData = [];
    for (let y = 0; y < 10; y++) {
      _id = x.toString() + y.toString();
      _value = (x + 1) * (y + 1);
      if (x === 0 && y !== 0) {
        _type = 'toggle';
        _function = 'vertical';
      } else if (y === 0 && x !== 0) {
        _type = 'toggle';
        _function = 'horizontal';
      } else if (x === 0 && y === 0) {
        _type = 'toggle';
        _function = 'dummy';
      } else {
        _type = 'body';
        _function = 'body';
      }
      Obj = {
        key: _key,
        value: _value,
        type: _type,
        function: _function,
        id: _id,
      };
      rowData.push(Obj);
      _key += 1;
    }
    tableData.push(rowData);
  }
  return tableData;
};

let tableData = generateTableData();

const Table = (props) => {
  console.log('table');
  const cellRefs = useRef([]);

  const horizontalColorHandler = (event) => {
    if (crossover) {
      cellRefs.current[crossover].setAttribute(
        'style',
        'background-color: #7121a6; color: #fff;'
      );
    }
    if (horizontalColorMemory[0]) {
      cellRefs.current[horizontalColorMemory[0]].setAttribute(
        'style',
        'background-color: #9377a6; color: #000;'
      );
    }
    for (let n of horizontalColorMemory.slice(1)) {
      if (!verticalColorMemory.includes(n)) {
        cellRefs.current[n].setAttribute(
          'style',
          'background-color: #d7b7ed; color: #000;'
        );
      }
    }

    horizontalColorMemory = [];
    let index = (10 - parseInt(event.target.innerHTML)) * 10;
    for (let x = index; x < index + 10; x++) {
      cellRefs.current[x].setAttribute(
        'style',
        'background-color: #7121a6; color: #fff;'
      );
      horizontalColorMemory.push(x);
      for (let n of horizontalColorMemory) {
        for (let x of verticalColorMemory) {
          if (x === n) {
            cellRefs.current[x].setAttribute(
              'style',
              'background-color: #580c7a; color: #fff;'
            );
            crossover = n;
          }
        }
      }
    }
  };

  const verticalColorHandler = (event) => {
    if (crossover) {
      cellRefs.current[crossover].setAttribute(
        'style',
        'background-color: #7121a6; color: #fff;'
      );
    }
    if (verticalColorMemory[0]) {
      cellRefs.current[verticalColorMemory[0]].setAttribute(
        'style',
        'background-color: #9377a6; color: #000;'
      );
    }
    for (let n of verticalColorMemory.slice(1)) {
      if (!horizontalColorMemory.includes(n)) {
        cellRefs.current[n].setAttribute(
          'style',
          'background-color: #d7b7ed; color: #000;'
        );
      }
    }
    verticalColorMemory = [];
    let index = 89 + parseInt(event.target.innerHTML);
    for (let x = index; x > index - 100; x -= 10) {
      cellRefs.current[x].setAttribute(
        'style',
        'background-color: #7121a6; color: #fff;'
      );
      if (horizontalColorMemory.includes(x)) {
        cellRefs.current[x].setAttribute(
          'style',
          'background-color: #580c7a; color: #fff;'
        );
      }
      verticalColorMemory.push(x);
      for (let n of verticalColorMemory) {
        for (let x of horizontalColorMemory) {
          if (x === n) {
            cellRefs.current[x].setAttribute(
              'style',
              'background-color: #580c7a; color: #fff;'
            );
            crossover = n;
          }
        }
      }
    }
  };

  const tableLevel = (level) => {
    for (let cell of cellRefs.current) {
      let firstNumber = parseInt(cell.id[0]);
      let secondNumber = parseInt(cell.id[1]);
      let value = (firstNumber + 1) * (secondNumber + 1);
      cell.innerHTML = value;
    }
    let toChangeCells = [];
    for (let x = 1; x < level; x++) {
      for (let y = 1; y < level; y++) {
        let _id = x.toString() + y.toString();
        toChangeCells.push(_id);
      }
    }
    for (let val of toChangeCells) {
      for (let x = 0; x < cellRefs.current.length; x++) {
        if (val === cellRefs.current[x].id) {
          cellRefs.current[x].innerHTML = '&#x2666';
        }
      }
    }
  };

  useEffect(() => {
    console.log(cellRefs.current[3].id);
    tableLevel(props.level);
  }, [props.level]);

  return (
    <div className="tableBody">
      {tableData.map((data) => {
        return (
          <div className="tableRow" key={Math.random()}>
            {data.map((obj) => {
              if (obj.function === 'vertical') {
                return (
                  <button
                    key={obj.key}
                    id={obj.id}
                    className={obj.type}
                    onClick={verticalColorHandler}
                    ref={(el) => (cellRefs.current[obj.key] = el)}
                  >
                    {obj.value}
                  </button>
                );
              } else if (obj.function === 'horizontal') {
                return (
                  <button
                    key={obj.key}
                    id={obj.id}
                    className={obj.type}
                    onClick={horizontalColorHandler}
                    ref={(el) => (cellRefs.current[obj.key] = el)}
                  >
                    {obj.value}
                  </button>
                );
              } else if (obj.function === 'dummy') {
                return (
                  <button
                    key={obj.key}
                    id={obj.id}
                    className={obj.type}
                    ref={(el) => (cellRefs.current[obj.key] = el)}
                  >
                    {obj.value}
                  </button>
                );
              } else {
                return (
                  <button
                    key={obj.key}
                    id={obj.id}
                    className={obj.type}
                    ref={(el) => (cellRefs.current[obj.key] = el)}
                  >
                    {obj.value}
                  </button>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
