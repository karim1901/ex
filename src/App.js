import {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      comment:[],
      l:false
    }
  }


  getData = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/photos")
    this.setState({
      data: resp.data
    })
    console.log(resp.data)
  }

  getComment = async (e)=>{
    console.log(e)
    const req = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${e}`)
    console.log(req.data)
    // var Com=""
    // await req.data.map(com => {
    //   Com +=`
    //   <p>${com.email}</p>
    //   <p>${com.body}</p>
    //   `
    // })
// var texts = document.querySelectorAll('.text')
    this.setState({
      comment:req.data
    })
    this.setState({
      l:true
    })
    // texts[e.target.id-1]
    // document.getElementById(`com${e}`).innerHTML= Com
  }

  render() {
    return <div>
      <button onClick={this.getData}>Get Data</button>
      {
        this.state.data.map((item,index) => {
          return <div className='text' index={index} id={item.id} onClick={()=>this.getComment(item.id)}>
            <img id={item.id} src={item.thumbnailUrl} alt={item.title} />
            <p>{item.title}</p>
            {/* <div id={`com${item.id}`} ></div> */}
            <div>
              {
              this.state.l && item.id==this.state.comment[0].postId ?
              <>
              {
                
              
              this.state.comment.map((com,i) =>{
                return <div>
                  <p>{com.email}</p>
                  <p>{com.body}</p>
                </div>
              })}
            </>
              :
              ""
              }
            </div>
          </div>
        })
      }
    </div>
  }
}

export default App;