import React, { Component } from "react"; // react라이브러리에서 component를 가져옴
import './App.css';

export default class App extends Component {
  
  state = { // state (데이터가 변할 때 화면을 렌더링)
    todoData: [],
    value: "", // state값(tododata)를 저장하는 공간 → handlechange() 에서 이 값을 사용자가 입력한 할 일로 바꾸어줌
  }

   // x버튼 스타일링
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  
  // 리스트 스타일링
  getStyle = (completed) => { 
    return { // 함수로 : 나중에 체크하면 줄 긋는 등의 동적인 상황
      padding: "10px",
      borderBottom: "1px #ccc dotted", //리스트 사이 경계 생성
      textDecoration: completed ? "line-through" : "none", // completed가 true이면 "line-through", false이면 "none"
    };
  };

  //할 일 삭제
  handleClick = (id) => { // x를 click하면 todo목록이 바뀌도록
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: newTodoData }); /* todoData를 newTodoData로 바꿔줌 */
  };

  {/* todoData value를 유저가 입력한 값으로 바꿈 */ }
  handleChange = (e) => {
    // user가 입력한 값
    this.setState({ value: e.target.value });  // setState()는 컴포넌트의 state 객체에 대한 업데이트를 실행
  };

  
  //할 일 추가
  handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드(새로고침) 되는 걸 막아줌
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 입력란에 있던 글씨 지워주기 (value 빈칸)
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" }); //... : 전개연산자(객체들을 합쳐주기)
  };

  // 체크박스가 클릭되면 completed : true 로 바꿔주기 (textDecoration: line-through가 될 수 있도록)
  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed; // 느낌표 = not의 의미 !true=false   !false=true

      }
      return data;
    });

    this.setState({ todoData: newTodoData });
  };

  render() {
    return (
      <div className="container"> {/* 컨테이너와 할 일 목록 만들기 */}
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {/* todoData 리스트의 각 요소들(data)에 대해 아래 구조를 입혀라! */}
          {this.state.todoData.map(data => ( 
            <div style={this.getStyle(data.completed)} key={data.id}>  {/* 하나의 목록 추가하기 */}
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={() => this.handleCompleteChange(data.id)} />
              {data.title} {/* todoData안의 각각의 title에 대해서 함수 실행한 결과 반환 */}
              <button
                style={this.btnStyle}
                onClick={() => this.handleClick(data.id)}>x</button>
            </div>
          ))} 
          
          <form style={{ display: 'flex' }} onSubmit={this.handleSubmit} > {/* 할 일 목록 추가 */}
            <input
              type="text"
              name="value"
              style={{ flex: '10', padding: '5px' }}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value} // 기본으로 placeholder에 채워질 말
              onChange={this.handleChange}
            />
            <input //button
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: '1'}}
              />
            </form>
        </div>       
      </div>
    );
  }
}