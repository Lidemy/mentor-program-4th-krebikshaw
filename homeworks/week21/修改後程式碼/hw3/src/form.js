import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './constants/style';

const Li = styled.li`
  list-style-type: none;
  padding: 0px 20px 5px 20px;
  margin-bottom: 5px;
  & input, & h4, & button {
    display: block;
  }
  &[data-check="true"] h4::after {
    content: '*';
    color: #d93025;
    font-size: 22px;
    margin-left: 5px;
  }
  & h4 {
    font-size: ${props => props.theme.font_size.title}
  }
  & span {
    font-size: 8px;
    position: relative;
  }
  & input {
    border: none;
    margin-bottom: 20px;
    height: 25px;
    width: 100%;
    border-bottom: 2px solid #eee;
    background: none;
    border-radius: 0;
    &:focus {
      outline: none;
      border-bottom: 2px solid #d93025;
    }
    &::placeholder {
      color: #bbb;
      font-size: 14px;
    }
  }
  & .input__half {
    width: 60%;
  }
  & .form__radio {
    display: flex;
    align-items: center;
    & input[type="radio"] {
      cursor: pointer;
      height: 20px;
      width: 20px;
      margin: 10px 10px 10px 0;
    }
    & label {
      width: 500px;
      margin: 15px 5px;
      cursor: pointer;
    }
  }
  & .btn__submit {
    display: inline-block;
    padding: 10px 30px;
    background: #1a73e8;
    color: #fff;
    font-size: 13px;
    border-radius: 3px;
    border: none;
    margin: 20px 0;
    cursor: pointer;
    &:hover {
      background: #1a73e8db;
      box-shadow: 0 0 0 0.3px rgba(0,0,0,0.5);
    }
    & + span {
      top: -5px; 
      color: #3a3535;
      display: block;
    }
  }
  ${
    props => props.$alert && `
      background: #fce8e6;
      border-left: 2px solid #d93025;
      &::after {
        content:"這是必填問題";
        color: #d93025;
        font-size: 15px;
      }
      & input {
        outline: none;
       border-bottom: 2px solid #d93025;
      }
    `
  }
`;

const Form = () => {
  const [data, setData] = useState(() => {
    return {
      nickname: {value: '', isRead: false, isAlert: false},
      email: {value: '', isRead: false, isAlert: false},
      cellphone: {value: '', isRead: false, isAlert: false},
      treatType: {value: '', isRead: false, isAlert: false},
      from: {value: '', isRead: false, isAlert: false},
      others: {value: ''}
    }
  });

  const handleChangeInput = e => {
    const target = e.target;
    const value = target.type === 'radio' ? target.id : target.value;
    const name = target.name;

    setData({
      ...data,
      [name]: {
        ...data.[name],
        value: value
      }
    })
  };

  const checkInputRead = () => {
    setData(data => {
      return {
        ...data,
        nickname: {
          ...data.nickname, 
          isAlert: data.nickname.isRead && data.nickname.value === '' ? true : false
        },
        email: {
          ...data.email,
          isAlert:  data.email.isRead && data.email.value === '' ? true : false
        },
        cellphone: {
          ...data.cellphone,
          isAlert:  data.cellphone.isRead && data.cellphone.value === '' ? true : false
        },
        treatType: {
          ...data.treatType,
          isAlert:  data.treatType.isRead && data.treatType.value === '' ? true : false
        },
        from: {
          ...data.from,
          isAlert:  data.from.isRead && data.from.value === '' ? true : false
        }
      }
    });
  };

  const handleClickInput = e => {
    const target = e.target;
    const name = target.name;
    checkInputRead();

    setData(data => {
      if (e.target.parentNode.getAttribute('data-check') === 'true') {
        return {
          ...data,
          [name]: {
            ...data.[name],
            isRead: true,
          }
        }
      }
      return data;
    });
  };

  const handleSubmit = e => {
    setData(data => {
      return {
        ...data,
        nickname: {
          ...data.nickname, 
          isAlert: data.nickname.value === '' ? true : false
        },
        email: {
          ...data.email,
          isAlert: data.email.value === '' ? true : false
        },
        cellphone: {
          ...data.cellphone,
          isAlert: data.cellphone.value === '' ? true : false
        },
        treatType: {
          ...data.treatType,
          isAlert: data.treatType.value === '' ? true : false
        },
        from: {
          ...data.from,
          isAlert: data.from.value === '' ? true : false
        }
      }
    });
    for (let item in data) {
      if (document.querySelector(`input[name=${item}]`).hasAttribute('required') && data.[item].value === '') {
        e.preventDefault();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} action="" novalidate="">
      <ul>
        <Li className="form__item" data-check="true" $alert={data.nickname.isAlert}>
          <h4>患者名稱</h4>
          <span>請填上病患大名</span>
          <input type="text" name="nickname" id="nickname" className="input__half" placeholder="快點填，不要再拖了！" required="true"
            onChange={handleChangeInput} 
            onClick={handleClickInput}
          />	
        </Li>
        <Li className="form__item" data-check="true" $alert={data.email.isAlert}>
          <h4>患者電子郵件</h4>
          <span></span>
          <input type="email" name="email" id="email" className="input__half" placeholder="題目很多！寫快點" required="true"
            onChange={handleChangeInput}
            onClick={handleClickInput}
          />	
        </Li>
        <Li className="form__item" data-check="true" $alert={data.cellphone.isAlert}>
          <h4>患者手機號碼</h4>
          <span>為避免患者拖延症狀過重，請填寫正確手機資訊，方可致電提醒服藥</span>
          <input type="tel" name="cellphone" id="cellphone" className="input__half" placeholder="很好，你寫完一半了" required="true"
            onChange={handleChangeInput}
            onClick={handleClickInput}
          />	
        </Li>
        <Li className="form__item" data-check="true" $alert={data.treatType.isAlert}>
          <h4>患者治療類型</h4>
          <span>請選擇您的治療需求</span>
          <div className="form__radio">
            <input type="radio" name="treatType" id="positive" onChange={handleChangeInput} onClick={handleClickInput} required="true" /><label for="positive">從零治療到好(過程極度痛苦，目標是根治您的拖延症狀，6 個月內沒治好，需加收 5000 萬診療費，用金錢壓力改善您的症狀。)</label>
          </div>
          <div className="form__radio">
            <input type="radio" name="treatType" id="negative" onChange={handleChangeInput} onClick={handleClickInput} required="true" /><label for="negative">佛系治療法(不保證能根治，不強迫你做任何你應該做的事，順其自然，相信總有一天會好。)</label>	
          </div>
        </Li>
        <Li className="form__item" data-check="true" $alert={data.from.isAlert}>
          <h4>怎麼知道這個療程的</h4>
          <input type="text" name="from" id="from" placeholder="2020 快過完了！你填好了沒？" required="true"
            onChange={handleChangeInput}
            onClick={handleClickInput}
          />	
        </Li>
        <Li className="form__item">
          <h4>其他</h4>
          <span>病患還想說什麼</span>
          <input type="text" name="others" id="others" placeholder="非常棒，這是最後一題了。"
            onChange={handleChangeInput}
            onClick={handleClickInput}
          />	
        </Li>
        <Li className="form__item">
          <button type="submit" className="btn__submit" value="No vaLidate submit">提交</button>
          <span>請不要再拖延了，儘速提交表單，謝謝！</span>
        </Li>
      </ul>
    </form>
  );
}

export default Form;

